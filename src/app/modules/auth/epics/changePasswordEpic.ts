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
import { logout } from 'modules/auth/actions';
import { modalShow, modalClose } from 'modules/modal/actions';
import keyring from 'lib/keyring';

const changePasswordEpic: Epic = (action$, store, { api }) => action$.ofAction(changePassword.started)
    .flatMap(action => {
        const auth = store.getState().auth;
        const wallet = auth.wallet;
        const privateKey = keyring.decryptAES(wallet.encKey, action.payload.oldPassword);

        if (!keyring.validatePrivateKey(privateKey)) {
            return Observable.concat(
                Observable.of(changePassword.failed({
                    params: action.payload,
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

        const encKey = keyring.encryptAES(privateKey, action.payload.newPassword);

        return Observable.concat(
            Observable.of(changePassword.done({
                params: action.payload,
                result: {
                    encKey,
                    id: wallet.id
                }
            })),

            Observable.merge(
                Observable.of(modalShow({
                    id: 'DISPLAY_INFO',
                    type: 'INFO',
                    params: {
                        value: 'Password changed. Please login with new password.'
                    }
                })),
                action$.ofAction(modalClose)
                    .take(1)
                    .flatMap(result => {
                        return Observable.of(logout.started(null));
                    })
            )
        );
    });

export default changePasswordEpic;