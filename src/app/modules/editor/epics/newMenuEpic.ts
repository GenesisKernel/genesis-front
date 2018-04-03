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
import { editorSave, reloadEditorTab } from '../actions';
import { modalShow, modalClose } from 'modules/modal/actions';
import { txCall, txExec } from 'modules/tx/actions';
import api from 'lib/api';

const newMenuEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(editorSave)
        .filter(l => l.payload.new && 'menu' === l.payload.type)
        .switchMap(action => {
            const id = uuid.v4();

            return Observable.merge(
                Observable.of(modalShow({
                    id,
                    type: 'CREATE_INTERFACE',
                    params: {
                        type: 'menu'
                    }
                })),
                action$.ofAction(modalClose)
                    .take(1)
                    .switchMap(result => {
                        if ('RESULT' === result.payload.reason) {
                            return Observable.merge(
                                Observable.of(txCall({
                                    uuid: id,
                                    name: '@1NewMenu',
                                    params: {
                                        Name: result.payload.data.name,
                                        Value: action.payload.value,
                                        Conditions: result.payload.data.conditions,
                                        ApplicationId: action.payload.appId ? action.payload.appId : 0
                                    }
                                })),
                                action$.ofAction(txExec.done)
                                    .filter(l => id === l.payload.params.tx.uuid)
                                    .take(1)
                                    .takeUntil(action$.ofAction(txExec.failed).filter(l => id === l.payload.params.tx.uuid))
                                    .switchMap(tx => {
                                        const state = store.getState();

                                        return Observable.from(api.findMenu(state.auth.sessionToken, result.payload.data.name))
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

export default newMenuEpic;