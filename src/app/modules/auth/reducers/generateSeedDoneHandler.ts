/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { generateSeed } from '../actions';
import { Reducer } from 'modules';

const generateSeedDoneHandler: Reducer<typeof generateSeed.done, State> = (state, payload) => ({
    ...state,
    seed: payload.result
});

export default generateSeedDoneHandler;