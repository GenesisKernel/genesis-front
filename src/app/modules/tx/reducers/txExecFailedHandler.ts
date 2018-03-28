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

import { State } from '../reducer';
import { Failure } from 'typescript-fsa';
import { IExecutionCall, ITxError } from 'genesis/tx';

export default function (state: State, payload: Failure<IExecutionCall, ITxError>): State {
    return {
        ...state,
        transactions: state.transactions.set(payload.params.tx.uuid, {
            block: null,
            error: payload.error,
            contract: payload.params.tx.name,
            uuid: payload.params.tx.uuid
        })
    };
}