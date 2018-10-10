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

import { Epic } from 'modules';
import { getPageTree } from '../actions';
import { Observable } from 'rxjs/Observable';

const getPageTreeEpic: Epic = (action$, store, { constructorModule, api }) => action$.ofAction(getPageTree.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        const template = state.editor.tabs[state.editor.tabIndex].value;

        return Observable.fromPromise(client.contentJson({
            template,
            locale: state.storage.locale,
            source: true

        })).map(payload => {
            let jsonData = payload.tree;
            constructorModule.setIds(jsonData);

            jsonData = constructorModule.updateChildrenText(jsonData);

            return getPageTree.done({
                params: action.payload,
                result: {
                    jsonData,
                    treeData: constructorModule.convertToTreeData(jsonData)
                }
            });

        }).catch(e => Observable.of(getPageTree.failed({
            params: action.payload,
            error: e.error
        })));
    });

export default getPageTreeEpic;