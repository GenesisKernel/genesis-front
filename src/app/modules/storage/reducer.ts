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

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { IStoredAccount } from 'apla/storage';
import * as actions from './actions';

export type State = {
    accounts: IStoredAccount[];
    navigationSize: number;
};

export const initialState: State = {
    accounts: [],
    navigationSize: 230
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.saveAccount, (state, account) => ({
        ...state,
        accounts: [
            ...state.accounts.filter(l => l.id !== account.id || l.ecosystem !== account.ecosystem),
            account
        ]
    }))
    .case(actions.removeAccount, (state, account) => ({
        ...state,
        accounts: state.accounts.filter(l => l.id !== account.id || l.ecosystem !== account.ecosystem)
    }))

    .case(actions.saveNavigationSize, (state, navigationSize) => ({
        ...state,
        navigationSize: Math.max(
            navigationSize,
            200
        )
    }));