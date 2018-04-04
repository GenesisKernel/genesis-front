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
import { ITransaction, ITransactionCollection, ITransactionCall } from 'genesis/tx';

export default function (state: State, payload: { tx: ITransactionCall, data: Partial<ITransaction> }): State {
    if (payload.tx.parent) {
        const parent = state.transactions.get(payload.tx.parent) as ITransactionCollection;
        const txIndex = parent && parent.transactions && parent.transactions.findIndex(l => payload.tx.uuid === l.uuid);
        const tx = 'number' === typeof txIndex && parent.transactions[txIndex];
        const transactions = parent ? parent.transactions : [];

        return {
            ...state,
            transactions: state.transactions.set(payload.tx.parent, {
                ...parent,
                type: 'collection',
                transactions: tx ?
                    [
                        ...transactions.slice(0, txIndex),
                        {
                            type: 'single',
                            uuid: payload.tx.uuid,
                            contract: payload.tx.name,
                            ...tx,
                            ...payload.data
                        },
                        ...transactions.slice(txIndex + 1),
                    ]
                    :
                    [
                        ...transactions,
                        {
                            type: 'single',
                            uuid: payload.tx.uuid,
                            contract: payload.tx.name,
                            ...tx,
                            ...payload.data
                        }
                    ]
            })
        };
    }
    else {
        const tx = state.transactions.get(payload.tx.uuid) as ITransaction;
        return {
            ...state,
            transactions: state.transactions.set(payload.tx.uuid, {
                ...tx,
                ...payload.data,
                type: 'single'
            })
        };
    }
}