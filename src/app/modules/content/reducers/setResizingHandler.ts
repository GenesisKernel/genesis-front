/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { setResizing } from '../actions';
import { Reducer } from 'modules';

const setResizingHandler: Reducer<typeof setResizing, State> = (state, payload) => ({
    ...state,
    navigationResizing: payload
});

export default setResizingHandler;