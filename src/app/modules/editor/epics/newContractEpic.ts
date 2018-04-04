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

import * as actions from '../actions';
import * as uuid from 'uuid';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { editorSave } from '../actions';
import { txCall, txExec } from 'modules/tx/actions';
import api from 'lib/api';

const newContractEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(editorSave)
        .filter(l => l.payload.new && 'contract' === l.payload.type)
        .flatMap(action => {
            const id = uuid.v4();

            return Observable.merge(
                Observable.of(txCall({
                    uuid: id,
                    name: '@1NewContract',
                    params: {
                        Value: action.payload.value,
                        Conditions: 'true',
                        ApplicationId: action.payload.appId ? action.payload.appId : 0
                    }
                })),
                action$.ofAction(txExec.done)
                    .filter(l => id === l.payload.params.tx.uuid)
                    .take(1)
                    .takeUntil(action$.ofAction(txExec.failed).filter(l => id === l.payload.params.tx.uuid))
                    .switchMap(tx => {
                        const actualState = store.getState();
                        const contractID = tx.payload.result.result;

                        return Observable.from(api.row(actualState.auth.sessionToken, 'contracts', contractID, 'name'))
                            .map(response => actions.reloadEditorTab({
                                type: action.payload.type,
                                id: action.payload.id,
                                data: {
                                    new: false,
                                    id: contractID,
                                    name: response.value.name,
                                    initialValue: action.payload.value
                                }
                            }));
                    })
            );
        });

export default newContractEpic;