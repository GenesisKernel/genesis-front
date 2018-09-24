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
import { Observable } from 'rxjs/Observable';
import { renderPage } from '../actions';
import NodeObservable from 'modules/engine/util/NodeObservable';
import keyring from 'lib/keyring';

const invalidationError = {
    error: 'E_INVALIDATED'
};

const renderPageEpic: Epic = (action$, store, { api }) => action$.ofAction(renderPage.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.content({
            type: 'page',
            name: action.payload.name,
            params: action.payload.params,
            locale: state.storage.locale

        })).flatMap(payload => {
            if (payload.nodesCount > state.storage.fullNodes.length) {
                return Observable.throw(invalidationError);
            }

            return NodeObservable({
                nodes: state.storage.fullNodes,
                count: payload.nodesCount,
                concurrency: 3,
                api

            }).flatMap(apiHost => Observable.from(
                api({ apiHost }).contentHash({
                    name: action.payload.name,
                    ecosystem: state.auth.wallet.ecosystem,
                    walletID: state.auth.wallet.id,
                    role: state.auth.role ? state.auth.role.id : null,
                    locale: state.storage.locale,
                    params: action.payload.params

                })
            )).catch(e => Observable.throw(invalidationError)).toArray().map(result => {
                const contentHash = keyring.hashData(payload.plainText);

                if (payload.nodesCount !== result.length) {
                    throw invalidationError;
                }

                for (let i = 0; i < result.length; i++) {
                    if (contentHash !== result[i].hash) {
                        throw invalidationError;
                    }
                }

                return renderPage.done({
                    params: action.payload,
                    result: {
                        menu: {
                            name: payload.menu,
                            content: payload.menutree
                        },
                        page: {
                            params: action.payload.params,
                            name: action.payload.name,
                            content: payload.tree
                        }
                    }
                });
            });

        }).catch(e =>
            Observable.of(renderPage.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export default renderPageEpic;