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
    readonly locale: string;
    readonly uid: string;
    readonly session: string;
    readonly isInstalled: boolean;
    readonly isInstalling: boolean;
    readonly isLoading: boolean;
    readonly isConnected: boolean;
    readonly isLoggingIn: boolean;
};

export const initialState: State = {
    locale: 'en-US',
    uid: null,
    session: null,
    isInstalled: null,
    isInstalling: false,
    isLoading: true,
    isConnected: null,
    isLoggingIn: false
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.identity.started)) {
        return {
            ...state,
            uid: null,
            session: null,
            isLoggingIn: true
        };
    }

    if (isType(action, actions.identity.done)) {
        return {
            ...state,
            uid: action.payload.result.uid,
            session: action.payload.result.session,
            isConnected: true,
            isInstalled: true,
            isLoggingIn: false
        };
    }

    if (isType(action, actions.identity.failed)) {
        switch (action.payload.error) {
            case 'E_NOTINSTALLED':
                return {
                    ...state,
                    uid: null,
                    session: null,
                    isInstalled: false,
                    isConnected: true,
                    isLoggingIn: false
                };

            default:
                return {
                    ...state,
                    uid: null,
                    session: null,
                    isConnected: false,
                    isLoggingIn: false
                };
        }
    }

    if (isType(action, actions.setLoading)) {
        return {
            ...state,
            isLoading: action.payload
        };
    }

    if (isType(action, actions.install.started)) {
        return {
            ...state,
            isInstalling: true
        };
    }

    if (isType(action, actions.install.done)) {
        return {
            ...state,
            isInstalled: true,
            isInstalling: false
        };
    }

    if (isType(action, actions.install.failed)) {
        return {
            ...state,
            isInstalling: false
        };
    }

    return state;
};