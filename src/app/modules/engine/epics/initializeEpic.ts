// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Action } from 'redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs';
import { connect } from 'modules/socket/actions';
import { initialize, setLocale } from '../actions';
import urlJoin from 'url-join';
import platform from 'lib/platform';
import NodeObservable from '../util/NodeObservable';
import keyring from 'lib/keyring';
import { mergeFullNodes } from 'modules/storage/actions';

const fullNodesFallback = ['http://127.0.0.1:7079'];

const initializeEpic: Epic = (action$, store, { api, defaultKey }) => action$.ofAction(initialize.started)
    .flatMap(action => {
        const fullNodesArg = platform.args()['--full_nodes'];
        const requestUrl = platform.select({
            web: urlJoin(process.env.PUBLIC_URL || location.origin, 'settings.json'),
            desktop: './settings.json'
        });

        return Observable.if(
            () => !!fullNodesArg,
            Observable.of(fullNodesArg)
                .map(l =>
                    l.split('|')
                ),
            Observable.ajax.getJSON<{ fullNodes?: string[] }>(requestUrl)
                .map(l =>
                    l.fullNodes

                ).catch(e =>
                    Observable.of(fullNodesFallback)

                ).defaultIfEmpty(
                    fullNodesFallback

                ).map(fullNodes => [
                    ...(store.getState().storage.fullNodes || []),
                    ...fullNodes
                ])

        ).flatMap(fullNodes =>
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
                        .flatMap(uid => {
                            return client.authorize(uid.token).login({
                                publicKey: keyring.generatePublicKey(defaultKey),
                                signature: keyring.sign(uid.uid, defaultKey)

                            }).then(loginResult => {
                                const securedClient = client.authorize(loginResult.token);

                                return Promise.all([
                                    client.getConfig({ name: 'centrifugo' }).catch(e => null),
                                    securedClient.getSystemParams({ names: ['full_nodes'] })
                                        .then(l =>
                                            JSON.parse(l.list.find(p => p.name === 'full_nodes').value)
                                                .map((n: any) => n.api_address)
                                        ).catch(e =>
                                            []
                                        )
                                ]).then(result => ({
                                    centrifugo: result[0],
                                    login: loginResult,
                                    fullNodes: result[1]
                                }));
                            });
                        }).flatMap(result => Observable.of<Action>(
                            connect.started({
                                wsHost: result.centrifugo,
                                session: result.login.token,
                                socketToken: result.login.notify_key,
                                timestamp: result.login.timestamp,
                                userID: result.login.key_id
                            }),
                            mergeFullNodes([...result.fullNodes, ...fullNodes])

                        )).catch(e => Observable.of(connect.failed({
                            params: null,
                            error: 'E_SOCKET_OFFLINE'
                        })))
                );

            }).defaultIfEmpty(initialize.failed({
                params: action.payload,
                error: 'E_OFFLINE'
            }))
        );
    });

export default initializeEpic;