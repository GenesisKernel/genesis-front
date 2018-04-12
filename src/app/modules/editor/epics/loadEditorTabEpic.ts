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
import { Epic } from 'modules';
import { loadEditorTab } from '../actions';
import { Observable } from 'rxjs/Observable';
import { updateSection } from 'modules/content/actions';
import { replace } from 'react-router-redux';

const loadEditorTabEpic: Epic = (action$, store, { api }) => action$.ofAction(loadEditorTab.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.engine.apiHost, state.auth.sessionToken);
        const nameParser = /^(@[0-9]+)?(.*)$/i;

        switch (action.payload.type) {
            case 'contract':
                return Observable.fromPromise(client.getContract({
                    name: action.payload.name

                }).then(contract =>
                    client.getRow({
                        table: 'contracts',
                        id: contract.tableid.toString()

                    }).then(row => ({
                        id: contract.tableid.toString(),
                        name: nameParser.exec(contract.name)[2],
                        contract: row.value
                    }))

                )).map(data =>
                    loadEditorTab.done({
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
                    })
                );

            case 'page':
                return Observable.from(client.getPage({
                    name: action.payload.name

                })).map(data =>
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
                );

            case 'menu':
                return Observable.from(client.getMenu({
                    name: action.payload.name

                })).map(data =>
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
                );

            case 'block':
                return Observable.from(client.getBlock({
                    name: action.payload.name

                })).map(data =>
                    loadEditorTab.done({
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
                    })
                );

            default:
                throw { error: 'E_FAILED' };
        }

    }).flatMap(result => {
        const editor = store.getState().content.sections.editor;
        return Observable.of<Action>(
            replace('/editor'),
            result,
            updateSection({
                ...editor,
                visible: true,
                page: {
                    ...editor.page,
                    params: {}
                }
            })
        );

    }).catch(error =>
        Observable.of(loadEditorTab.failed({
            params: null,
            error
        }))
    );

export default loadEditorTabEpic;