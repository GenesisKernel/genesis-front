/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { reset } from '../actions';
import { Reducer } from 'modules';

const resetHandler: Reducer<typeof reset, State> = (state, payload) => ({
    ...state,
    inited: false
});

export default resetHandler;