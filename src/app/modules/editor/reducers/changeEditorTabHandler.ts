/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { changeEditorTab } from '../actions';
import { Reducer } from 'modules';

const changeEditorTabHandler: Reducer<typeof changeEditorTab, State> = (state, payload) => ({
    ...state,
    tabIndex: payload
});

export default changeEditorTabHandler;