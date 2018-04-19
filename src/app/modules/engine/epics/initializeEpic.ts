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
import NodeObservable from '../util/NodeObservable';
import keyring from 'lib/keyring';

const fullNodesFallback = ['http://127.0.0.1:7079'];

const initializeEpic: Epic = (action$, store, { api, defaultKey }) => action$.ofAction(initialize.started)
    .flatMap(action => {
        const requestUrl = platform.select({
            web: urlJoin(location.origin, 'settings.json'),
            desktop: './settings.json'
        });

        return Observable.ajax.getJSON<{ fullNodes?: string[] }>(requestUrl)
            .map(l => l.fullNodes)
            .defaultIfEmpty(fullNodesFallback)
            .catch(e => Observable.of(fullNodesFallback))
            .flatMap(fullNodes =>
                NodeObservable({
                    nodes: fullNodes,
                    count: 1,
                    timeout: 5000,
                    concurrency: 10,
                    api
                }).flatMap(node => {
                    const state = store.getState();
                    const client = api({ apiHost: node });

                    return Observable.concat(
                        Observable.of(initialize.done({
                            params: action.payload,
                            result: {
                                fullNodes,
                                nodeHost: node
                            }
                        })),
                        Observable.of(setLocale.started(state.storage.locale)),
                        Observable.from(client.getUid())
                            .flatMap(uid => Observable.from(
                                client.authorize(uid.token).login({
                                    publicKey: keyring.generatePublicKey(defaultKey),
                                    signature: keyring.sign(uid.uid, defaultKey)
                                })

                            )).map(loginResult =>
                                connect.started({
                                    session: loginResult.token,
                                    wsHost: 'ws://127.0.0.1:8000',
                                    socketToken: loginResult.notify_key,
                                    timestamp: loginResult.timestamp,
                                    userID: loginResult.key_id
                                })
                            )
                    );

                }).defaultIfEmpty(initialize.failed({
                    params: action.payload,
                    error: 'E_OFFLINE'
                }))
            );
    });

export default initializeEpic;