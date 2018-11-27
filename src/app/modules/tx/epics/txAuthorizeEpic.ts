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
import { Epic } from 'modules';
import { Action } from 'redux';
import { of, merge } from 'rxjs';
import { modalShow, modalClose } from 'modules/modal/actions';
import { txAuthorize } from '../actions';
import { authorize } from 'modules/auth/actions';
import keyring from 'lib/keyring';
import { enqueueNotification } from 'modules/notifications/actions';
import { switchMap, take, flatMap } from 'rxjs/operators';

const txAuthorizeEpic: Epic = (action$, store) => action$.ofAction(txAuthorize.started).pipe(
    switchMap(action => {
        if ('privateKey' in store.value.auth && keyring.validatePrivateKey(store.value.auth.privateKey!)) {
            return of(txAuthorize.done({
                params: action.payload,
                result: ''
            }));
        }
        else {
            return merge(
                of(modalShow({
                    type: 'AUTHORIZE',
                    params: {}
                })),
                action$.ofAction(modalClose).pipe(
                    take(1),
                    // TODO: refactoring
                    flatMap((resultPayload: any) => {
                        const result: any = resultPayload;
                        if (result.payload.data) {
                            const privateKey = keyring.decryptAES(store.value.auth.session.wallet!.encKey, result.payload.data || '');
                            if (keyring.validatePrivateKey(privateKey)) {
                                return of<Action>(
                                    authorize(privateKey),
                                    txAuthorize.done({
                                        params: action.payload,
                                        result: result.payload.data
                                    })
                                );
                            }
                            else {
                                return of<Action>(
                                    txAuthorize.failed({
                                        params: action.payload,
                                        error: undefined
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
                            return of(txAuthorize.failed({
                                params: action.payload,
                                error: undefined
                            }));
                        }
                    })
                )
            );
        }
    })
);

export default txAuthorizeEpic;