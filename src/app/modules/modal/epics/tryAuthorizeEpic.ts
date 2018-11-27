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

import uuid from 'uuid';
import { Action } from 'redux';
import { Epic } from 'modules';
import { tryAuthorize, modalClose } from '../actions';
import { flatMap } from 'rxjs/operators';
import { empty, of } from 'rxjs';
import { authorize } from 'modules/auth/actions';
import { enqueueNotification } from 'modules/notifications/actions';
import keyring from 'lib/keyring';

const tryAuthorizeEpic: Epic = (action$, store) => action$.ofAction(tryAuthorize).pipe(
    flatMap(action => {
        const session = store.value.auth.session;
        if (!session.wallet) {
            return empty();
        }

        const encKey = session.wallet.encKey;
        const privateKey = keyring.decryptAES(encKey, action.payload);

        if (keyring.validatePrivateKey(privateKey)) {
            return of<Action>(
                modalClose(),
                authorize(privateKey)
            );
        }
        else {
            return of(enqueueNotification({
                id: uuid.v4(),
                type: 'INVALID_PASSWORD',
                params: {}
            }));
        }
    })
);

export default tryAuthorizeEpic;