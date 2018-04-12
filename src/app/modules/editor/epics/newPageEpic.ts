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
import { Observable } from 'rxjs';
import { Epic } from 'modules';
import { editorSave, reloadEditorTab } from '../actions';
import ModalObservable from '../../modal/util/ModalObservable';
import TxObservable from '../../tx/util/TxObservable';

const newPageEpic: Epic = (action$, store, { api }) => action$.ofAction(editorSave)
    .filter(l => l.payload.new && 'page' === l.payload.type)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.engine.apiHost, state.auth.sessionToken);
        const id = uuid.v4();

        return Observable.fromPromise(client.getData({
            name: 'menu',
            columns: ['name']

        })).flatMap(menus => ModalObservable<{ name: string, menu: string, conditions: string }>(action$, {
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
                    name: '@1NewPage',
                    params: {
                        Name: result.name,
                        Value: action.payload.value,
                        Menu: result.menu,
                        Conditions: result.conditions,
                        ApplicationId: action.payload.appId || 0
                    }
                },
                success: tx => Observable.from(client.getPage({ name: result.name }))
                    .map(response => reloadEditorTab({
                        type: action.payload.type,
                        id: action.payload.id,
                        data: {
                            new: false,
                            id: String(response.id),
                            name: response.name,
                            initialValue: response.value
                        }
                    }))
            })
        }));
    });

export default newPageEpic;