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
import { importWallet } from '../actions';
import { Observable } from 'rxjs/Observable';
import { IWallet } from 'genesis/auth';
import { navigate } from 'modules/engine/actions';
import keyring from 'lib/keyring';

const importWalletEpic: Epic = (action$, store, { api }) => action$.ofAction(importWallet.started)
    .flatMap(action => {
        const backup = keyring.restore(action.payload.backup);
        if (!backup || backup.privateKey.length !== keyring.KEY_LENGTH) {
            return Observable.of(importWallet.failed({
                params: action.payload,
                error: 'E_INVALID_KEY'
            }));
        }

        const ecosystems = ['1', ...backup.ecosystems];
        const publicKey = keyring.generatePublicKey(backup.privateKey);

        return Observable.from(ecosystems)
            .distinct()
            .flatMap(ecosystem => {
                const client = api({ apiHost: store.getState().engine.nodeHost });
                return Observable.from(client.getUid().then(uid =>
                    client.authorize(uid.token).login({
                        publicKey,
                        signature: keyring.sign(uid.uid, backup.privateKey),
                        ecosystem
                    })

                )).catch(e => Observable.empty<never>());

            }).toArray().flatMap(results => {
                const encKey = keyring.encryptAES(backup.privateKey, action.payload.password);
                const wallets: IWallet[] = results.map(wallet => ({
                    id: wallet.key_id,
                    encKey,
                    address: wallet.address,
                    ecosystem: wallet.ecosystem_id,
                    ecosystemName: null,
                    username: wallet.key_id,
                    avatar: null
                }));

                if (wallets.length) {
                    return Observable.of<Action>(
                        importWallet.done({
                            params: action.payload,
                            result: wallets
                        }),
                        navigate('/')
                    );
                }
                else {
                    return Observable.of(importWallet.failed({
                        params: null,
                        error: 'E_OFFLINE'
                    }));
                }

            }).catch(e => Observable.of(importWallet.failed({
                params: null,
                error: 'E_IMPORT_FAILED'
            })));
    });

export default importWalletEpic;