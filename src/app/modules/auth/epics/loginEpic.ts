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

import { Epic } from 'modules';
import { login } from '../actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';

const loginEpic: Epic = (action$, store, { api }) => action$.ofAction(login.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.engine.apiHost);
        const privateKey = keyring.decryptAES(action.payload.account.encKey, action.payload.password);

        if (!keyring.validatePrivateKey(privateKey)) {
            return Observable.of(login.failed({
                params: action.payload,
                error: 'E_INVALID_PASSWORD'
            }));
        }

        const publicKey = keyring.generatePublicKey(privateKey);

        return Observable.from(
            client.getUid().then(uid => {
                const signature = keyring.sign(uid.uid, privateKey);
                return client.authorize(uid.token)
                    .login({
                        publicKey,
                        signature,
                        ecosystem: action.payload.account.ecosystem

                    }).then(loginResult =>
                        client.authorize(loginResult.token)
                            .getRow({
                                id: loginResult.key_id,
                                table: 'members',
                                columns: ['avatar', 'member_name']
                            })
                            .then(memberResult => ({
                                ...loginResult,
                                avatar: memberResult.value.avatar,
                                username: memberResult.value.member_name
                            }))
                            .catch(e => ({
                                ...loginResult,
                                avatar: null,
                                username: null
                            }))
                    );
            })).map(payload =>
                login.done({
                    params: action.payload,
                    result: {
                        account: {
                            id: payload.key_id,
                            encKey: action.payload.account.encKey,
                            address: payload.address,
                            ecosystem: action.payload.account.ecosystem,
                            ecosystemName: null,
                            avatar: payload.avatar,
                            username: payload.username,
                            sessionToken: payload.token,
                            refreshToken: payload.refresh,
                            socketToken: payload.notify_key,
                            timestamp: payload.timestamp
                        },
                        roles: payload.roles && payload.roles.map(role => ({
                            id: role.role_id,
                            name: role.role_name
                        })),
                        privateKey,
                        publicKey,
                    }
                })
            ).catch(e =>
                Observable.of(
                    login.failed({
                        params: null,
                        error: e.error
                    })
                )
            );
    });

export default loginEpic;