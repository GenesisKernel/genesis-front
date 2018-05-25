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
import { selectRole } from '../actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';

const selectRoleEpic: Epic = (action$, store, { api }) => action$.ofAction(selectRole.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);
        const privateKey = state.auth.privateKey;
        const publicKey = keyring.generatePublicKey(privateKey);
        const wallet = state.auth.wallet;

        return Observable.from(client.getUid().then(uid => {
            const signature = keyring.sign(uid.uid, privateKey);
            return client.authorize(uid.token)
                .login({
                    publicKey,
                    signature,
                    ecosystem: wallet.ecosystem,
                    role: action.payload
                });

        })).map(payload =>
            selectRole.done({
                params: action.payload,
                result: {
                    sessionToken: payload.token,
                    refreshToken: payload.refresh,
                },
            })

        ).catch(e =>
            Observable.of(
                selectRole.failed({
                    params: null,
                    error: e.error
                })
            )
        );
    });

export default selectRoleEpic;