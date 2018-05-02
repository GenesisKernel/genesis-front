// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { createEditorTab } from '../actions';
import { updateSection } from '../../content/actions';
import { Observable } from 'rxjs/Observable';
import { replace } from 'react-router-redux';

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
            const editor = store.getState().content.sections.editor;

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