// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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
import { ISession, IAccountContext } from 'apla/auth';
import { IAccount } from 'apla/api';
import loginHandler from './reducers/loginHandler';
import loginDoneHandler from './reducers/loginDoneHandler';
import loginFailedHandler from './reducers/loginFailedHandler';
import logoutDoneHandler from './reducers/logoutDoneHandler';
import createWalletHandler from './reducers/createWalletHandler';
import createWalletDoneHandler from './reducers/createWalletDoneHandler';
import createWalletFailedHandler from './reducers/createWalletFailedHandler';
import importWalletHandler from './reducers/importWalletHandler';
import importWalletDoneHandler from './reducers/importWalletDoneHandler';
import importWalletFailedHandler from './reducers/importWalletFailedHandler';
import importSeedDoneHandler from './reducers/importSeedDoneHandler';
import selectWalletHandler from './reducers/selectWalletHandler';
import authorizeHandler from './reducers/authorizeHandler';
import deauthorizeHandler from './reducers/deauthorizeHandler';
import generateSeedDoneHandler from './reducers/generateSeedDoneHandler';
import changeSeedHandler from './reducers/changeSeedHandler';
import changeSeedConfirmationHandler from './reducers/changeSeedConfirmation';
import importSeedConfirmationDoneHandler from './reducers/importSeedConfirmationDoneHandler';
import loadWalletsDoneHandler from './reducers/loadWalletsDoneHandler';
import loadWalletHandler from './reducers/loadWalletHandler';

export type State = {
    readonly seed: string;
    readonly seedConfirm: string;
    readonly isAuthenticated: boolean;
    readonly isLoggingIn: boolean;
    readonly isCreatingWallet: boolean;
    readonly createWalletError: string;
    readonly isImportingWallet: boolean;
    readonly importWalletError: string;
    readonly id: string;
    readonly session: ISession;
    readonly defaultWallet: string;
    readonly wallet: IAccountContext;
    readonly wallets: IAccount[];
    readonly privateKey: string;
};

export const initialState: State = {
    seed: '',
    seedConfirm: '',
    isAuthenticated: false,
    isLoggingIn: false,
    isCreatingWallet: false,
    createWalletError: null,
    isImportingWallet: false,
    importWalletError: null,
    id: null,
    session: null,
    defaultWallet: null,
    wallet: null,
    privateKey: null,
    wallets: []
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.login.started, loginHandler)
    .case(actions.login.done, loginDoneHandler)
    .case(actions.login.failed, loginFailedHandler)
    .case(actions.logout.done, logoutDoneHandler)
    .case(actions.createWallet.started, createWalletHandler)
    .case(actions.createWallet.done, createWalletDoneHandler)
    .case(actions.createWallet.failed, createWalletFailedHandler)
    .case(actions.importWallet.started, importWalletHandler)
    .case(actions.importWallet.done, importWalletDoneHandler)
    .case(actions.importWallet.failed, importWalletFailedHandler)
    .case(actions.importSeed.done, importSeedDoneHandler)
    .case(actions.importSeedConfirmation.done, importSeedConfirmationDoneHandler)
    .case(actions.selectWallet, selectWalletHandler)
    .case(actions.authorize, authorizeHandler)
    .case(actions.deauthorize, deauthorizeHandler)
    .case(actions.generateSeed.done, generateSeedDoneHandler)
    .case(actions.changeSeed, changeSeedHandler)
    .case(actions.changeSeedConfirmation, changeSeedConfirmationHandler)
    .case(actions.loadWallets.done, loadWalletsDoneHandler)
    .case(actions.loadWallet, loadWalletHandler);