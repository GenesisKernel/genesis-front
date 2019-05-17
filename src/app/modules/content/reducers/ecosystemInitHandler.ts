/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { ecosystemInit } from '../actions';
import { Reducer } from 'modules';

const ecosystemInitHandler: Reducer<typeof ecosystemInit.started, State> = (state, payload) => ({
    ...state,
    preloading: true,
    preloadingError: null
});

export default ecosystemInitHandler;