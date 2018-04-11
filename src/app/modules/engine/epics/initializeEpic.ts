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
import { Observable } from 'rxjs';
import { connect } from 'modules/socket/actions';
import { initialize, setLocale, checkOnline } from '../actions';
import urlJoin from 'url-join';

const initializeEpic: Epic = (action$, store) => action$.ofAction(initialize.started)
    .flatMap(action => {
        return Observable.ajax.getJSON<{ apiHost?: string, msgHost?: string }>(urlJoin(location.origin, 'settings.json'))
            .map(result =>
                initialize.done({
                    params: action.payload,
                    result: {
                        apiHost: result.apiHost,
                        wsHost: result.msgHost
                    }
                })

            ).catch(result => Observable.of(initialize.done({
                params: action.payload,
                result: {
                    apiHost: null,
                    wsHost: null
                }
            })));

    }).flatMap(result => {
        const state = store.getState();
        return Observable.of<Action>(
            result,
            checkOnline.started(null),
            connect.started({
                socketToken: state.auth.socketToken,
                timestamp: state.auth.timestamp,
                userID: state.auth.id
            }),
            setLocale.started(state.storage.locale)
        );
    });

export default initializeEpic;