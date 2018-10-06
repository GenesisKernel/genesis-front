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

import uuid from 'uuid';
import { IRootState } from 'modules';
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { modalShow, modalClose } from 'modules/modal/actions';
import { txAuthorize } from '../actions';
import { authorize } from 'modules/auth/actions';
import keyring from 'lib/keyring';
import { enqueueNotification } from 'modules/notifications/actions';

const txAuthorizeEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(txAuthorize.started)
        .switchMap(action => {
            const state = store.getState();
            if (keyring.validatePrivateKey(state.auth.privateKey)) {
                return Observable.of(txAuthorize.done({
                    params: action.payload,
                    result: null
                }));
            }
            else {
                return Observable.merge(
                    Observable.of(modalShow({
                        id: 'TX_AUTHORIZE',
                        type: 'AUTHORIZE',
                        params: {}
                    })),
                    action$.ofAction(modalClose)
                        .take(1)
                        .flatMap(result => {
                            if (result.payload.data) {
                                const privateKey = keyring.decryptAES(store.getState().auth.wallet.encKey, result.payload.data || '');
                                if (keyring.validatePrivateKey(privateKey)) {
                                    return Observable.of<Action>(
                                        authorize(privateKey),
                                        txAuthorize.done({
                                            params: action.payload,
                                            result: result.payload.data
                                        })
                                    );
                                }
                                else {
                                    return Observable.of<Action>(
                                        txAuthorize.failed({
                                            params: action.payload,
                                            error: null
                                        }),
                                        enqueueNotification({
                                            id: uuid.v4(),
                                            type: 'INVALID_PASSWORD',
                                            params: {}
                                        })
                                    );
                                }
                            }
                            else {
                                return Observable.of(txAuthorize.failed({
                                    params: action.payload,
                                    error: null
                                }));
                            }
                        })
                );
            }
        });

export default txAuthorizeEpic;