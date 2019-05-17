/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

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