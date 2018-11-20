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

import { Epic } from 'modules';
import { login, acquireSession } from '../actions';
import keyring from 'lib/keyring';
import { push } from 'connected-react-router';
import { flatMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';

const loginEpic: Epic = (action$, store, { api }) => action$.ofAction(login.started).pipe(
    flatMap(action => {
        const session = store.value.auth.session;
        const privateKey = keyring.decryptAES(session.wallet!.encKey, action.payload.password);

        if (!keyring.validatePrivateKey(privateKey)) {
            return of(login.failed({
                params: action.payload,
                error: 'E_INVALID_PASSWORD'
            }));
        }

        const publicKey = keyring.generatePublicKey(privateKey);
        const nodeHost = store.value.engine.nodeHost;
        const client = api({ apiHost: nodeHost });

        return from(client.getUid()).pipe(
            flatMap(uid =>
                client.authorize(uid.token).login({
                    publicKey,
                    signature: keyring.sign(uid.uid, privateKey),
                    ecosystem: session.access!.ecosystem,
                    expire: 60 * 60 * 24 * 90,
                    role: session.role && Number(session.role.id)
                })
            ),

            // Successful authentication. Yield the result
            flatMap(response => {
                const sessionResult = {
                    ...session,
                    sessionToken: response.token,
                    apiHost: nodeHost
                };

                return of(
                    push('/'),
                    login.done({
                        params: action.payload,
                        result: {
                            session: sessionResult,
                            privateKey,
                            publicKey
                        }
                    }),
                    acquireSession.started(sessionResult)
                );
            }),

            // Catch actual login error, yield result
            catchError(e => of(
                login.failed({
                    params: action.payload,
                    error: e.error
                })
            ))
        );
    })
);

export default loginEpic;