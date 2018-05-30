// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
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
import { Action } from 'redux';
import { Observable } from 'rxjs';
import uuid from 'uuid';
import { inviteEcosystem } from '../actions';
import { enqueueNotification } from 'modules/notifications/actions';
import { navigatePage } from 'modules/section/actions';
import { saveWallet } from '../../storage/actions';

const inviteEcosystemEpic: Epic = (action$, store) => action$.ofAction(inviteEcosystem)
    .flatMap(action => {
        const wallet = store.getState().auth.wallet;
        const notification = enqueueNotification({
            id: uuid.v4(),
            type: 'ECOSYSTEM_INVITED',
            params: {
                ecosystem: action.payload.ecosystem
            }
        });

        const emitter = Observable.of<Action>(
            notification,
            saveWallet({
                id: wallet.id,
                encKey: wallet.encKey,
                address: wallet.address,
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