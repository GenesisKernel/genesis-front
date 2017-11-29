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
import { IStoredKey } from 'lib/storage';

export type State = {
    readonly loadedSeed: string;
    readonly isAuthenticated: boolean;
    readonly isLoggingIn: boolean;
    readonly isCreatingAccount: boolean;
    readonly isNodeOwner: boolean;
    readonly isEcosystemOwner: boolean;
    readonly wallet: string;
    readonly sessionToken: string;
    readonly refreshToken: string;
    readonly socketToken: string;
    readonly sessionDuration: number;
    readonly timestamp: string;
    readonly createdAccount: {
        id: string;
        address: string;
        privateKey: string;
        publicKey: string;
    };
    readonly account: IStoredKey;
    readonly privateKey: string;
    readonly ecosystem: string;
};

export const initialState: State = {
    loadedSeed: null,
    isAuthenticated: false,
    isLoggingIn: false,
    isCreatingAccount: false,
    isNodeOwner: false,
    isEcosystemOwner: false,
    wallet: null,
    sessionToken: null,
    refreshToken: null,
    socketToken: null,
    timestamp: null,
    sessionDuration: null,
    createdAccount: null,
    account: null,
    privateKey: null,
    ecosystem: null
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.login.started)) {
        return {
            ...state,
            isAuthenticated: false,
            isLoggingIn: true,
            isNodeOwner: false,
            isEcosystemOwner: false,
            account: null,
            sessionToken: null,
            refreshToken: null,
            socketToken: null,
            timestamp: null
        };
    }
    else if (isType(action, actions.login.done)) {
        return {
            ...state,
            isAuthenticated: true,
            isLoggingIn: false,
            isNodeOwner: action.payload.result.isnode,
            isEcosystemOwner: action.payload.result.isowner,
            account: action.payload.result.account,
            ecosystem: action.payload.result.ecosystem_id,
            sessionToken: action.payload.result.token,
            refreshToken: action.payload.result.refresh,
            privateKey: action.payload.result.privateKey,
            sessionDuration: action.payload.result.expiry,
            socketToken: action.payload.result.notify_key,
            timestamp: action.payload.result.timestamp
        };
    }
    else if (isType(action, actions.login.failed)) {
        return {
            ...state,
            isLoggingIn: false
        };
    }

    if (isType(action, actions.logout.done)) {
        return {
            ...state,
            isAuthenticated: false,
            isLoggingIn: false,
            isNodeOwner: false,
            isEcosystemOwner: false,
            account: null,
            sessionToken: null,
            refreshToken: null
        };
    }

    if (isType(action, actions.switchEcosystem.started)) {
        return {
            ...state,
            isAuthenticated: false,
            isLoggingIn: true,
            sessionToken: null,
            refreshToken: null
        };
    }
    else if (isType(action, actions.switchEcosystem.done)) {
        return {
            ...state,
            isAuthenticated: true,
            isLoggingIn: false,
            ecosystem: action.payload.params,
            sessionToken: action.payload.result.token,
            refreshToken: action.payload.result.refresh,
            sessionDuration: action.payload.result.sessionDuration
        };
    }
    else if (isType(action, actions.switchEcosystem.failed)) {
        return {
            ...state,
            isAuthenticated: false,
            isLoggingIn: false,
            account: null,
            sessionToken: null,
            refreshToken: null
        };
    }

    if (isType(action, actions.createEcosystem)) {
        return {
            ...state,
            account: {
                ...state.account,
                ecosystems: {
                    ...state.account.ecosystems,
                    [action.payload.id]: action.payload.name
                }
            }
        };
    }

    if (isType(action, actions.importSeed.done)) {
        return {
            ...state,
            loadedSeed: action.payload.result
        };
    }
    else if (isType(action, actions.createAccount.started)) {
        return {
            ...state,
            isCreatingAccount: true,
            createdAccount: null,
        };
    }

    if (isType(action, actions.createAccount.done)) {
        return {
            ...state,
            isCreatingAccount: false,
            createdAccount: action.payload.result
        };
    }

    if (isType(action, actions.createAccount.failed)) {
        return {
            ...state,
            isCreatingAccount: false,
            createdAccount: null
        };
    }

    if (isType(action, actions.clearCreatedAccount)) {
        return {
            ...state,
            createdAccount: null
        };
    }

    if (isType(action, actions.refreshSession)) {
        return {
            ...state,
            sessionToken: action.payload.token,
            refreshToken: action.payload.refresh,
            sessionDuration: action.payload.sessionDuration
        };
    }

    return state;
};