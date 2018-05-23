// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { IAccount, IRole, ISession } from 'genesis/auth';
import loginHandler from './reducers/loginHandler';
import loginDoneHandler from './reducers/loginDoneHandler';
import loginFailedHandler from './reducers/loginFailedHandler';
import logoutDoneHandler from './reducers/logoutDoneHandler';
import createAccountHandler from './reducers/createAccountHandler';
import createAccountDoneHandler from './reducers/createAccountDoneHandler';
import createAccountFailedHandler from './reducers/createAccountFailedHandler';
import importAccountHandler from './reducers/importAccountHandler';
import importAccountDoneHandler from './reducers/importAccountDoneHandler';
import importAccountFailedHandler from './reducers/importAccountFailedHandler';
import importSeedDoneHandler from './reducers/importSeedDoneHandler';
import selectAccountHandler from './reducers/selectAccountHandler';
import authorizeHandler from './reducers/authorizeHandler';
import deauthorizeHandler from './reducers/deauthorizeHandler';
import generateSeedDoneHandler from './reducers/generateSeedDoneHandler';
import selectRoleDoneHandler from './reducers/selectRoleDoneHandler';

export type State = {
    readonly loadedSeed: string;
    readonly isAuthenticated: boolean;
    readonly isLoggingIn: boolean;
    readonly isCreatingAccount: boolean;
    readonly createAccountError: string;
    readonly isImportingAccount: boolean;
    readonly importAccountError: string;
    readonly id: string;
    readonly session: ISession;
    readonly defaultAccount: string;
    readonly account: IAccount;
    readonly role: IRole;
    readonly roles: IRole[];
    readonly privateKey: string;
    readonly ecosystem: string;
};

export const initialState: State = {
    loadedSeed: null,
    isAuthenticated: false,
    isLoggingIn: false,
    isCreatingAccount: false,
    createAccountError: null,
    isImportingAccount: false,
    importAccountError: null,
    id: null,
    session: null,
    defaultAccount: null,
    account: null,
    role: null,
    roles: null,
    privateKey: null,
    ecosystem: null
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.login.started, loginHandler)
    .case(actions.login.done, loginDoneHandler)
    .case(actions.login.failed, loginFailedHandler)
    .case(actions.logout.done, logoutDoneHandler)
    .case(actions.createAccount.started, createAccountHandler)
    .case(actions.createAccount.done, createAccountDoneHandler)
    .case(actions.createAccount.failed, createAccountFailedHandler)
    .case(actions.importAccount.started, importAccountHandler)
    .case(actions.importAccount.done, importAccountDoneHandler)
    .case(actions.importAccount.failed, importAccountFailedHandler)
    .case(actions.importSeed.done, importSeedDoneHandler)
    .case(actions.selectAccount, selectAccountHandler)
    .case(actions.selectRole.done, selectRoleDoneHandler)
    .case(actions.authorize, authorizeHandler)
    .case(actions.deauthorize, deauthorizeHandler)
    .case(actions.generateSeed.done, generateSeedDoneHandler);