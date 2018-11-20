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
import { ISession } from 'genesis/auth';
import { IWalletData } from 'genesis/api';
import loginDoneHandler from './reducers/loginDoneHandler';
import logoutHandler from './reducers/logoutHandler';
import importSeedDoneHandler from './reducers/importSeedDoneHandler';
import selectWalletHandler from './reducers/selectWalletHandler';
import authorizeHandler from './reducers/authorizeHandler';
import deauthorizeHandler from './reducers/deauthorizeHandler';
import generateSeedDoneHandler from './reducers/generateSeedDoneHandler';
import updateSettingsHandler from './reducers/updateSettingsHandler';
import changeSeedHandler from './reducers/changeSeedHandler';
import changeSeedConfirmationHandler from './reducers/changeSeedConfirmation';
import importSeedConfirmationDoneHandler from './reducers/importSeedConfirmationDoneHandler';
import loadWalletsDoneHandler from './reducers/loadWalletsDoneHandler';
import loadWalletHandler from './reducers/loadWalletHandler';
import acquireSessionHandler from './reducers/acquireSessionHandler';
import acquireSessionDoneHandler from './reducers/acquireSessionDoneHandler';

export type State = {
    readonly seed: string;
    readonly seedConfirm: string;
    readonly isAuthenticated: boolean;
    readonly isAcquired: boolean;
    readonly defaultWallet?: string;
    readonly session: ISession;
    readonly wallets: IWalletData[];
    readonly privateKey?: string;
};

export const initialState: State = {
    seed: '',
    seedConfirm: '',
    isAuthenticated: false,
    isAcquired: false,
    session: {
        apiHost: 'http://127.0.0.1:7079'
    },
    defaultWallet: undefined,
    privateKey: undefined,
    wallets: []
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.login.done, loginDoneHandler)
    .case(actions.logout, logoutHandler)
    .case(actions.acquireSession.started, acquireSessionHandler)
    .case(actions.acquireSession.done, acquireSessionDoneHandler)
    .case(actions.importSeed.done, importSeedDoneHandler)
    .case(actions.importSeedConfirmation.done, importSeedConfirmationDoneHandler)
    .case(actions.selectWallet, selectWalletHandler)
    .case(actions.authorize, authorizeHandler)
    .case(actions.deauthorize, deauthorizeHandler)
    .case(actions.generateSeed.done, generateSeedDoneHandler)
    .case(actions.updateSettings, updateSettingsHandler)
    .case(actions.changeSeed, changeSeedHandler)
    .case(actions.changeSeedConfirmation, changeSeedConfirmationHandler)
    .case(actions.loadWallets.done, loadWalletsDoneHandler)
    .case(actions.loadWallet, loadWalletHandler);
