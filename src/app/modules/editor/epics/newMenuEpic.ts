/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as uuid from 'uuid';
import { Observable } from 'rxjs';
import { Epic } from 'modules';
import { editorSave, reloadEditorTab } from '../actions';
import ModalObservable from 'modules/modal/util/ModalObservable';
import TxObservable from 'modules/tx/util/TxObservable';

const newMenuEpic: Epic = (action$, store, { api }) => action$.ofAction(editorSave)
    .filter(l => l.payload.new && 'menu' === l.payload.type)
    .flatMap(action => {
        const id = uuid.v4();
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        return ModalObservable<{ name: string, conditions: string }>(action$, {
            modal: {
                id,
                type: 'CREATE_INTERFACE',
                params: {
                    type: 'menu'
                }
            },
            success: result => TxObservable(action$, {
                tx: {
                    uuid: id,
                    contracts: [{
                        name: '@1NewMenu',
                        params: [{
                            Name: result.name,
                            Value: action.payload.value,
                            Conditions: result.conditions,
                            ApplicationId: action.payload.appId ? action.payload.appId : 0
                        }]
                    }]
                },
                success: tx => Observable.fromPromise(client.getMenu({
                    name: result.name

                })).map(response => reloadEditorTab({
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
        });
    });

export default newMenuEpic;