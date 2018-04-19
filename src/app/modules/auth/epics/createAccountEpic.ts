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

import { Action } from 'redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { createAccount } from '../actions';
import { navigate } from 'modules/engine/actions';
import keyring from 'lib/keyring';

const createAccountEpic: Epic = (action$, store, { api }) => action$.ofAction(createAccount.started)
    .flatMap(action => {
        const state = store.getState();
        const keys = keyring.generateKeyPair(action.payload.seed);
        const client = api({ apiHost: state.engine.nodeHost });

        return Observable.from(
            client.getUid().then(uid => {
                const signature = keyring.sign(uid.uid, keys.private);
                return client
                    .authorize(uid.token)
                    .login({
                        signature,
                        publicKey: keys.public
                    });
            })
        ).flatMap(payload =>
            Observable.of<Action>(
                createAccount.done({
                    params: action.payload,
                    result: {
                        id: payload.key_id,
                        encKey: keyring.encryptAES(keys.private, action.payload.password),
                        address: payload.address,
                        ecosystem: '1',
                        ecosystemName: null,
                        username: payload.key_id,
                        avatar: null
                    }
                }),
                navigate('/')
            )
        ).catch(e => Observable.of(
            createAccount.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export default createAccountEpic;