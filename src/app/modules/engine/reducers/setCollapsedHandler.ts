/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { setCollapsed } from '../actions';
import { Reducer } from 'modules';

const setCollapsedHandler: Reducer<typeof setCollapsed, State> = (state, payload) => ({
    ...state,
    isCollapsed: payload
});

export default setCollapsedHandler;