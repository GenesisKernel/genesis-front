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
import { setDefaultPage } from 'modules/content/actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';

const selectRoleEpic: Epic = (action$, store, { api }) => action$.ofAction(selectRole.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);
        const privateKey = state.auth.privateKey;
        const publicKey = keyring.generatePublicKey(privateKey);
        const account = state.auth.account;

        return Observable.from(client.getUid().then(uid => {
            const signature = keyring.sign(uid.uid, privateKey);

            return Promise.all([
                client.authorize(uid.token)
                    .login({
                        publicKey,
                        signature,
                        ecosystem: account.ecosystem,
                        role: action.payload
                    }),

                client.getRow({
                    table: 'roles',
                    id: action.payload && action.payload.toString() || null
                })
                    .then(row => row.value.default_page)
                    .catch(e => null)
            ]);

        })).flatMap(payload =>
            Observable.concat([
                setDefaultPage(payload[1]),
                selectRole.done({
                    params: action.payload,
                    result: {
                        sessionToken: payload[0].token,
                        refreshToken: payload[0].refresh
                    }
                })
            ])

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