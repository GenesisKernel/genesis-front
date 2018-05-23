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
import { Action } from 'redux';
import { Observable } from 'rxjs';
import uuid from 'uuid';
import { inviteEcosystem } from '../actions';
import { enqueueNotification } from 'modules/notifications/actions';
import { navigatePage } from 'modules/content/actions';
import { saveAccount } from '../../storage/actions';

const inviteEcosystemEpic: Epic = (action$, store) => action$.ofAction(inviteEcosystem)
    .flatMap(action => {
        const account = store.getState().auth.account;
        const notification = enqueueNotification({
            id: uuid.v4(),
            type: 'ECOSYSTEM_INVITED',
            params: {
                ecosystem: action.payload.ecosystem
            }
        });

        const emitter = Observable.of<Action>(
            notification,
            saveAccount({
                id: account.id,
                encKey: account.encKey,
                address: account.address,
                ecosystem: action.payload.ecosystem,
                ecosystemName: null,
                username: null
            }),
        );

        return action.payload.redirectPage ? emitter.concat(Observable.of(navigatePage.started({
            name: action.payload.redirectPage,
            force: true,
            params: {
                ecosystem: action.payload.ecosystem
            }
        }))) : emitter;
    });

export default inviteEcosystemEpic;