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

import { Action } from 'redux';
import { Epic } from 'modules';
import { ecosystemInit, fetchNotifications } from 'modules/content/actions';
import { sectionsInit } from 'modules/sections/actions';
import { logout, selectWallet } from 'modules/auth/actions';
import { flatMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

const ecosystemInitEpic: Epic = (action$, store, { api }) => action$.ofAction(ecosystemInit.started).pipe(
    flatMap(action => {
        const client = api(store.value.auth.session);

        return from(client.getParam({ name: 'stylesheet' })).pipe(
            flatMap(payload => of<Action>(
                ecosystemInit.done({
                    params: action.payload,
                    result: {
                        stylesheet: payload.value
                    }
                }),
                fetchNotifications.started(null),
                sectionsInit.started(action.payload.section)
            )),
            catchError(e => {
                if ('E_OFFLINE' === e.error || 'E_SERVER' === e.error || 'E_TOKENEXPIRED' === e.error) {
                    return of(
                        logout.started(null),
                        selectWallet(store.value.auth.session),
                        ecosystemInit.failed({
                            params: action.payload,
                            error: e.error
                        })
                    );
                }
                return of(
                    ecosystemInit.failed({
                        params: action.payload,
                        error: e.error
                    })
                );
            })
        );
    })
);

export default ecosystemInitEpic;