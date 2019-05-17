/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { switchWindow } from '../actions';
import { Reducer } from 'modules';

const switchWindowDoneHandler: Reducer<typeof switchWindow.done, State> = (state, payload) => ({
    ...state,
    window: payload.result
});

export default switchWindowDoneHandler;