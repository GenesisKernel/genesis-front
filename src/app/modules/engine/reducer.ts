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

import * as actions from './actions';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import defaultLocale from 'lib/en-US.json';

export type State = {
    readonly apiHost: string;
    readonly wsHost: string;
    readonly localeMessages: { [key: string]: string };
    readonly isCollapsed: boolean;
};

export const initialState: State = {
    apiHost: 'http://127.0.0.1:7079',
    wsHost: 'ws://127.0.0.1:8000',
    localeMessages: defaultLocale,
    isCollapsed: true
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.setCollapsed)) {
        return {
            ...state,
            isCollapsed: action.payload
        };
    }

    if (isType(action, actions.setLocale.done)) {
        return {
            ...state,
            localeMessages: action.payload.result
        };
    }

    if (isType(action, actions.initialize.done)) {
        return {
            ...state,
            apiHost: action.payload.result.apiHost || state.apiHost,
            wsHost: action.payload.result.wsHost || state.wsHost
        };
    }

    return state;
};