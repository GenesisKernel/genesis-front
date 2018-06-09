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

const changePasswordEpic: Epic = (action$, store, { api }) => action$.ofAction(changePassword.started)
    .flatMap(action => {
            const encKey = store.getState().auth.wallet.encKey;
            return Observable.merge(
                Observable.of(modalShow({
                    id: 'AUTH_CHANGE_PASSWORD',
                    type: 'AUTH_CHANGE_PASSWORD',
                    params: {
                        encKey
                    }
                })),
                action$.ofAction(modalClose)
                    .take(1)
                    .flatMap(result => {
                        if ('RESULT' === result.payload.reason) {
                            return Observable.of(changePassword.done({
                                params: action.payload,
                                result: result.payload.data
                            }));
                        }
                        else {
                            return Observable.empty<never>();
                        }
                    })
            );
        }
    );

export default changePasswordEpic;