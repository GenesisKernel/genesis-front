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
import { loginNodes } from '../actions';
import { txExec } from 'modules/tx/actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';
import shuffle  from 'shuffle-array';

const CHECK_FULLNODES_COUNT = 3;

const loginNodesEpic: Epic = (action$, store, { api }) => action$.ofAction(loginNodes.started)
    .flatMap(action => {
        const state = store.getState();

        // fullNodes list for checking transaction. Without current fullNode
        const checkFullNodes = (state.storage.fullNodes || []).filter(l => l !== state.auth.session.apiHost);
        // get random fullNodes for transaction check
        const checkFullNodesSet = shuffle(checkFullNodes).slice(0, CHECK_FULLNODES_COUNT);
        const privateKey = state.auth.privateKey;
        const publicKey = keyring.generatePublicKey(privateKey);

        return Observable.from(checkFullNodesSet)
            .flatMap(nodeHost => {
                const client = api({ apiHost: nodeHost });
                return Observable.from(client.getUid())
                    .flatMap(uid =>
                        client.authorize(uid.token).login({
                            publicKey,
                            signature: keyring.sign(uid.uid, privateKey),
                            ecosystem: state.auth.wallet.ecosystem,
                            expire: 60 * 60 * 24 * 90

                        }).then(loginResult => ({
                            apiHost: nodeHost,
                            sessionToken: loginResult.token,
                            refreshToken: ''
                        }))
                    );
            }
        ).toArray().flatMap(loginResults => {
            return Observable.merge(
                Observable.of<Action>(
                    loginNodes.done({
                        params: action.payload,
                        result: loginResults
                    })
                ),
                Observable.of<Action>(
                    txExec.started(action.payload)
                )
            );
        });
    });

export default loginNodesEpic;
