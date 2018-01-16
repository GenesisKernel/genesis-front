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

import api, { IAPIError, ILoginResponse } from 'lib/api';
import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { IRootState } from 'modules';
import Promise from 'bluebird';
import swal from 'sweetalert2';
import * as engineActions from 'modules/engine/actions';
import * as actions from './actions';
import * as storageActions from 'modules/storage/actions';
import * as guiActions from 'modules/gui/actions';
import * as contentActions from 'modules/content/actions';
import { readTextFile } from 'lib/fs';
import keyring from 'lib/keyring';
import { IStoredAccount } from 'apla/storage';

export const loginEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.login.started.match)
        .flatMap(action => {
            const privateKey = keyring.decryptAES(action.payload.encKey, action.payload.password);

            if (!keyring.validatePrivateKey(privateKey)) {
                return Observable.of(actions.login.failed({
                    params: action.payload,
                    error: 'E_INVALID_PASSWORD'
                })).delay(1);
            }

            const publicKey = keyring.generatePublicKey(privateKey);

            const promise = api.getUid().then(uid => {
                const signature = keyring.sign(uid.uid, privateKey);
                return api.login(uid.token, publicKey, signature, undefined, action.payload.ecosystem);
            });

            return Observable.from(promise)
                .flatMap(payload => {
                    const account: IStoredAccount = {
                        id: payload.key_id,
                        encKey: action.payload.encKey,
                        address: payload.address,
                        ecosystem: action.payload.ecosystem,
                        ecosystemName: null,
                        avatar: null,
                        username: payload.key_id,
                        sessionToken: payload.token,
                        refreshToken: payload.refresh,
                        socketToken: payload.notify_key,
                        timestamp: payload.timestamp
                    };

                    return Observable.concat([
                        storageActions.saveAccount(account),
                        actions.login.done({
                            params: action.payload,
                            result: {
                                ...payload,
                                // TODO: Not remembering the key is not implemented yet
                                // privateKey: action.payload.remember ? action.payload.privateKey : null,
                                privateKey: privateKey,
                                publicKey,
                                account
                            }
                        }),
                        guiActions.switchWindow.started({
                            window: 'main'
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
        .flatMap(action =>
            Observable.concat([
                engineActions.navigate('/'),
                actions.deauthorize(null),
                actions.logout.done({
                    params: action.payload,
                    result: null
                })
            ])
        );

export const selectAccountEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.selectAccount.started)
        .flatMap(action => {
            const promise = api.refresh(action.payload.account.sessionToken, action.payload.account.refreshToken)
                .then(tokens =>
                    api.row(tokens.token, 'member', action.payload.account.id, 'avatar,username')
                        .then(memberResult => ({
                            avatar: memberResult.value.avatar,
                            username: memberResult.value.username,
                            ...tokens
                        }))
                );

            return Observable.fromPromise(promise)
                .flatMap(payload => {
                    const account: IStoredAccount = {
                        ...action.payload.account,
                        avatar: payload.avatar,
                        username: payload.username,
                        sessionToken: payload.token,
                        refreshToken: payload.refresh
                    };

                    return Observable.concat(
                        Observable.of(storageActions.saveAccount(account)),
                        Observable.of(actions.selectAccount.done({
                            params: {
                                account
                            },
                            result: {
                                sessionToken: payload.token,
                                refreshToken: payload.refresh
                            }
                        })),
                        Observable.of(contentActions.reset.started(null))
                    );
                })
                .catch((e: IAPIError) =>
                    Observable.concat([
                        actions.selectAccount.failed({
                            params: action.payload,
                            error: e.error
                        }),
                        engineActions.navigate('/'),
                    ])
                );
        });

export const authorizeAccountEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.authorizeAccount)
        .flatMap(action => {
            return Observable.fromPromise(swal({
                title: 'Confirmation',
                text: 'Please enter your password to sign in',
                input: 'password',
                showCancelButton: true
            })
                .then(result => ({ success: result, error: null }))
                .catch(error => ({ success: null, error }))
            )
                .flatMap(payload => {
                    if (payload.success) {
                        const state = store.getState();

                        return Observable.of(actions.login.started({
                            encKey: action.payload.account.encKey,
                            password: payload.success,
                            ecosystem: state.auth.account.ecosystem
                        }));
                    }
                    else {
                        return Observable.empty();
                    }
                });
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
        .flatMap(action => {
            const backup = keyring.restore(action.payload.backup);
            if (!backup || backup.privateKey.length !== keyring.KEY_LENGTH) {
                return Observable.of(actions.importAccount.failed({
                    params: null,
                    error: 'E_INVALID_KEY'

                    // We need to delay the response to make reducer think
                    // as this is an async call
                })).delay(1);
            }

            const ecosystems = ['1', ...backup.ecosystems];
            const publicKey = keyring.generatePublicKey(backup.privateKey);
            const promise = Promise.map(ecosystems, ecosystem =>
                api.getUid()
                    .then(uid => {
                        const signature = keyring.sign(uid.uid, backup.privateKey);
                        return api.login(uid.token, publicKey, signature, undefined, ecosystem);
                    })
                    .catch(e => null as ILoginResponse)
            );

            return Observable.from(promise)
                .flatMap(payload => {
                    const encKey = keyring.encryptAES(backup.privateKey, action.payload.password);
                    const accounts: IStoredAccount[] = payload.filter(l => l !== null).map(response => ({
                        id: response.key_id,
                        encKey,
                        address: response.address,
                        ecosystem: response.ecosystem_id,
                        ecosystemName: null,
                        username: response.key_id,
                        avatar: null,
                        sessionToken: response.token,
                        refreshToken: response.refresh,
                        socketToken: response.notify_key,
                        timestamp: response.timestamp
                    }));

                    return Observable.concat([
                        ...accounts.map(l =>
                            storageActions.saveAccount(l)
                        ),
                        actions.importAccount.done({
                            params: action.payload,
                            result: accounts
                        })
                    ]);
                });
        });

export const createAccountEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.createAccount.started)
        .flatMap(action => {
            const keys = keyring.generateKeyPair(action.payload.seed);
            const promise = api.getUid().then(uid => {
                const signature = keyring.sign(uid.uid, keys.private);
                return api.login(uid.token, keys.public, signature);
            });

            return Observable.from(promise)
                .flatMap(payload => {
                    const account: IStoredAccount = {
                        id: payload.key_id,
                        encKey: keyring.encryptAES(keys.private, action.payload.password),
                        address: payload.address,
                        ecosystem: '1',
                        ecosystemName: null,
                        username: payload.key_id,
                        avatar: null,
                        sessionToken: payload.token,
                        refreshToken: payload.refresh,
                        socketToken: payload.notify_key,
                        timestamp: payload.timestamp
                    };

                    return Observable.concat([
                        storageActions.saveAccount(account),
                        actions.createAccount.done({
                            params: action.payload,
                            result: account
                        }),
                    ]);
                });
        })
        .catch((e: IAPIError) =>
            Observable.of(actions.createAccount.failed({
                params: null,
                error: e.error
            }))
        );

export const authorizeEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.authorize)
        .mergeMap(action => {
            const timeout = 60000 * 60;

            return Observable.timer(timeout, timeout)
                .map(() => {
                    return actions.deauthorize(null);
                })
                .takeUntil(action$.ofAction(actions.authorize));
        });

export default combineEpics(
    loginEpic,
    logoutEpic,
    selectAccountEpic,
    importSeedEpic,
    importAccountEpic,
    createAccountEpic,
    authorizeAccountEpic,
    authorizeEpic
);