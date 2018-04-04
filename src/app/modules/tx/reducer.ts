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

import { OrderedMap } from 'immutable';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { TTransactionStatus } from 'genesis/tx';
import txExecHandler from './reducers/txExecHandler';
import txExecDoneHandler from './reducers/txExecDoneHandler';
import txExecFailedHandler from './reducers/txExecFailedHandler';

export type State = {
    readonly transactions: OrderedMap<string, TTransactionStatus>;
};

export const initialState: State = {
    transactions: OrderedMap()
};

export default reducerWithInitialState(initialState)
    .case(actions.txExec.started, txExecHandler)
    .case(actions.txExec.done, txExecDoneHandler)
    .case(actions.txExec.failed, txExecFailedHandler);