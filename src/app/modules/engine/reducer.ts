/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as actions from './actions';
import { ISession, INetwork } from 'apla/auth';
import defaultLocale from 'lib/en-US.json';
import NetworkError from 'services/network/errors';
import { IFatalError } from 'apla';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import initializeDoneHandler from './reducers/initializeDoneHandler';
import setLocaleDoneHandler from './reducers/setLocaleDoneHandler';
import setCollapsedHandler from './reducers/setCollapsedHandler';
import discoverNetworkHandler from './reducers/discoverNetworkHandler';
import discoverNetworkDoneHandler from './reducers/discoverNetworkDoneHandler';
import discoverNetworkFailedHandler from './reducers/discoverNetworkFailedHandler';
import addNetworkHandler from './reducers/addNetworkHandler';
import addNetworkDoneHandler from './reducers/addNetworkDoneHandler';
import initializeFailedHandler from './reducers/initializeFailedHandler';
import addNetworkFailedHandler from './reducers/addNetworkFailedHandler';

export type State = {
    readonly networkError: NetworkError;
    readonly fatalError?: IFatalError;
    readonly guestSession: ISession;
    readonly localeMessages: { [key: string]: string };
    readonly isCollapsed: boolean;
    readonly isLoaded: boolean;
    readonly isConnecting: boolean;
    readonly preconfiguredNetworks: INetwork[];
};

export const initialState: State = {
    networkError: null,
    fatalError: null,
    guestSession: null,
    localeMessages: defaultLocale,
    isCollapsed: true,
    isLoaded: false,
    isConnecting: false,
    preconfiguredNetworks: []
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.initialize.done, initializeDoneHandler)
    .case(actions.initialize.failed, initializeFailedHandler)
    .case(actions.setCollapsed, setCollapsedHandler)
    .case(actions.setLocale.done, setLocaleDoneHandler)
    .case(actions.discoverNetwork.started, discoverNetworkHandler)
    .case(actions.discoverNetwork.done, discoverNetworkDoneHandler)
    .case(actions.discoverNetwork.failed, discoverNetworkFailedHandler)
    .case(actions.addNetwork.started, addNetworkHandler)
    .case(actions.addNetwork.done, addNetworkDoneHandler)
    .case(actions.addNetwork.failed, addNetworkFailedHandler);