// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Action } from 'redux';
import { Epic } from 'modules';
import { login } from '../actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';
import { push } from 'react-router-redux';

const loginEpic: Epic = (action$, store, { api }) => action$.ofAction(login.started)
    .flatMap(action => {
        const privateKey = keyring.decryptAES(action.payload.wallet.encKey, action.payload.password);

        if (!keyring.validatePrivateKey(privateKey)) {
            return Observable.of(login.failed({
                params: action.payload,
                error: 'E_INVALID_PASSWORD'
            }));
        }

        const publicKey = keyring.generatePublicKey(privateKey);
        const nodeHost = store.getState().engine.nodeHost;
        const client = api({ apiHost: nodeHost });

        return Observable.from(client.getUid())
            .flatMap(uid =>
                client.authorize(uid.token).login({
                    publicKey,
                    signature: keyring.sign(uid.uid, privateKey),
                    ecosystem: action.payload.wallet.ecosystem,
                    expire: 60 * 60 * 24 * 90

                }).then(loginResult => {
                    const authClient = client.authorize(loginResult.token);
                    return Promise.all([
                        authClient.getRow({
                            id: loginResult.key_id,
                            table: 'members',
                            columns: ['member_name']

                        }).then(memberResult => ({
                            ...loginResult,
                            username: memberResult.value.member_name

                        })).catch(e => ({
                            ...loginResult,
                            avatar: null,
                            username: null
                        })),
                        authClient.getEcosystemName({
                            id: action.payload.wallet.ecosystem
                        }).catch(e => '')
                    ]);
                })
            )

            // Successful authentication. Yield the result
            .flatMap(payload => {
                const wallet = payload[0];
                const ecosystemName = payload[1];

                return Observable.of<Action>(
                    push('/'),
                    login.done({
                        params: action.payload,
                        result: {
                            wallet: {
                                id: wallet.key_id,
                                encKey: action.payload.wallet.encKey,
                                address: wallet.address,
                                ecosystem: action.payload.wallet.ecosystem,
                                ecosystemName,
                                username: wallet.username
                            },
                            roles: wallet.roles && wallet.roles.map(role => ({
                                id: role.role_id,
                                name: role.role_name
                            })),
                            session: {
                                sessionToken: wallet.token,
                                refreshToken: wallet.refresh,
                                apiHost: nodeHost
                            },
                            privateKey,
                            publicKey
                        }
                    })
                );
            })

            // Catch actual login error, yield result
            .catch(e => Observable.of(
                login.failed({
                    params: action.payload,
                    error: e.error
                })
            ));

    });

export default loginEpic;