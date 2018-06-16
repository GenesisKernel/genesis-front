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

import * as actions from './actions';
import { OrderedMap } from 'immutable';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ITransaction } from 'genesis/tx';
import txExecHandler from './reducers/txExecHandler';
import txExecDoneHandler from './reducers/txExecDoneHandler';
import txExecFailedHandler from './reducers/txExecFailedHandler';
import txExecBatchHandler from './reducers/txExecBatchHandler';
import txExecBatchDoneHandler from './reducers/txExecBatchDoneHandler';
import txBatchStatusHandler from './reducers/txBatchStatusHandler';
import txExecBatchFailedHandler from './reducers/txExecBatchFailedHandler';

export type State = {
    readonly transactions: OrderedMap<string, ITransaction>;
};

export const initialState: State = {
    transactions: OrderedMap()
};

export default reducerWithInitialState(initialState)
    .case(actions.txExec.started, txExecHandler)
    .case(actions.txExec.done, txExecDoneHandler)
    .case(actions.txExec.failed, txExecFailedHandler)
    .case(actions.txExecBatch.started, txExecBatchHandler)
    .case(actions.txExecBatch.done, txExecBatchDoneHandler)
    .case(actions.txExecBatch.failed, txExecBatchFailedHandler)
    .case(actions.txBatchStatus, txBatchStatusHandler);