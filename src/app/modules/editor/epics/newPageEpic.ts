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

import { empty } from 'rxjs';
import { Epic } from 'modules';
import { editorSave } from '../actions';
import { flatMap, filter } from 'rxjs/operators';

// TODO: refactoring
const newPageEpic: Epic = (action$, store, { api }) => action$.ofAction(editorSave).pipe(
    filter(l => l.payload.new && 'page' === l.payload.type),
    flatMap(action => {
        return empty();
        /*const client = api(store.value.auth.session);
        const id = uuid.v4();

        return from(client.getData({
            name: 'menu',
            columns: ['name']
        })).pipe(
            flatMap(menus => ModalObservable<{ name: string, menu: string, conditions: string }>(action$, {
                modal: {
                    id,
                    type: 'CREATE_PAGE',
                    params: {
                        menus: menus.list.map(l => l.name)
                    }
                },
                success: result => TxObservable(action$, {
                    tx: {
                        uuid: id,
                        contracts: [{
                            name: '@1NewPage',
                            params: [{
                                Name: result.name,
                                Value: action.payload.value,
                                Menu: result.menu,
                                Conditions: result.conditions,
                                ApplicationId: action.payload.appId || 0
                            }]
                        }]
                    },
                    success: tx => from(client.getPage({ name: result.name })).pipe(
                        map(response => reloadEditorTab({
                            type: action.payload.type,
                            id: action.payload.id,
                            data: {
                                new: false,
                                id: String(response.id),
                                name: response.name,
                                initialValue: response.value
                            }
                        }))
                    ),
                    failure: () => empty()
                }),
                failure: () => empty()
            }))
        );*/
    })
);

export default newPageEpic;