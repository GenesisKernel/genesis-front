/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { initialize } from '../actions';
import { Reducer } from 'modules';

const initializeDoneHandler: Reducer<typeof initialize.done, State> = (state, payload) => ({
    ...state,
    isLoaded: true,
    preconfiguredNetworks: payload.result.preconfiguredNetworks
});

export default initializeDoneHandler;