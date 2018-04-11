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
import { Observable } from 'rxjs';
import { Epic } from 'modules';
import { checkOnline } from '../actions';
import { importAccount } from 'modules/auth/actions';
import platform from 'lib/platform';

const checkOnlineEpic: Epic = (action$, store, { api }) => action$.ofAction(checkOnline.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.engine.apiHost);

        return Observable.fromPromise(client.getUid()).flatMap(payload => {
            const privateKey = platform.args().PRIVATE_KEY;
            if (privateKey) {
                return Observable.of<Action>(
                    importAccount.started({
                        backup: privateKey,
                        password: 'genesis',
                        isDefault: true
                    }),
                    checkOnline.done({
                        params: action.payload,
                        result: true
                    })
                );
            }
            else {
                return Observable.of<Action>(checkOnline.done({
                    params: action.payload,
                    result: true
                }));
            }

        }).catch(error =>
            Observable.of(checkOnline.failed({
                params: null,
                error: error.error
            }))
        ).delay(600);
    });

export default checkOnlineEpic;