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
import { Observable } from 'rxjs/Observable';
import { changePassword } from '../actions';
import { modalShow, modalClose } from 'modules/modal/actions';
import { logout } from 'modules/auth/actions';
import { saveWallet } from 'modules/storage/actions';
import keyring from 'lib/keyring';

const changePasswordDoneEpic: Epic = (action$, store, { api }) => action$.ofAction(changePassword.done)
    .flatMap(action => {
        const auth = store.getState().auth;
        const wallet = auth.wallet;
        const wallets = store.getState().storage.wallets;
        const privateKey = keyring.decryptAES(wallet.encKey, action.payload.result.oldPassword);

        if (!keyring.validatePrivateKey(privateKey)) {
            return Observable.concat(
                Observable.of(changePassword.failed({
                    params: null,
                    error: 'E_INVALID_PASSWORD'
                })),
                Observable.of(modalShow({
                    id: 'AUTH_ERROR',
                    type: 'AUTH_ERROR',
                    params: {
                        error: 'E_INVALID_PASSWORD'
                    }
                }))
            );
        }

        const encKey = keyring.encryptAES(privateKey, action.payload.result.newPassword);

        return Observable.concat(

            Observable.from(wallets.filter(l => l.id === wallet.id))
                .map(w => saveWallet({
                    ...w,
                    encKey
                })),

            Observable.merge(
                Observable.of(modalShow({
                    id: 'AUTH_PASSWORD_CHANGED',
                    type: 'AUTH_PASSWORD_CHANGED',
                    params: {}
                })),
                action$.ofAction(modalClose)
                    .take(1)
                    .flatMap(result => {
                        return Observable.of(logout.started(null));
                    })
            )
        );
    });

export default changePasswordDoneEpic;