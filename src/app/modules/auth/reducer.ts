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
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { IStoredAccount } from 'genesis/storage';

export type State = {
    readonly loadedSeed: string;
    readonly isAuthenticated: boolean;
    readonly authenticationError: string;
    readonly isLoggingIn: boolean;
    readonly isNodeOwner: boolean;
    readonly isEcosystemOwner: boolean;
    readonly isCreatingAccount: boolean;
    readonly createAccountError: string;
    readonly isImportingAccount: boolean;
    readonly importAccountError: string;
    readonly id: string;
    readonly sessionToken: string;
    readonly refreshToken: string;
    readonly socketToken: string;
    readonly timestamp: string;
    readonly defaultAccount: string;
    readonly account: IStoredAccount;
    readonly privateKey: string;
    readonly ecosystem: string;
};

export const initialState: State = {
    loadedSeed: null,
    isAuthenticated: false,
    authenticationError: null,
    isLoggingIn: false,
    isNodeOwner: false,
    isEcosystemOwner: false,
    isCreatingAccount: false,
    createAccountError: null,
    isImportingAccount: false,
    importAccountError: null,
    id: null,
    sessionToken: null,
    refreshToken: null,
    socketToken: null,
    timestamp: null,
    defaultAccount: null,
    account: null,
    privateKey: null,
    ecosystem: null
};

export default reducerWithInitialState<State>(initialState)
    // Login
    .case(actions.login.started, (state, payload) => ({
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
    }))
    .case(actions.login.done, (state, payload) => ({
        ...state,
        isAuthenticated: true,
        isLoggingIn: false,
        isNodeOwner: payload.result.isnode,
        isEcosystemOwner: payload.result.isowner,
        account: payload.result.account,
        ecosystem: payload.result.ecosystem_id,
        sessionToken: payload.result.token,
        refreshToken: payload.result.refresh,
        privateKey: payload.result.privateKey,
        socketToken: payload.result.notify_key,
        timestamp: payload.result.timestamp,
        authenticationError: null,
        id: payload.result.account.id
    }))
    .case(actions.login.failed, (state, payload) => ({
        ...state,
        isLoggingIn: false,
        authenticationError: payload.error
    }))

    // Logout
    .case(actions.logout.done, (state, payload) => ({
        ...state,
        account: null,
        isAuthenticated: false,
        isLoggingIn: false,
        isNodeOwner: false,
        isEcosystemOwner: false
    }))

    // CreateAccount
    .case(actions.createAccount.started, (state, payload) => ({
        ...state,
        isCreatingAccount: true,
        createAccountError: null
    }))
    .case(actions.createAccount.done, (state, payload) => ({
        ...state,
        isCreatingAccount: false,
        createAccountError: null
    }))
    .case(actions.createAccount.failed, (state, payload) => ({
        ...state,
        isCreatingAccount: false,
        createAccountError: payload.error
    }))

    // ImportAccount
    .case(actions.importAccount.started, (state, payload) => ({
        ...state,
        isImportingAccount: true,
        importAccountError: null
    }))
    .case(actions.importAccount.done, (state, payload) => ({
        ...state,
        isImportingAccount: false,
        importAccountError: null
    }))
    .case(actions.importAccount.failed, (state, payload) => ({
        ...state,
        isImportingAccount: false,
        importAccountError: payload.error
    }))

    // ImportAccount
    .case(actions.importAccount.done, (state, payload) => {
        if (payload.params.isDefault) {
            return {
                ...state,
                defaultAccount: payload.result[0].id
            };
        }
        else {
            return state;
        }
    })

    // ImportSeed
    .case(actions.importSeed.done, (state, payload) => ({
        ...state,
        loadedSeed: payload.result
    }))

    // SwitchAccount
    .case(actions.selectAccount.started, (state, payload) => ({
        ...state,
        authenticationError: null,
        account: payload.account
    }))
    .case(actions.selectAccount.done, (state, payload) => ({
        ...state,
        isAuthenticated: true,
        authenticationError: null,
        sessionToken: payload.result.sessionToken,
        refreshToken: payload.result.refreshToken,
        socketToken: payload.params.account.socketToken,
        timestamp: payload.params.account.timestamp,
        account: payload.params.account,
        id: payload.params.account.id
    }))
    .case(actions.selectAccount.failed, (state, payload) => ({
        ...state,
        isAuthenticated: false,
        authenticationError: payload.error,
        account: payload.params.account
    }))

    // Authorize/Deauthorize
    .case(actions.authorize, (state, payload) => ({
        ...state,
        privateKey: payload.privateKey
    }))
    .case(actions.deauthorize, (state, payload) => ({
        ...state,
        privateKey: null
    }));