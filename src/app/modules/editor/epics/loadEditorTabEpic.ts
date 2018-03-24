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
import { loadEditorTab } from '../actions';
import { Observable } from 'rxjs/Observable';
import { history } from 'store';
import { updateSection } from '../../content/actions';
import api, { IAPIError, IContract } from 'lib/api';

const loadEditorTabEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(loadEditorTab.started)
        .flatMap(action => {
            const state = store.getState();
            const nameParser = /^(@[0-9]+)?(.*)$/i;

            history.replace('/editor');

            switch (action.payload.type) {
                case 'contract':
                    return Observable.from(
                        api.contract(state.auth.sessionToken, action.payload.name)
                            .then(contract =>
                                api.row(state.auth.sessionToken, 'contracts', contract.tableid.toString(), undefined)
                                    .then(row => ({
                                        id: contract.tableid.toString(),
                                        name: nameParser.exec(contract.name)[2],
                                        contract: row.value as IContract
                                    }))
                            ))
                        .map(data =>
                            loadEditorTab.done({
                                params: action.payload,
                                result: {
                                    type: 'contract',
                                    id: data.id,
                                    new: false,
                                    name: data.name,
                                    tool: 'editor',
                                    value: data.contract.value,
                                    initialValue: data.contract.value,
                                    dirty: false
                                }
                            })
                        );

                case 'page':
                    return Observable.from(api.findPage(state.auth.sessionToken, action.payload.name))
                        .map(data =>
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
                    return Observable.from(api.findMenu(state.auth.sessionToken, action.payload.name))
                        .map(data =>
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
                    return Observable.from(api.findBlock(state.auth.sessionToken, action.payload.name))
                        .map(data =>
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
        })
        .flatMap(result => {
            const section = store.getState().content.sections.editor;
            return Observable.of<Action>(
                result,
                updateSection({
                    ...section,
                    visible: true
                })
            );
        })
        .catch((error: IAPIError) =>
            Observable.of(loadEditorTab.failed({
                params: null,
                error
            }))
        );

export default loadEditorTabEpic;