// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import { OrderedMap } from 'immutable';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';

export type State = {
    readonly transactions: OrderedMap<string, { uuid: string, contract: string, block: string, error?: { type: string, error: string } }>;
};

export const initialState: State = {
    transactions: OrderedMap()
};

export default reducerWithInitialState(initialState)
    .case(actions.contractExec.started, (state, payload) => ({
        ...state,
        transactions: state.transactions.set(payload.uuid, {
            block: null,
            error: null,
            contract: payload.name,
            uuid: payload.uuid
        })
    }))
    .case(actions.contractExec.done, (state, payload) => ({
        ...state,
        transactions: state.transactions.set(payload.params.uuid, {
            block: payload.result,
            error: null,
            contract: payload.params.name,
            uuid: payload.params.uuid
        })
    }))
    .case(actions.contractExec.failed, (state, payload) => ({
        ...state,
        transactions: state.transactions.set(payload.params.uuid, {
            block: null,
            error: payload.error,
            contract: payload.params.name,
            uuid: payload.params.uuid
        })
    }));