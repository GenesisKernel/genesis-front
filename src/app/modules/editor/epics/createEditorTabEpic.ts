// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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