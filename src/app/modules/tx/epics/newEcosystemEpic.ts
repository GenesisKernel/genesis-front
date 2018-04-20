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

import { IRootState } from 'modules';
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { txExec } from '../actions';
import { saveAccount } from 'modules/storage/actions';

const newEcosystemEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(txExec.done)
        .filter(l => /^(@1)?NewEcosystem$/.test(l.payload.params.tx.name))
        .map(action => {
            const ecosystem = action.payload.result.result;
            const ecosystemName = (action.payload.params.tx.params && action.payload.params.tx.params.Name) || ecosystem;
            const account = store.getState().auth.account;

            return saveAccount({
                id: account.id,
                encKey: account.encKey,
                address: account.address,
                username: null,
                ecosystem,
                ecosystemName
            });
        });

export default newEcosystemEpic;