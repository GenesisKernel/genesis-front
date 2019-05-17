/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { discoverNetwork } from '../actions';
import { Reducer } from 'modules';

const discoverNetworkFailedHandler: Reducer<typeof discoverNetwork.failed, State> = (state, payload) => ({
    ...state,
    networkError: payload.error,
    guestSession: null,
    isOffline: true,
    isConnecting: false
});

export default discoverNetworkFailedHandler;