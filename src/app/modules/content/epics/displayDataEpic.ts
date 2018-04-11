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
import { Observable } from 'rxjs/Observable';
import { displayData } from 'modules/content/actions';
import { modalShow } from 'modules/modal/actions';

const displayDataEpic: Epic = (action$, store, { api }) => action$.ofAction(displayData.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.engine.apiHost, state.auth.sessionToken);

        return Observable.fromPromise(client.resolveTextData(action.payload))
            .flatMap(payload =>
                Observable.of<Action>(
                    modalShow({
                        id: 'DISPLAY_INFO',
                        type: 'INFO',
                        params: {
                            value: payload
                        }
                    }),
                    displayData.done({
                        params: action.payload,
                        result: payload
                    })
                )
            )
            .catch(e =>
                Observable.of(displayData.failed({
                    params: action.payload,
                    error: e.error
                }))
            );
    });

export default displayDataEpic;