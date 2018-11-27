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
import { changePassword } from '../actions';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { modalShow } from 'modules/modal/actions';
import { saveWallet } from 'modules/storage/actions';
import keyring from 'lib/keyring';

const changePasswordEpic: Epic = (action$, store) => action$.ofAction(changePassword).pipe(
    flatMap(action => {
        const wallet = store.value.auth.session.wallet!;
        const privateKey = keyring.decryptAES(wallet.encKey, action.payload.oldPassword);

        if (!keyring.validatePrivateKey(privateKey)) {
            return of(modalShow({
                type: 'AUTH_ERROR',
                params: {
                    error: 'E_INVALID_PASSWORD',
                    message: 'E_INVALID_PASSWORD'
                }
            }));
        }
        else {
            const encKey = keyring.encryptAES(privateKey, action.payload.newPassword);
            return of<Action>(
                saveWallet({
                    ...wallet,
                    encKey
                }),
                modalShow({
                    type: 'PASSWORD_CHANGED',
                    params: {}
                })
            );

        }
    })
);

export default changePasswordEpic;