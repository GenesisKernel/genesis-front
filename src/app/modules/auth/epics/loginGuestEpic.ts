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
import { loginGuest } from '../actions';
import { Observable } from 'rxjs/Observable';
import { push } from 'connected-react-router';
import keyring from 'lib/keyring';
import { address, addressString } from 'lib/crypto';

const loginGuestEpic: Epic = (action$, store, { api, defaultKey, defaultPassword }) => action$.ofAction(loginGuest.started)
    .flatMap(action => {
        const publicKey = keyring.generatePublicKey(defaultKey);
        const nodeHost = store.getState().engine.nodeHost;
        const client = api({ apiHost: nodeHost });
        const id = address(publicKey);
        const addr = addressString(id);

        return Observable.from(client.getUid())
            .flatMap(uid =>
                client.authorize(uid.token).login({
                    publicKey,
                    signature: keyring.sign(uid.uid, defaultKey),
                    ecosystem: '1',
                    expire: 60 * 60 * 24 * 90,
                    role: null
                })
            )

            // Successful authentication. Yield the result
            .flatMap(session => {
                return Observable.of<Action>(
                    push('/'),
                    loginGuest.done({
                        params: action.payload,
                        result: {
                            session: {
                                sessionToken: session.token,
                                refreshToken: session.refresh,
                                apiHost: nodeHost
                            },
                            wallet: {
                                wallet: {
                                    id,
                                    address: addr,
                                    encKey: keyring.encryptAES(defaultKey, defaultPassword),
                                    publicKey,
                                    access: [{
                                        ecosystem: '1',
                                        name: '',
                                        roles: []
                                    }]
                                },
                                access: {
                                    ecosystem: '1',
                                    name: '',
                                    roles: []
                                }
                            },
                            privateKey: defaultKey,
                            publicKey
                        }
                    })
                );
            })

            // Catch actual login error, yield result
            .catch(e => Observable.of(
                loginGuest.failed({
                    params: action.payload,
                    error: e.error
                })
            ));

    });

export default loginGuestEpic;