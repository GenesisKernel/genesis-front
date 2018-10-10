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

import * as uuid from 'uuid';
import { Observable } from 'rxjs';
import { Epic } from 'modules';
import { editorSave, reloadEditorTab } from '../actions';
import TxObservable from 'modules/tx/util/TxObservable';

const newContractEpic: Epic = (action$, store, { api }) => action$.ofAction(editorSave)
    .filter(l => l.payload.new && 'contract' === l.payload.type)
    .flatMap(action => {
        const id = uuid.v4();
        const state = store.getState();
        const client = api(state.auth.session);

        return TxObservable(action$, {
            tx: {
                uuid: id,
                contracts: [{
                    name: '@1NewContract',
                    params: [{
                        Value: action.payload.value,
                        Conditions: 'true',
                        ApplicationId: action.payload.appId ? action.payload.appId : 0
                    }]
                }]
            },
            success: results => Observable.from(results).flatMap(result => Observable.fromPromise(client.getRow({
                table: 'contracts',
                id: result.status.result

            })).map(response => reloadEditorTab({
                type: action.payload.type,
                id: action.payload.id,
                data: {
                    new: false,
                    id: String(result.status.result),
                    name: response.value.name,
                    initialValue: action.payload.value
                }
            })))
        });
    });

export default newContractEpic;