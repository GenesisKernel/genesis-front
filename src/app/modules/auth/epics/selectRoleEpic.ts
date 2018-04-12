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

import { Epic } from 'modules';
import { selectRole } from '../actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';

const selectRoleEpic: Epic = (action$, store, { api }) => action$.ofAction(selectRole.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.engine.apiHost);
        const privateKey = state.auth.privateKey;
        const publicKey = keyring.generatePublicKey(privateKey);
        const account = state.auth.account;

        return Observable.from(client.getUid().then(uid => {
            const signature = keyring.sign(uid.uid, privateKey);
            return client.authorize(uid.token)
                .login({
                    publicKey,
                    signature,
                    ecosystem: account.ecosystem,
                    role: action.payload
                });

        })).map(payload =>
            selectRole.done({
                params: action.payload,
                result: {
                    id: payload.key_id,
                    encKey: account.encKey,
                    address: payload.address,
                    ecosystem: account.ecosystem,
                    ecosystemName: account.ecosystemName,
                    avatar: account.avatar,
                    username: account.username,
                    sessionToken: payload.token,
                    refreshToken: payload.refresh,
                    socketToken: payload.notify_key,
                    timestamp: payload.timestamp
                },
            })

        ).catch(e =>
            Observable.of(
                selectRole.failed({
                    params: null,
                    error: e.error
                })
            )
        );
    });

export default selectRoleEpic;