// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import uuid from 'uuid';
import { Action } from 'redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs';
import { txExec } from '../actions';
import keyring from 'lib/keyring';
import { authorize } from 'modules/auth/actions';
import { TTxError } from 'genesis/tx';
import { enqueueNotification } from '../../notifications/actions';

export const txExecEpic: Epic = (action$, store, { api }) => action$.ofAction(txExec.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);
        const publicKey = keyring.generatePublicKey(action.payload.privateKey, true);

        if (!keyring.validatePrivateKey(action.payload.privateKey)) {
            return Observable.of(txExec.failed({
                params: action.payload,
                error: {
                    type: 'E_INVALID_PASSWORD',
                    error: null
                }
            }));
        }

        return Observable.fromPromise(client.txCall({
            requestID: action.payload.requestID,
            pubkey: publicKey,
            signature: action.payload.signature,
            time: action.payload.time

        })).flatMap(result => Observable.defer(() => client.txStatus({
            hash: result.hash

        }).then(status => {
            if (!status.blockid && !status.errmsg) {
                throw 'E_PENDING';
            }
            else {
                return status;
            }

        })).retryWhen(errors =>
            errors.delay(2000)

        ).flatMap(txResult => {
            if (txResult.blockid) {
                const actions = Observable.of<Action>(
                    txExec.done({
                        params: action.payload,
                        result: {
                            block: txResult.blockid,
                            result: txResult.result
                        }
                    }),
                    authorize(action.payload.privateKey)
                );

                if (action.payload.tx.silent) {
                    return actions;
                }
                else {
                    return actions.concat(Observable.of(enqueueNotification({
                        id: uuid.v4(),
                        type: 'TX_SUCCESS',
                        params: {
                            block: txResult.blockid,
                            tx: action.payload.tx
                        }
                    })));
                }
            }
            else {
                return Observable.of(txExec.failed({
                    params: action.payload,
                    error: {
                        type: txResult.errmsg.type as TTxError,
                        error: txResult.errmsg.error
                    }
                }));
            }

        })).catch(error => Observable.of(txExec.failed({
            params: action.payload,
            error: {
                type: (error.errmsg ? error.errmsg.type : error.error) as TTxError,
                error: error.errmsg ? error.errmsg.error : error.msg
            }
        })));
    });

export default txExecEpic;