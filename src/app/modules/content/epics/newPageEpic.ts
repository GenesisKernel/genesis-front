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

import * as uuid from 'uuid';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { editorSave, modalShow, modalClose, reloadEditorTab } from '../actions';
import api from 'lib/api';
import { txCall, txExec } from 'modules/tx/actions';

const newPageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(editorSave)
        .filter(l => l.payload.new && 'page' === l.payload.type)
        .switchMap(action => {
            const id = uuid.v4();

            return Observable.merge(
                Observable.from(api.list(store.getState().auth.sessionToken, 'menu', null, null, ['name']))
                    .map(menus =>
                        modalShow({
                            id,
                            type: 'CREATE_PAGE',
                            params: {
                                menus: menus.list.map(l => l.name)
                            }
                        })
                    ),
                action$.ofAction(modalClose)
                    .take(1)
                    .switchMap(result => {
                        if ('RESULT' === result.payload.reason) {
                            return Observable.merge(
                                Observable.of(txCall({
                                    uuid: id,
                                    name: '@1NewPage',
                                    params: {
                                        Name: result.payload.data.name,
                                        Value: action.payload.value,
                                        Menu: result.payload.data.menu,
                                        Conditions: result.payload.data.conditions
                                    }
                                })),
                                action$.ofAction(txExec.done)
                                    .filter(l => id === l.payload.params.tx.uuid)
                                    .take(1)
                                    .takeUntil(action$.ofAction(txExec.failed).filter(l => id === l.payload.params.tx.uuid))
                                    .switchMap(tx => {
                                        const state = store.getState();

                                        return Observable.from(api.findPage(state.auth.sessionToken, result.payload.data.name))
                                            .map(response => reloadEditorTab({
                                                type: action.payload.type,
                                                id: action.payload.id,
                                                data: {
                                                    new: false,
                                                    id: String(response.id),
                                                    name: response.name,
                                                    initialValue: response.value
                                                }
                                            }));
                                    })
                            );
                        }
                        else {
                            return Observable.empty<never>();
                        }
                    })
            );
        });

export default newPageEpic;