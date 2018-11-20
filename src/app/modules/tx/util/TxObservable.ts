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

import { Action as ReduxAction } from 'redux';
import { Observable, merge, of, empty } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { txCall, txExec } from '../actions';
import { ITransactionCall, ITxError, ITransaction } from 'genesis/tx';
import { isType } from 'typescript-fsa';
import { take, filter, flatMap } from 'rxjs/operators';

const TxObservable = (action$: ActionsObservable<ReduxAction>, params: { tx: ITransactionCall, success: (tx: ITransaction[]) => Observable<ReduxAction>, failure: (error: ITxError) => Observable<ReduxAction> }) =>
    merge(
        action$.ofAction(txExec.done, txExec.failed).pipe(
            filter(l =>
                params.tx.uuid === l.payload.params.uuid
            ),
            take(1),
            flatMap(result => {
                if (isType(result, txExec.done)) {
                    return params.success ? params.success(result.payload.result) : empty();
                }
                else if (isType(result, txExec.failed)) {
                    return params.failure ? params.failure(result.payload.error) : empty();
                }
                else {
                    return empty();
                }
            })
        ),
        of(txCall(params.tx))
    );

export default TxObservable;