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
import { Observable } from 'rxjs/Observable';
import { ecosystemInit, fetchNotifications } from 'modules/content/actions';
import { sectionsInit } from 'modules/sections/actions';
import { logout, selectWallet } from 'modules/auth/actions';

const initSectionsEpic: Epic = (action$, store, { api }) => action$.ofAction(sectionsInit.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.from(
            Promise.all([
                client.getParam({ name: 'stylesheet' }).then(l => l.value),
                client.getEcosystemName({ id: state.auth.wallet.ecosystem }).catch(e => '')
            ])
        ).flatMap(payload =>
            Observable.of<Action>(
                fetchNotifications.started(null),
                ecosystemInit.done({
                    params: action.payload,
                    result: {
                        stylesheet: payload[0],
                        name: payload[1],
                    }
                }),
                sectionsInit.done({
                    params: action.payload,
                    result: {
                        stylesheet: payload[0],
                        name: payload[1],
                    }
                })
            )
        ).catch(e => {
            if ('E_OFFLINE' === e.error || 'E_SERVER' === e.error || 'E_TOKENEXPIRED' === e.error) {
                const wallet = store.getState().auth.wallet;

                return Observable.of<Action>(
                    logout.started(null),
                    selectWallet(wallet),
                    ecosystemInit.failed({
                        params: action.payload,
                        error: e.error
                    }),
                    sectionsInit.failed({
                        params: action.payload,
                        error: e.error
                    })
                );
            }
            return Observable.of<Action>(
                ecosystemInit.failed({
                    params: action.payload,
                    error: e.error
                }),
                sectionsInit.failed({
                    params: action.payload,
                    error: e.error
                })
            );
        });
    });

export default initSectionsEpic;