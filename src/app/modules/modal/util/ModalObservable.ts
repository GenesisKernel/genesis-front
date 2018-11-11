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
import { Observable, merge, empty, of } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { modalShow, modalClose } from '../actions';
import { IModalCall, TModalResultReason } from 'genesis/modal';
import { take, flatMap } from 'rxjs/operators';

const ModalObservable = <T>(action$: ActionsObservable<Action>, params: { modal: IModalCall, success?: (data: T) => Observable<Action>, failure?: (reason: TModalResultReason) => Observable<Action> }) =>
    merge(
        action$.ofAction(modalClose).pipe(
            take(1),
            flatMap(result => {
                if ('RESULT' === result.payload.reason) {
                    return params.success ? params.success(result.payload.data) : empty();
                }
                else {
                    return params.failure ? params.failure(result.payload.reason) : empty();
                }
            })
        ),
        of(modalShow(params.modal))
    );

export default ModalObservable;