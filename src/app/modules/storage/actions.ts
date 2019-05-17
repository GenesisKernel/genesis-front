/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import actionCreatorFactory from 'typescript-fsa';
import { IWallet, ISaveEncKeyCall, INetwork } from 'apla/auth';

const actionCreator = actionCreatorFactory('storage');
export const saveLocale = actionCreator<string>('SAVE_LOCALE');
export const saveNetwork = actionCreator<INetwork>('SAVE_NETWORK');
export const savePreconfiguredNetworks = actionCreator<INetwork[]>('SAVE_PRECONFIGURED_NETWORKS');
export const removeNetwork = actionCreator<string>('REMOVE_NETWORK');
export const saveWallet = actionCreator<IWallet>('SAVE_WALLET');
export const removeWallet = actionCreator<IWallet>('REMOVE_WALLET');
export const saveNavigationSize = actionCreator<number>('SAVE_NAVIGATION_SIZE');
export const mergeFullNodes = actionCreator<{ uuid: string, fullNodes: string[] }>('MERGE_FULL_NODES');
export const saveEncKey = actionCreator<ISaveEncKeyCall>('SAVE_ENC_KEY');
export const closeSecurityWarning = actionCreator<string>('CLOSE_SECURITY_WARNING');