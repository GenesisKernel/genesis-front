// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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
import { Epic } from 'modules';
import { changeEditorTool, getPageTree } from '../actions';
import { Observable } from 'rxjs/Observable';

const changeEditorToolEpic: Epic = (action$, store, { api }) => action$.ofAction(changeEditorTool.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        switch (action.payload) {
            case 'preview':
                const payload = state.editor.tabs[state.editor.tabIndex].value;
                return Observable.fromPromise(client.contentTest({
                    template: payload,
                    locale: state.storage.locale,
                    params: {}

                })).map(result => changeEditorTool.done({
                    params: action.payload,
                    result: result.tree

                })).catch(e => Observable.of(changeEditorTool.failed({
                    params: action.payload,
                    error: e
                })));

            case 'constructor':
                return Observable.of<Action>(
                    getPageTree.started(null),
                    changeEditorTool.done({
                        params: action.payload,
                        result: null
                    }));

            default:
                return Observable.of(changeEditorTool.done({
                    params: action.payload,
                    result: null
                }));
        }
    });

export default changeEditorToolEpic;