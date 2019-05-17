/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { createEditorTab } from '../actions';
import { updateSection } from 'modules/sections/actions';
import { Observable } from 'rxjs/Observable';
import { replace } from 'connected-react-router';

const createEditorTabEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(createEditorTab.started)
        .delay(0)
        .map(action => {
            const state = store.getState();

            const ids = state.editor.tabs
                .filter(l => l.new)
                .map(l => l.id)
                .sort();

            const id = (ids.length ? parseInt(ids[ids.length - 1], 10) + 1 : 1).toString();

            switch (action.payload.type) {
                case 'contract':
                    return createEditorTab.done({
                        params: action.payload,
                        result: {
                            id,
                            name: null,
                            value: 'contract ... {\n    data {\n\n    }\n    conditions {\n\n    }\n    action {\n\n    }\n}'
                        }
                    });

                case 'page':
                case 'block':
                case 'menu':
                    return createEditorTab.done({
                        params: action.payload,
                        result: {
                            id,
                            name,
                            value: ''
                        }
                    });

                default: return createEditorTab.failed({
                    params: action.payload,
                    error: null
                });
            }
        })
        .flatMap(action => {
            const editor = store.getState().sections.sections.editor;

            return Observable.of<Action>(
                replace('/editor'),
                updateSection({
                    ...editor,
                    visible: true,
                    page: {
                        ...editor.page,
                        params: {}
                    }
                }),
                action
            );
        });

export default createEditorTabEpic;