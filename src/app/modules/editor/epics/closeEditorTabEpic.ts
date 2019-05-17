/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { closeEditorTab } from '../actions';
import { updateSection } from 'modules/sections/actions';

const closeEditorTabEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(closeEditorTab)
        .map(action => {
            const state = store.getState();
            const section = state.sections.sections.editor;

            return updateSection({
                ...section,
                visible: 0 < state.editor.tabs.length
            });
        });

export default closeEditorTabEpic;