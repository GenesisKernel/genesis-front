/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
