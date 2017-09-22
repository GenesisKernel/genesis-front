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
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import * as actions from './actions';
import { readTextFile } from 'lib/fs';
import Keyring from 'lib/keyring';
import storage from 'lib/storage';

export const loginEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.login.started.match)
        .switchMap(action => {
            const promise = api.getUid().then(uid => {
                const signature = action.payload.keyring.sign(uid.uid);
                return api.login(uid.token, action.payload.keyring.getPublicKey(), signature);
            });

            return Observable.from(promise).map(payload => {
                if (action.payload.remember) {
                    storage.settings.save('refreshToken', payload.refresh);
                    storage.settings.save('privateKey', action.payload.keyring.getPrivateKey());
                    storage.settings.save('publicKey', action.payload.keyring.getPublicKey(false));
                }
                else {
                    storage.settings.remove('refreshToken');
                    storage.settings.remove('privateKey');
                    storage.settings.remove('publicKey');
                }

                const account = storage.accounts.load(payload.wallet);
                return actions.login.done({
                    params: action.payload,
                    result: {
                        ...payload,
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

export const reauthenticateEpic = (action$: Observable<Action>) =>
    action$.filter(actions.reauthenticate.started.match)
        .switchMap(action => {
            const keyring = Keyring.fromPrivate(action.payload.publicKey, action.payload.privateKey);
            const promise = api.getUid().then(uid => {
                const signature = keyring.sign(uid.uid);
                return api.login(uid.token, keyring.getPublicKey(), signature);
            });

            return Observable.from(promise).map(payload => {
                return actions.login.started({
                    keyring,
                    remember: true
                });
            }).catch((e: IAPIError) => {
                // TODO: Clear stored session
                return Observable.of(actions.reauthenticate.failed({
                    params: null,
                    error: e.error
                }));
            });
        })

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
                const signature = action.payload.sign(uid.uid);
                return api.login(uid.token, action.payload.getPublicKey(), signature);
            });

            return Observable.from(promise).map(payload => {
                return actions.createAccount.done({
                    params: null,
                    result: {
                        id: payload.wallet,
                        encKey: action.payload.getEncKey(),
                        publicKey: action.payload.getPublicKey(false),
                        address: payload.address
                    }
                });
            }).catch(e => {
                return Observable.of(actions.createAccount.failed({
                    params: null,
                    error: null
                }));
            });
        });

export default combineEpics(loginEpic, reauthenticateEpic, importSeedEpic, createAccountEpic);