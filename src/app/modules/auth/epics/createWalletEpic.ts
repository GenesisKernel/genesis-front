/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { createWallet } from '../actions';
import { navigate } from 'modules/engine/actions';
import keyring from 'lib/keyring';
import { address, addressString } from 'lib/crypto';

const createWalletEpic: Epic = (action$, store, { api }) => action$.ofAction(createWallet.started)
    .flatMap(action => {
        const keys = keyring.generateKeyPair(action.payload.seed);
        const publicKey = keyring.generatePublicKey(keys.private);
        const encKey = keyring.encryptAES(keys.private, action.payload.password);
        const keyID = address(keys.public);

        return Observable.of<Action>(
            createWallet.done({
                params: action.payload,
                result: {
                    id: keyID,
                    encKey,
                    publicKey,
                    address: addressString(keyID)
                }
            }),
            navigate('/')
        );

    }).catch(e => Observable.of(createWallet.failed({
        params: null,
        error: 'E_IMPORT_FAILED'
    })));

export default createWalletEpic;