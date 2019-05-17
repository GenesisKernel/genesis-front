/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { createEditorTab } from '../actions';
import { Reducer } from 'modules';

const createEditorTabDoneHandler: Reducer<typeof createEditorTab.done, State> = (state, payload) => ({
    ...state,
    tabs: [
        ...state.tabs,
        {
            type: payload.params.type,
            id: payload.result.id,
            new: true,
            name: payload.result.name,
            tool: 'editor',
            value: payload.result.value,
            initialValue: payload.result.value,
            dirty: false,
            appId: payload.params.appId
        }
    ],
    tabIndex: state.tabs.length
});

export default createEditorTabDoneHandler;