/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { importSeed } from '../actions';
import { Reducer } from 'modules';

const importSeedDoneHandler: Reducer<typeof importSeed.done, State> = (state, payload) => ({
    ...state,
    seed: payload.result
});

export default importSeedDoneHandler;