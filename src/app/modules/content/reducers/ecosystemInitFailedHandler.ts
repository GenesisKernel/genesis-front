/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { ecosystemInit } from '../actions';
import { Reducer } from 'modules';

const ecosystemInitFailedHandler: Reducer<typeof ecosystemInit.failed, State> = (state, payload) => ({
    ...state,
    preloading: false,
    preloadingError: payload.error
});

export default ecosystemInitFailedHandler;