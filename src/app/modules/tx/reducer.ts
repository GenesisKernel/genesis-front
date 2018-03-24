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
import { ITransaction } from 'genesis/tx';

export type State = {
    readonly pendingTransaction: ITransaction;
    readonly transactions: OrderedMap<string, ITransaction>;
};

export const initialState: State = {
    pendingTransaction: null,
    transactions: OrderedMap()
};

export default reducerWithInitialState(initialState)
    .case(actions.txExec.started, (state, payload) => ({
        ...state,
        transactions: state.transactions.set(payload.tx.uuid, {
            block: null,
            error: null,
            contract: payload.tx.name,
            uuid: payload.tx.uuid
        })
    }))
    .case(actions.txExec.done, (state, payload) => ({
        ...state,
        transactions: state.transactions.set(payload.params.tx.uuid, {
            block: payload.result.block,
            result: payload.result.result,
            error: null,
            contract: payload.params.tx.name,
            uuid: payload.params.tx.uuid
        })
    }))
    .case(actions.txExec.failed, (state, payload) => ({
        ...state,
        transactions: state.transactions.set(payload.params.tx.uuid, {
            block: null,
            error: payload.error,
            contract: payload.params.tx.name,
            uuid: payload.params.tx.uuid
        })
    }));