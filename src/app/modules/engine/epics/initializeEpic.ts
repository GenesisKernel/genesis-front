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

import { Epic } from 'modules';
import { Observable } from 'rxjs';
import { connect } from 'modules/socket/actions';
import { initialize, setLocale } from '../actions';
import urlJoin from 'url-join';
import platform from 'lib/platform';

const initializeEpic: Epic = (action$, store) => action$.ofAction(initialize.started)
    .flatMap(action => {
        const requestUrl = platform.select({
            web: urlJoin(location.origin, 'settings.json'),
            desktop: './settings.json'
        });

        return Observable.ajax.getJSON<{ fullNodes?: string[] }>(requestUrl)
            .map(result =>
                initialize.done({
                    params: action.payload,
                    result: result.fullNodes
                })

            ).catch(result => Observable.of(initialize.done({
                params: action.payload,
                result: ['http://127.0.0.1:7079']
            })));

    }).flatMap(result => {
        const state = store.getState();
        return Observable.concat([
            result,
            setLocale.started(state.storage.locale),
            ...(state.auth.session && state.auth.session.wsToken) ? [connect.started({
                wsHost: state.auth.session.wsHost,
                socketToken: state.auth.session.wsToken,
                timestamp: state.auth.session.timestamp,
                userID: state.auth.id
            })] : []
        ]);
    });

export default initializeEpic;