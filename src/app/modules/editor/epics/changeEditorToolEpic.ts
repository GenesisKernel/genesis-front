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

import { Epic } from 'modules';
import { changeEditorTool } from '../actions';
import { flatMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

const changeEditorToolEpic: Epic = (action$, store, { api }) => action$.ofAction(changeEditorTool.started).pipe(
    flatMap(action => {
        const client = api(store.value.auth.session);

        switch (action.payload) {
            case 'preview':
                const payload = store.value.editor.tabs[store.value.editor.tabIndex].value;
                return from(client.contentTest({
                    template: payload,
                    locale: store.value.storage.locale,
                    params: {}

                })).pipe(
                    map(result => changeEditorTool.done({
                        params: action.payload,
                        result: result.tree

                    })),
                    catchError(e => of(changeEditorTool.failed({
                        params: action.payload,
                        error: e
                    })))
                );

            default:
                return of(changeEditorTool.done({
                    params: action.payload,
                    result: []
                }));
        }
    })
);

export default changeEditorToolEpic;