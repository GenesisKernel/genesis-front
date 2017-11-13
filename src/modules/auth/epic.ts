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
        .switchMap(action => {
            const promise = api.getUid().then(uid => {
                const signature = keyring.sign(uid.uid, action.payload.privateKey);
                return api.login(uid.token, action.payload.publicKey, signature);
            });

            return Observable.from(promise).map(payload => {
                const account = storage.accounts.load(payload.key_id);
                return actions.login.done({
                    params: action.payload,
                    result: {
                        ...payload,
                        // TODO: Not remembering the key is not implemented yet
                        // privateKey: action.payload.remember ? action.payload.privateKey : null,
                        privateKey: action.payload.privateKey,
                        account
                    }
                });
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
            localStorage.removeItem('publicKey');
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
                return api.login(uid.token, state.auth.account.publicKey, signature, null, action.payload);
            });

            return Observable.fromPromise(promise);
        })
        .flatMap(payload =>
            Observable.concat(
                Observable.of(actions.switchEcosystem.done({
                    params: payload.ecosystem_id,
                    result: {
                        token: payload.token,
                        refresh: payload.refresh,
                        expiry: payload.expiry
                    }
                })),
                Observable.of(reset.started(null))
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

export const createAccountEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.createAccount.started.match)
        .switchMap(action => {
            const promise = api.getUid().then(uid => {
                const signature = keyring.sign(uid.uid, action.payload.privateKey);
                return api.login(uid.token, action.payload.publicKey, signature);
            });

            return Observable.from(promise).map(payload => {
                return actions.createAccount.done({
                    params: null,
                    result: {
                        id: payload.key_id,
                        address: payload.address,
                        ...action.payload
                    }
                });
            }).catch(e => {
                return Observable.of(actions.createAccount.failed({
                    params: null,
                    error: null
                }));
            });
        });

export const refreshSessionEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofType(actions.refreshSession.started)
        .switchMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.refresh(state.auth.refreshToken))
                .map(payload => actions.refreshSession.done({
                    params: null,
                    result: payload
                }))
                .catch((e: IAPIError) => Observable.of(actions.refreshSession.failed({
                    params: null,
                    error: e.error
                })));
        });

export default combineEpics(
    loginEpic,
    logoutEpic,
    switchEcosystemEpic,
    importSeedEpic,
    createAccountEpic,
    refreshSessionEpic
);