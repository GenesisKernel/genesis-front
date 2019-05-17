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
import { discoverNetwork } from '../actions';
import NodeObservable from '../util/NodeObservable';
import { discover } from 'services/network';
import { connect } from 'modules/socket/actions';
import { mergeFullNodes } from 'modules/storage/actions';
import NetworkError from 'services/network/errors';

const setNetworkEpic: Epic = (action$, store, { api, defaultKey }) => action$.ofAction(discoverNetwork.started)
    .flatMap(action => {
        const network = store.getState().storage.networks.find(l => l.uuid === action.payload.uuid);

        return NodeObservable({
            nodes: network.fullNodes,
            count: 1,
            timeout: 5000,
            concurrency: 10,
            api

        }).flatMap(node =>
            Observable.from(discover({ uuid: network.uuid, apiHost: node }, defaultKey, network.id))
                .flatMap(result => Observable.concat(
                    Observable.of(discoverNetwork.done({
                        params: action.payload,
                        result: {
                            session: {
                                network: {
                                    uuid: network.uuid,
                                    apiHost: node
                                },
                                sessionToken: result.loginResult.token
                            }
                        }
                    })),
                    Observable.of(connect.started({
                        wsHost: network.socketUrl || result.socketUrl,
                        session: result.loginResult.token,
                        socketToken: result.loginResult.notify_key,
                        timestamp: result.loginResult.timestamp,
                        userID: result.loginResult.key_id
                    })),
                    Observable.of(mergeFullNodes({
                        uuid: network.uuid,
                        fullNodes: result.fullNodes
                    }))
                ))

        ).catch((error: NetworkError) => Observable.of(discoverNetwork.failed({
            params: action.payload,
            error
        }))).timeout(10000).catch(timeout => Observable.of(discoverNetwork.failed({
            params: action.payload,
            error: NetworkError.Offline
        })));
    });

export default setNetworkEpic;
