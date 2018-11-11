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
import { changePassword, logout } from '../actions';
import { of, merge } from 'rxjs';
import { flatMap, take, map } from 'rxjs/operators';
import { modalShow, modalClose } from 'modules/modal/actions';
import { saveWallet } from 'modules/storage/actions';
import keyring from 'lib/keyring';

const changePasswordEpic: Epic = (action$, store, { api }) => action$.ofAction(changePassword.started).pipe(
    flatMap(action =>
        merge(
            of(modalShow({
                id: 'AUTH_CHANGE_PASSWORD',
                type: 'AUTH_CHANGE_PASSWORD',
                params: {
                    encKey: store.value.auth.session.wallet.encKey
                }
            })),
            action$.ofAction(modalClose).pipe(
                take(1),
                flatMap(result => {
                    if ('RESULT' === result.payload.reason) {
                        const wallet = store.value.auth.session.wallet;
                        const privateKey = keyring.decryptAES(wallet.encKey, result.payload.data.oldPassword);

                        if (!keyring.validatePrivateKey(privateKey)) {
                            return of(
                                changePassword.failed({
                                    params: null,
                                    error: 'E_INVALID_PASSWORD'
                                }),
                                modalShow({
                                    id: 'AUTH_ERROR',
                                    type: 'AUTH_ERROR',
                                    params: {
                                        error: 'E_INVALID_PASSWORD'
                                    }
                                })
                            );
                        }

                        const encKey = keyring.encryptAES(privateKey, result.payload.data.newPassword);
                        return merge(
                            of(
                                changePassword.done({
                                    params: action.payload,
                                    result: null
                                }),
                                saveWallet({
                                    ...wallet,
                                    encKey
                                }),
                                modalShow({
                                    id: 'AUTH_PASSWORD_CHANGED',
                                    type: 'AUTH_PASSWORD_CHANGED',
                                    params: {}
                                }),
                            ),
                            action$.ofAction(modalClose).pipe(
                                take(1),
                                map(() => logout.started(null))
                            )
                        );
                    }
                    else {
                        return of(changePassword.failed({
                            params: action.payload,
                            error: null
                        }));
                    }
                })
            )
        )
    )
);

export default changePasswordEpic;