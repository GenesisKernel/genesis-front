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
import { initialize, setLocale } from '../actions';
import urlJoin from 'url-join';
import platform from 'lib/platform';
import { saveWallet, savePreconfiguredNetworks } from 'modules/storage/actions';
import { address, addressString } from 'lib/crypto';
import keyring from 'lib/keyring';
import webConfig from 'lib/settings';
import { INetwork } from 'apla/auth';

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

            const preconfiguredNetworks: INetwork[] = config.networks.map(network => ({
                uuid: network.key,
                id: network.networkID,
                name: network.name,
                fullNodes: network.fullNodes,
                socketUrl: network.socketUrl,
                activationEmail: network.activationEmail,
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