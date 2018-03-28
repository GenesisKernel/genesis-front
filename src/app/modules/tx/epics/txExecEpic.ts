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

import { IRootState } from 'modules';
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { txExec } from '../actions';
import keyring from 'lib/keyring';
import api, { IAPIError, ITxStatusResponse } from 'lib/api';
import { toastr } from 'react-redux-toastr';
import { authorize } from 'modules/auth/actions';
import { TTxError } from 'genesis/tx';

export const txExecEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(txExec.started)
        .flatMap(action => {
            const state = store.getState();
            const publicKey = keyring.generatePublicKey(action.payload.privateKey);

            if (!keyring.validatePrivateKey(action.payload.privateKey)) {
                return Observable.of(txExec.failed({
                    params: action.payload,
                    error: {
                        type: 'E_INVALID_PASSWORD',
                        error: null
                    }
                }));
            }

            return Observable.from(api.txExec(state.auth.sessionToken, action.payload.tx.name, {
                ...action.payload.tx.params,
                pubkey: publicKey,
                signature: action.payload.signature,
                time: action.payload.time,
                ...action.payload.signParams
            }))
                .switchMap(result => {
                    if (!action.payload.tx.silent) {
                        toastr.success(
                            action.payload.tx.name,
                            `Imprinted in the blockchain (block #${result.blockid})`,
                        );
                    }

                    return Observable.of<Action>(
                        txExec.done({
                            params: action.payload,
                            result: {
                                block: result.blockid,
                                result: result.result
                            }
                        }),
                        authorize(action.payload.privateKey)
                    );
                })
                .catch((error: IAPIError & ITxStatusResponse) => Observable.of(txExec.failed({
                    params: action.payload,
                    error: {
                        type: (error.errmsg ? error.errmsg.type : error.error) as TTxError,
                        error: error.errmsg ? error.errmsg.error : error.msg
                    }
                })));
        });

export default txExecEpic;