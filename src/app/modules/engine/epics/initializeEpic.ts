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

import { Epic } from 'modules';
import { of, concat, from, forkJoin, iif, empty } from 'rxjs';
import { connect } from 'modules/socket/actions';
import { initialize, setLocale } from '../actions';
import { IWebSettings } from 'genesis';
import urlJoin from 'url-join';
import platform from 'lib/platform';
import NodeObservable from '../util/NodeObservable';
import keyring from 'lib/keyring';
import { mergeFullNodes, saveWallet } from 'modules/storage/actions';
import { flatMap, catchError, map, defaultIfEmpty } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Action } from 'redux';
import { acquireSession } from 'modules/auth/actions';

const fullNodesFallback = ['http://127.0.0.1:7079'];

const initializeEpic: Epic = (action$, store, { api, defaultKey, defaultPassword }) => action$.ofAction(initialize.started).pipe(
    flatMap(action => {
        const requestUrl = platform.target({
            web: urlJoin(process.env.PUBLIC_URL || location.origin, 'settings.json'),
            desktop: './settings.json'
        });

        return ajax.getJSON<IWebSettings>(
            requestUrl

        ).pipe(
            catchError(e => of<IWebSettings>({})),
            map(result => {
                if (!result) {
                    result = {};
                }

                const config: IWebSettings = {
                    fullNodes: (platform.args.fullNode && platform.args.fullNode.length) ? platform.args.fullNode :
                        (result.fullNodes && Array.isArray(result.fullNodes) && result.fullNodes.length) ? result.fullNodes :
                            fullNodesFallback,
                    activationEmail: platform.args.activationEmail || result.activationEmail,
                    socketUrl: platform.args.socketUrl || ((result.socketUrl && 'string' === typeof result.socketUrl) ? result.socketUrl : undefined),
                    disableFullNodesSync: 'boolean' === typeof platform.args.disableFullNodesSync ? platform.args.disableFullNodesSync :
                        ('boolean' === typeof result.disableFullNodesSync) ? result.disableFullNodesSync : undefined
                };
                return config;

            }),
            flatMap(config => {
                const fullNodes = config.disableFullNodesSync ? config.fullNodes! : [
                    ...(store.value.storage.fullNodes || []),
                    ...config.fullNodes!
                ];
                return NodeObservable({
                    nodes: fullNodes,
                    count: 1,
                    timeout: 5000,
                    concurrency: 10,
                    api

                }).pipe(
                    flatMap(node => {
                        const client = api({ apiHost: node });

                        return concat(
                            of(initialize.done({
                                params: action.payload,
                                result: {
                                    fullNodes: fullNodes,
                                    nodeHost: node,
                                    activationEmail: config.activationEmail
                                }
                            })),
                            of(setLocale.started(store.value.storage.locale)),
                            from(client.getUid()).pipe(
                                flatMap(uid => {
                                    return from(client.authorize(uid.token).login({
                                        publicKey: keyring.generatePublicKey(defaultKey),
                                        signature: keyring.sign(uid.uid, defaultKey)
                                    })).pipe(
                                        flatMap(loginResult => {
                                            const securedClient = client.authorize(loginResult.token);
                                            return forkJoin(
                                                iif(
                                                    () => !!config.socketUrl,
                                                    of(config.socketUrl),
                                                    from(securedClient.getConfig({ name: 'centrifugo' })).pipe(
                                                        catchError(e => of(''))
                                                    )
                                                ),
                                                iif(
                                                    () => !!config.disableFullNodesSync,
                                                    of(fullNodes),
                                                    from(securedClient.getSystemParams({ names: ['full_nodes'] })).pipe(
                                                        map(paramsResult => {
                                                            const value = paramsResult.list.find(p => p.name === 'full_nodes')!.value;
                                                            return JSON.parse(value).map((paramValue: any) => paramValue.api_address) as string[];
                                                        }),
                                                        catchError(e => of([] as string[]))
                                                    )
                                                )
                                            ).pipe(
                                                map(([centrifugo, remoteFullNodes]) => ({
                                                    centrifugo,
                                                    fullNodes: remoteFullNodes,
                                                    login: loginResult
                                                }))
                                            );
                                        })
                                    );
                                }),
                                flatMap(workConfig => concat(
                                    iif(
                                        () => 'defaultKey' in action.payload,
                                        of(saveWallet({
                                            id: workConfig.login.key_id,
                                            encKey: keyring.encryptAES(action.payload.defaultKey!, defaultPassword),
                                            publicKey: keyring.generatePublicKey(action.payload.defaultKey!),
                                            address: workConfig.login.address,
                                            settings: {}
                                        })),
                                        empty()
                                    ),
                                    iif(
                                        () => store.value.auth.isAuthenticated && !!store.value.auth.session,
                                        of(acquireSession.started(store.value.auth.session)),
                                        empty()
                                    ),
                                    of<Action>(connect.started({
                                        wsHost: workConfig.centrifugo!,
                                        session: workConfig.login.token,
                                        socketToken: workConfig.login.notify_key,
                                        timestamp: workConfig.login.timestamp,
                                        userID: workConfig.login.key_id
                                    })),
                                    of<Action>(mergeFullNodes([
                                        ...workConfig.fullNodes,
                                        ...config.fullNodes!
                                    ]))
                                ))
                            )
                        );
                    }),
                    defaultIfEmpty(initialize.failed({
                        params: action.payload,
                        error: 'E_OFFLINE'
                    }) as any)
                );
            }),
        );
    })
);

export default initializeEpic;