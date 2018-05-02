// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import { Action as ReduxAction } from 'redux';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { txCall, txExec } from '../actions';
import { ITransactionCall, ITxResult, ITxError } from 'genesis/tx';
import { isType, Action } from 'typescript-fsa';

const TxObservable = (action$: ActionsObservable<ReduxAction>, params: { tx: ITransactionCall, success?: (tx: ITxResult) => Observable<ReduxAction>, failure?: (error: ITxError) => Observable<ReduxAction> }) =>
    Observable.merge(
        action$.filter(l => isType(l, txExec.done) || isType(l, txExec.failed))
            .filter((l: Action<ITransactionCall>) => params.tx.uuid === l.payload.params.tx.uuid)
            .take(1)
            .flatMap(result => {
                if (isType(result, txExec.done)) {
                    return params.success ? params.success(result.payload.result) : Observable.empty<never>();
                }
                else if (isType(result, txExec.failed)) {
                    return params.failure ? params.failure(result.payload.error) : Observable.empty<never>();
                }
                else {
                    return Observable.empty<never>();
                }
            }),
        Observable.of(txCall(params.tx))
    );

export default TxObservable;