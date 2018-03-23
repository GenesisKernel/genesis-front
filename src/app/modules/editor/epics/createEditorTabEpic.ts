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

const createEditorTabEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(createEditorTab.started)
        .delay(0)
        .flatMap(action => {
            const state = store.getState();
            const section = state.content.sections.editor;

            const ids = state.editor.tabs
                .filter(l => l.new)
                .map(l => l.id)
                .sort();

            const id = (ids.length ? parseInt(ids[ids.length - 1], 10) + 1 : 1).toString();

            switch (action.payload) {
                case 'contract':
                    return Observable.of<Action>(
                        createEditorTab.done({
                            params: action.payload,
                            result: {
                                id,
                                name: null,
                                value: 'contract ... {\n    data {\n\n    }\n    conditions {\n\n    }\n    action {\n\n    }\n}'
                            }
                        }),
                        updateSection({
                            ...section,
                            visible: true
                        })
                    );

                case 'page':
                case 'block':
                case 'menu':
                    return Observable.of<Action>(
                        createEditorTab.done({
                            params: action.payload,
                            result: {
                                id,
                                name,
                                value: ''
                            }
                        }),
                        updateSection({
                            ...section,
                            visible: true
                        })
                    );

                default: return Observable.of(createEditorTab.failed({
                    params: action.payload,
                    error: null
                }));
            }
        });

export default createEditorTabEpic;