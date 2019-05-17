/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { loadWallets } from '../actions';
import { Observable } from 'rxjs';
import { IKeyInfo } from 'apla/api';

const loadWalletsEpic: Epic = (action$, store, { api }) => action$.ofAction(loadWallets.started)
    .flatMap(action => {
        const state = store.getState();
        const network = store.getState().engine.guestSession.network;
        const client = api({ apiHost: network.apiHost });

        return Observable.from(state.storage.wallets).flatMap(wallet =>
            Observable.from(client.keyinfo({
                id: wallet.id
            }).catch(e => null as IKeyInfo[])).map(keys => ({
                id: wallet.id,
                address: wallet.address,
                encKey: wallet.encKey,
                publicKey: wallet.publicKey,
                access: keys.map(key => ({
                    ...key,
                    roles: key.roles || []
                }))
            }))

        ).toArray().map(wallets => loadWallets.done({
            params: action.payload,
            result: wallets

        })).catch(e => Observable.of(loadWallets.failed({
            params: action.payload,
            error: e
        })));
    });

export default loadWalletsEpic;