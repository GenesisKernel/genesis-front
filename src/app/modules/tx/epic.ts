// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import { IRootState } from 'modules';
import { combineEpics, Epic } from 'redux-observable';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import * as actions from './actions';
import * as authActions from 'modules/auth/actions';
import * as storageActions from 'modules/storage/actions';
import keyring from 'lib/keyring';
import api, { IAPIError, ITxStatusResponse } from 'lib/api';

export const txCallEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.txCall)
        .map(action => {
            const state = store.getState();
            if (keyring.validatePrivateKey(state.auth.privateKey)) {
                return actions.txExec.started({
                    tx: action.payload,
                    privateKey: state.auth.privateKey
                });
            }
            else {
                return actions.txAuthorize(action.payload);
            }
        });

export const txAuthorizeEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.txAuthorize)
        .flatMap(action => {
            return Observable.fromPromise(swal({
                title: 'txExec',
                text: `Enter your password to sign contract '${action.payload.name}'`,
                input: 'password',
                showCancelButton: true
            })
                .then(result => ({ success: result, error: null }))
                .catch(error => ({ success: null, error }))
            )
                .flatMap(payload => {
                    if (payload.success) {
                        const state = store.getState();
                        const privateKey = keyring.decryptAES(state.auth.account.encKey, payload.success);

                        return Observable.of(actions.txExec.started({
                            tx: action.payload,
                            privateKey
                        }));
                    }
                    else {
                        return Observable.empty();
                    }
                });
        });

export const txExecEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.txExec.started)
        .flatMap(action => {
            const state = store.getState();

            if (keyring.validatePrivateKey(action.payload.privateKey)) {
                return Observable.fromPromise(api.txPrepare(state.auth.sessionToken, action.payload.tx.name, action.payload.tx.params, action.payload.tx.vde)
                    .then(response => {
                        const signature = keyring.sign(response.forsign, action.payload.privateKey);
                        const publicKey = keyring.generatePublicKey(action.payload.privateKey);
                        return api.txExec(state.auth.sessionToken, action.payload.tx.name, {
                            ...action.payload.tx.params,
                            pubkey: publicKey,
                            signature,
                            time: response.time
                        }, action.payload.tx.vde);
                    }))
                    .flatMap(payload => {
                        // We must listen to this transaction or we will never catch
                        // the ID of newly created ecosystem. Contract name is constant
                        const hooks: Observable<any>[] = [];
                        switch (action.payload.tx.name) {
                            case 'NewEcosystem':
                                const ecosystemName = (action.payload.tx.params && action.payload.tx.params.Name) || payload.result;
                                const account = state.auth.account;

                                hooks.push(
                                    Observable.of(storageActions.saveAccount({
                                        id: account.id,
                                        encKey: account.encKey,
                                        address: account.address,
                                        avatar: null,
                                        username: null,
                                        sessionToken: null,
                                        refreshToken: null,
                                        ecosystem: payload.result,
                                        ecosystemName
                                    }))
                                );
                                break;

                            default:
                                break;
                        }

                        return Observable.concat(
                            ...hooks,
                            Observable.of(authActions.authorize({
                                privateKey: action.payload.privateKey
                            })),
                            Observable.of(actions.txExec.done({
                                params: action.payload,
                                result: payload.blockid
                            })));
                    })
                    .catch((error: IAPIError & ITxStatusResponse) => Observable.of(actions.txExec.failed({
                        params: action.payload,
                        error: {
                            type: error.errmsg ? error.errmsg.type : error.error,
                            error: error.errmsg ? error.errmsg.error : error.msg
                        }
                    })));
            }
            else {
                return Observable.of(actions.txExec.failed({
                    params: action.payload,
                    error: {
                        type: 'E_INVALID_PASSWORD',
                        error: null
                    }
                }));
            }
        });

export default combineEpics(
    txCallEpic,
    txAuthorizeEpic,
    txExecEpic
);