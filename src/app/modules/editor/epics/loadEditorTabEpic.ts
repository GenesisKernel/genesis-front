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
import { Epic } from 'modules';
import { loadEditorTab } from '../actions';
import { updateSection } from 'modules/sections/actions';
import { replace } from 'connected-react-router';
import { flatMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

// TODO: refactoring
const nameParser = /^(@[0-9]+)?(.*)$/i;

const loadEditorTabEpic: Epic = (action$, store, { api }) => action$.ofAction(loadEditorTab.started).pipe(
    flatMap(action => {
        const client = api(store.value.auth.session);

        switch (action.payload.type) {
            case 'contract':
                return from(client.getContract({
                    name: action.payload.name

                })).pipe(
                    flatMap(contract => from(client.getRow({
                        table: 'contracts',
                        id: contract.tableid.toString()

                    })).pipe(
                        map(row => ({
                            id: contract.tableid.toString(),
                            name: nameParser.exec(contract.name)[2],
                            contract: row.value
                        })),
                        map(data => loadEditorTab.done({
                            params: action.payload,
                            result: {
                                type: 'contract',
                                id: data.id,
                                new: false,
                                name: data.contract.name,
                                tool: 'editor',
                                value: data.contract.value,
                                initialValue: data.contract.value,
                                dirty: false
                            }
                        }))
                    )),
                );

            case 'page':
                return from(client.getPage({
                    name: action.payload.name
                })).pipe(
                    map(data =>
                        loadEditorTab.done({
                            params: action.payload,
                            result: {
                                type: 'page',
                                id: data.id.toString(),
                                new: false,
                                name: data.name,
                                tool: 'editor',
                                value: data.value,
                                initialValue: data.value,
                                dirty: false
                            }
                        })
                    )
                );

            case 'menu':
                return from(client.getMenu({
                    name: action.payload.name
                })).pipe(
                    map(data =>
                        loadEditorTab.done({
                            params: action.payload,
                            result: {
                                type: 'menu',
                                id: data.id.toString(),
                                new: false,
                                name: data.name,
                                tool: 'editor',
                                value: data.value,
                                initialValue: data.value,
                                dirty: false
                            }
                        })
                    )
                );

            case 'block':
                return from(client.getBlock({
                    name: action.payload.name
                })).pipe(
                    map(data => loadEditorTab.done({
                        params: action.payload,
                        result: {
                            type: 'block',
                            id: data.id.toString(),
                            new: false,
                            name: data.name,
                            tool: 'editor',
                            value: data.value,
                            initialValue: data.value,
                            dirty: false
                        }
                    }))
                );

            default:
                throw { error: 'E_FAILED' };
        }

    }),
    flatMap(action => of<Action>(
        replace('/editor'),
        action,
        updateSection({
            ...store.value.sections.sections.editor,
            visible: true,
            pages: []
        })
    )),
    catchError(error => of(loadEditorTab.failed({
        params: null,
        error
    })))
);

export default loadEditorTabEpic;