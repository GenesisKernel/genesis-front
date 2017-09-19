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

import * as actions from './actions';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';

export type State = {
    readonly loadedSeed: string;
    readonly isAuthenticated: boolean;
    readonly isLoggingIn: boolean;
    readonly wallet: string;
    readonly sessionToken: string;
    readonly refreshToken: string;
};

export const initialState: State = {
    loadedSeed: null,
    isAuthenticated: false,
    isLoggingIn: false,
    wallet: null,
    sessionToken: null,
    refreshToken: null
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.login.started)) {
        return {
            ...state,
            isLoggingIn: true
        };
    }

    if (isType(action, actions.login.done)) {
        // console.log(action.payload.result);
    }

    if (isType(action, actions.importSeed.done)) {
        return {
            ...state,
            loadedSeed: action.payload.result
        };
    }

    return state;
};