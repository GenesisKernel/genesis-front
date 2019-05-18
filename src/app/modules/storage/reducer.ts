/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { IWallet, INetwork } from 'apla/auth';
import saveLocaleHandler from './reducers/saveLocaleHandler';
import saveWalletHandler from './reducers/saveWalletHandler';
import removeWalletHandler from './reducers/removeWalletHandler';
import saveNavigationSizeHandler from './reducers/saveNavigationSizeHandler';
import mergeFullNodesHandler from './reducers/mergeFullNodesHandler';
import closeSecurityWarningHandler from './reducers/closeSecurityWarningHandler';
import saveNetworkHandler from './reducers/saveNetworkHandler';
import removeNetworkHandler from './reducers/removeNetworkHandler';
import savePreconfiguredNetworksHandler from './reducers/savePreconfiguredNetworksHandler';
import rehydrateHandler from './reducers/rehydrateHandler';

export type State = {
    readonly locale: string;
    readonly wallets: IWallet[];
    readonly networks: INetwork[];
    readonly navigationSize: number;
    readonly securityWarningClosed: boolean;
};

export const initialState: State = {
    locale: 'en-US',
    wallets: [],
    networks: [],
    navigationSize: 230,
    securityWarningClosed: false
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.saveLocale, saveLocaleHandler)
    .case(actions.saveWallet, saveWalletHandler)
    .case(actions.removeWallet, removeWalletHandler)
    .case(actions.saveNavigationSize, saveNavigationSizeHandler)
    .case(actions.mergeFullNodes, mergeFullNodesHandler)
    .case(actions.closeSecurityWarning, closeSecurityWarningHandler)
    .case(actions.saveNetwork, saveNetworkHandler)
    .case(actions.removeNetwork, removeNetworkHandler)
    .case(actions.savePreconfiguredNetworks, savePreconfiguredNetworksHandler)
    .case(actions.localstorageInit, rehydrateHandler);