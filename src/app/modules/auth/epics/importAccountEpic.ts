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

import { Action } from 'redux';
import { Epic } from 'modules';
import { importAccount } from '../actions';
import { Observable } from 'rxjs/Observable';
import { IAccount } from 'genesis/auth';
import { navigate } from 'modules/engine/actions';
import keyring from 'lib/keyring';
import * as Promise from 'bluebird';

const importAccountEpic: Epic = (action$, store, { api }) => action$.ofAction(importAccount.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.engine.apiHost, state.auth.sessionToken);

        const backup = keyring.restore(action.payload.backup);
        if (!backup || backup.privateKey.length !== keyring.KEY_LENGTH) {
            return Observable.of(importAccount.failed({
                params: action.payload,
                error: 'E_INVALID_KEY'
            }));
        }

        const ecosystems = ['1', ...backup.ecosystems];
        const publicKey = keyring.generatePublicKey(backup.privateKey);

        return Observable.from(Promise.map(ecosystems, ecosystem =>
            client.getUid()
                .then(uid => {
                    const signature = keyring.sign(uid.uid, backup.privateKey);
                    return client
                        .authorize(uid.token)
                        .login({
                            publicKey,
                            signature,
                            ecosystem
                        });
                })
                .catch(e => {
                    return null;
                })

        )).flatMap(payload => {
            const encKey = keyring.encryptAES(backup.privateKey, action.payload.password);
            const accounts: IAccount[] = payload.filter(l => l !== null).map(response => ({
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

            if (accounts.length) {
                return Observable.of<Action>(
                    importAccount.done({
                        params: action.payload,
                        result: accounts
                    }),
                    navigate('/')
                );
            }
            else {
                return Observable.of(importAccount.failed({
                    params: null,
                    error: 'E_IMPORT_FAILED'
                }));
            }

        });
    })
    .catch(e => {
        return Observable.of(importAccount.failed({
            params: null,
            error: null
        }));
    });

export default importAccountEpic;