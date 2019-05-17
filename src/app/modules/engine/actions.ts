/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import actionCreatorFactory from 'typescript-fsa';
import { push } from 'connected-react-router';
import NetworkError from 'services/network/errors';
import { ISession, INetwork } from 'apla/auth';
import { IFatalError } from 'apla';

const actionCreator = actionCreatorFactory('engine');
export const navigate = (url: string) => push(url);
export const initialize = actionCreator.async<{}, { defaultNetwork: string, preconfiguredNetworks: INetwork[] }, IFatalError>('INITIALIZE');
export const discoverNetwork = actionCreator.async<{ uuid: string }, { session: ISession }, NetworkError>('DISCOVER_NETWORK');
export const addNetwork = actionCreator.async<{ name: string, networkID?: number, apiHost: string }, void>('ADD_NETWORK');
export const setCollapsed = actionCreator<boolean>('SET_COLLAPSED');
export const setLocale = actionCreator.async<string, { [key: string]: string }>('SET_LOCALE');