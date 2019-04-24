// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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

import { Epic } from 'modules';
import { Observable } from 'rxjs';
import { connect } from 'modules/socket/actions';
import { initialize, setLocale } from '../actions';
import { IWebSettings } from 'apla';
import urlJoin from 'url-join';
import platform from 'lib/platform';
import NodeObservable from '../util/NodeObservable';
import keyring from 'lib/keyring';
import { mergeFullNodes, saveWallet } from 'modules/storage/actions';

const fullNodesFallback = ['http://127.0.0.1:7079'];

const initializeEpic: Epic = (action$, store, { api, defaultKey, defaultPassword }) => action$.ofAction(initialize.started)
    .flatMap(action => {
        const requestUrl = platform.select({
            web: urlJoin(process.env.PUBLIC_URL || location.origin, 'settings.json'),
            desktop: './settings.json'
        });

        return Observable.ajax.getJSON<IWebSettings>(
            requestUrl

        ).catch(e =>
            Observable.of({} as IWebSettings)

        ).map(result => {
            if (!result) {
                result = {};
            }

            const config: IWebSettings = {
                networkID: 'number' === typeof platform.args.networkID ? platform.args.networkID : 'number' === typeof result.networkID ? result.networkID : 1,
                fullNodes: (platform.args.fullNode && platform.args.fullNode.length) ? platform.args.fullNode :
                    (result.fullNodes && Array.isArray(result.fullNodes) && result.fullNodes.length) ? result.fullNodes :
                        fullNodesFallback,
                activationEmail: platform.args.activationEmail || result.activationEmail,
                socketUrl: platform.args.socketUrl || ((result.socketUrl && 'string' === typeof result.socketUrl) ? result.socketUrl : null),
                disableFullNodesSync: 'boolean' === typeof platform.args.disableFullNodesSync ? platform.args.disableFullNodesSync :
                    ('boolean' === typeof result.disableFullNodesSync) ? result.disableFullNodesSync : null
            };
            return config;

        }).flatMap(config => {
            const fullNodes = config.disableFullNodesSync ? config.fullNodes : [
                ...(store.getState().storage.fullNodes || []),
                ...config.fullNodes
            ];
            return NodeObservable({
                networkID: config.networkID,
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
                            networkID: config.networkID,
                            fullNodes: fullNodes,
                            nodeHost: node,
                            activationEmail: config.activationEmail
                        }
                    })),
                    Observable.of(setLocale.started(state.storage.locale)),
                    Observable.from(client.getUid({ networkID: config.networkID }))
                        .flatMap(uid => {
                            const guestKey = action.payload.defaultKey || defaultKey;

                            return client.authorize(uid.token).login({
                                publicKey: keyring.generatePublicKey(guestKey),
                                signature: keyring.sign(uid.uid, guestKey)

                            }).then(loginResult => {
                                const securedClient = client.authorize(loginResult.token);

                                return Promise.all([
                                    config.socketUrl ? Promise.resolve(config.socketUrl) : client.getConfig({ name: 'centrifugo' }).catch(e => null),
                                    config.disableFullNodesSync ? Promise.resolve(fullNodes) :
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
                        }).flatMap(result => Observable.concat(
                            Observable.if(
                                () => !!action.payload.defaultKey,
                                Observable.of(saveWallet({
                                    id: result.login.key_id,
                                    encKey: keyring.encryptAES(action.payload.defaultKey, defaultPassword),
                                    publicKey: keyring.generatePublicKey(action.payload.defaultKey),
                                    address: result.login.address
                                })),
                                Observable.empty<never>()
                            ),
                            Observable.of(connect.started({
                                wsHost: result.centrifugo,
                                session: result.login.token,
                                socketToken: result.login.notify_key,
                                timestamp: result.login.timestamp,
                                userID: result.login.key_id
                            })),
                            Observable.of(mergeFullNodes([...result.fullNodes, ...config.fullNodes]))

                        )).catch(e => Observable.of(connect.failed({
                            params: null,
                            error: 'E_SOCKET_OFFLINE'
                        })))
                );

            }).defaultIfEmpty(initialize.failed({
                params: action.payload,
                error: 'E_OFFLINE'
            }));
        });
    });

export default initializeEpic;