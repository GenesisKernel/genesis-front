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

import api, { IAPIError } from 'lib/api';
import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { IRootState } from 'modules';
import * as engineActions from 'modules/engine/actions';
import * as actions from './actions';
import { reset } from 'modules/content/actions';
import { readTextFile } from 'lib/fs';
import keyring from 'lib/keyring';
import storage from 'lib/storage';

export const loginEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.login.started.match)
        .flatMap(action => {
            const publicKey = keyring.genereatePublicKey(action.payload.privateKey);

            const promise = api.getUid().then(uid => {
                const signature = keyring.sign(uid.uid, action.payload.privateKey);
                return api.login(uid.token, publicKey, signature, undefined, action.payload.ecosystem);
            });

            return Observable.from(promise)
                .flatMap(payload => {
                    const account = storage.accounts.load(payload.key_id);

                    return Observable.concat([
                        actions.login.done({
                            params: action.payload,
                            result: {
                                ...payload,
                                // TODO: Not remembering the key is not implemented yet
                                // privateKey: action.payload.remember ? action.payload.privateKey : null,
                                privateKey: action.payload.privateKey,
                                publicKey,
                                account
                            }
                        }),
                        actions.watchSession({
                            timeout: payload.expiry
                        })
                    ]);
                }).catch((e: IAPIError) => {
                    return Observable.of(actions.login.failed({
                        params: null,
                        error: e.error
                    }));
                });
        });

export const logoutEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.logout.started)
        .flatMap(action => {
            localStorage.removeItem('privateKey');
            localStorage.removeItem('lastEcosystem');
            return Observable.concat([
                engineActions.navigate('/'),
                actions.logout.done({
                    params: action.payload,
                    result: null
                })
            ]);
        });

export const switchEcosystemEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.switchEcosystem.started)
        .flatMap(action => {
            const state = store.getState();
            const promise = api.getUid().then(uid => {
                const signature = keyring.sign(uid.uid, state.auth.privateKey);
                const publicKey = keyring.genereatePublicKey(state.auth.privateKey);
                return api.login(uid.token, publicKey, signature, null, action.payload);
            });

            return Observable.fromPromise(promise);
        })
        .flatMap(payload =>
            Observable.concat(
                Observable.of(reset.started(null)),
                Observable.of(actions.switchEcosystem.done({
                    params: payload.ecosystem_id,
                    result: {
                        token: payload.token,
                        refresh: payload.refresh,
                        sessionDuration: payload.expiry
                    }
                })),
                Observable.of(engineActions.navigate('/'))
            )
        )
        .catch((e: IAPIError) => {
            return Observable.of(actions.switchEcosystem.failed({
                params: null,
                error: e.error
            }));
        });

export const importSeedEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.importSeed.started.match)
        .switchMap(action => {
            return Observable.from(readTextFile(action.payload)).map(payload => {
                return actions.importSeed.done({
                    params: null,
                    result: payload
                });
            }).catch(e => {
                return Observable.of(actions.importSeed.failed({
                    params: null,
                    error: null
                }));
            });
        });

export const importAccountEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.importAccount.started)
        .switchMap(action => {
            const backup = keyring.restore(action.payload.backup);
            if (!backup || backup.privateKey.length !== keyring.KEY_LENGTH) {
                return Observable.of(actions.importAccount.failed({
                    params: null,
                    error: 'E_INVALID_KEY'

                    // We need to delay the response to make reducer think
                    // as this is an async call
                })).delay(1);
            }

            const publicKey = keyring.genereatePublicKey(backup.privateKey);
            const promise = api.getUid().then(uid => {
                const signature = keyring.sign(uid.uid, backup.privateKey);
                return api.login(uid.token, publicKey, signature);
            });

            return Observable.from(promise)
                .map(payload => {
                    const account = {
                        encKey: keyring.encryptAES(backup.privateKey, action.payload.password),
                        id: payload.key_id,
                        address: payload.address,
                        ecosystems: {
                            '1': {
                                name: 'APL-WALLET'
                            }
                        }
                    };
                    for (let itr in backup.ecosystems) {
                        if (backup.ecosystems.hasOwnProperty(itr)) {
                            account.ecosystems[itr] = {};
                        }
                    }
                    storage.accounts.save(account);

                    return actions.importAccount.done({
                        params: action.payload,
                        result: account
                    });
                });
        });

export const createAccountEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.createAccount.started)
        .switchMap(action => {
            const keys = keyring.generateKeyPair(action.payload.seed);
            const promise = api.getUid().then(uid => {
                const signature = keyring.sign(uid.uid, keys.private);
                return api.login(uid.token, keys.public, signature);
            });

            return Observable.from(promise)
                .map(payload => {
                    const account = {
                        encKey: keyring.encryptAES(keys.private, action.payload.password),
                        id: payload.key_id,
                        address: payload.address,
                        ecosystems: {
                            1: {
                                name: 'APL-WALLET'
                            }
                        }
                    };
                    storage.accounts.save(account);

                    return actions.createAccount.done({
                        params: action.payload,
                        result: account
                    });
                });
        });

export const refreshSessionEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.watchSession)
        .mergeMap(action => {
            const timeout = (action.payload.timeout * 1000) - 60000;

            return Observable.timer(timeout, timeout)
                .flatMap(() => {
                    const state = store.getState();
                    return Observable.fromPromise(api.refresh(state.auth.sessionToken, state.auth.refreshToken, state.auth.sessionDuration))
                        .map(payload =>
                            actions.refreshSession({
                                token: payload.token,
                                refresh: payload.refresh,
                                sessionDuration: payload.expiry
                            })
                        )
                        .catch((e: IAPIError) =>
                            Observable.of(actions.logout.started({}))
                        );
                })
                .takeUntil(action$.ofAction(actions.logout.done));
        });

export const updateMetadataEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.updateMetadata.started)
        .flatMap(action => {
            if (!action.payload) {
                return Observable.of(actions.updateMetadata.failed({
                    params: action.payload,
                    error: null
                }));
            }
            const state = store.getState();
            storage.accounts.save({
                ...state.auth.account,
                ecosystems: {
                    ...state.auth.account.ecosystems,
                    [action.payload.ecosystem]: {
                        name: action.payload.name,
                        type: action.payload.type,
                        avatar: action.payload.avatar
                    }
                }
            });
            return Observable.of(actions.updateMetadata.done({
                params: action.payload,
                result: action.payload
            }));
        });

export default combineEpics(
    loginEpic,
    logoutEpic,
    switchEcosystemEpic,
    importSeedEpic,
    importAccountEpic,
    createAccountEpic,
    refreshSessionEpic,
    updateMetadataEpic
);