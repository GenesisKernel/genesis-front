/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs';
import { initialize, setLocale } from '../actions';
import urlJoin from 'url-join';
import platform from 'lib/platform';
import { saveWallet, savePreconfiguredNetworks } from 'modules/storage/actions';
import { address, addressString } from 'lib/crypto';
import keyring from 'lib/keyring';
import webConfig from 'lib/settings';
import { INetwork } from 'apla/auth';

const DEFAULT_NETWORK = '__DEFAULT';

const initializeEpic: Epic = (action$, store, { api, defaultKey, defaultPassword }) => action$.ofAction(initialize.started)
    .flatMap(action => {
        const requestUrl = platform.select({
            web: urlJoin(process.env.PUBLIC_URL || location.origin, 'settings.json'),
            desktop: './settings.json'
        });

        return Observable.ajax.getJSON(
            requestUrl

        ).catch(e =>
            Observable.of({})

        ).defaultIfEmpty({}).flatMap(result => webConfig.validate(result)).flatMap(config => {
            const state = store.getState();
            const preconfiguredNetworks: INetwork[] = [];
            let defaultNetworkSet = false;

            if (platform.args.dry && platform.args.fullNode && 'number' === typeof platform.args.networkID) {
                defaultNetworkSet = true;
                preconfiguredNetworks.push({
                    uuid: DEFAULT_NETWORK,
                    id: platform.args.networkID,
                    name: platform.args.networkName,
                    fullNodes: platform.args.fullNode,
                    socketUrl: platform.args.socketUrl,
                    activationEmail: platform.args.activationEmail,
                    disableSync: platform.args.disableFullNodesSync,
                    demoEnabled: platform.args.guestMode
                });
            }

            if (platform.args.privateKey) {
                const publicKey = keyring.generatePublicKey(platform.args.privateKey);
                const keyID = address(publicKey);

                var preconfiguredKey = {
                    id: keyID,
                    encKey: keyring.encryptAES(platform.args.privateKey, defaultPassword),
                    publicKey,
                    address: addressString(keyID)
                };
            }

            config.networks.forEach(network => preconfiguredNetworks.push({
                uuid: network.key,
                id: network.networkID,
                name: network.name,
                fullNodes: network.fullNodes,
                socketUrl: network.socketUrl,
                activationEmail: network.activationEmail,
                disableSync: network.disableSync,
                demoEnabled: network.enableDemoMode
            }));

            return Observable.concat(
                Observable.of(setLocale.started(state.storage.locale)),
                Observable.if(
                    () => !!preconfiguredKey,
                    Observable.of(saveWallet(preconfiguredKey)),
                    Observable.empty<never>()
                ),
                Observable.of(savePreconfiguredNetworks(preconfiguredNetworks)),
                Observable.of(initialize.done({
                    params: action.payload,
                    result: {
                        defaultNetwork: defaultNetworkSet ? DEFAULT_NETWORK : config.defaultNetwork,
                        preconfiguredNetworks
                    }
                }))
            );
        }).catch(e => Observable.of(initialize.failed({
            params: action.payload,
            error: e
        })));
    });

export default initializeEpic;