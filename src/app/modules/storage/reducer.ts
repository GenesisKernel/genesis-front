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

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { IWallet } from 'genesis/auth';
import saveLocaleHandler from './reducers/saveLocaleHandler';
import saveWalletHandler from './reducers/saveWalletHandler';
import removeWalletHandler from './reducers/removeWalletHandler';
import saveNavigationSizeHandler from './reducers/saveNavigationSizeHandler';
import mergeFullNodesHandler from './reducers/mergeFullNodesHandler';
import closeSecurityWarningHandler from './reducers/closeSecurityWarningHandler';

export type State = {
    readonly locale: string;
    readonly wallets: IWallet[];
    readonly navigationSize: number;
    readonly fullNodes: string[];
    readonly securityWarningClosed: boolean;
};

export const initialState: State = {
    locale: 'en-US',
    wallets: [],
    navigationSize: 230,
    fullNodes: [],
    securityWarningClosed: false
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.saveLocale, saveLocaleHandler)
    .case(actions.saveWallet, saveWalletHandler)
    .case(actions.removeWallet, removeWalletHandler)
    .case(actions.saveNavigationSize, saveNavigationSizeHandler)
    .case(actions.mergeFullNodes, mergeFullNodesHandler)
    .case(actions.closeSecurityWarning, closeSecurityWarningHandler);