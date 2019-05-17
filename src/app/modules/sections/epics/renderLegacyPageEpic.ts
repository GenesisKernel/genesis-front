/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { renderLegacyPage } from '..//actions';

const renderLegacyPageEpic: Epic = (action$, store, { api }) => action$.ofAction(renderLegacyPage.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        if (action.payload.menu) {
            return Observable.fromPromise(client.content({
                type: 'menu',
                name: action.payload.menu,
                params: {},
                locale: state.storage.locale

            })).map(payload =>
                renderLegacyPage.done({
                    params: action.payload,
                    result: {
                        menu: {
                            name: action.payload.menu,
                            content: payload.tree
                        }
                    }
                })

            ).catch(error =>
                Observable.of(renderLegacyPage.done({
                    params: action.payload,
                    result: {
                        menu: {
                            name: action.payload.menu,
                            content: []
                        }
                    }
                }))
            );
        }
        else {
            return Observable.of(renderLegacyPage.done({
                params: action.payload,
                result: {
                    menu: null
                }
            }));
        }
    });

export default renderLegacyPageEpic;