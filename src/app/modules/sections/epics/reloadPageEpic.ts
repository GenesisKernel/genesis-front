/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { reloadPage } from '../actions';

const reloadPageEpic: Epic = (action$, store, { api }) => action$.ofAction(reloadPage.started)
    .flatMap(action => {
        const state = store.getState();
        const section = state.sections.sections[state.sections.section];
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        return Observable.fromPromise(client.content({
            type: 'page',
            name: section.page.name,
            params: section.page.params,
            locale: state.storage.locale,

        })).map(payload =>
            reloadPage.done({
                params: action.payload,
                result: {
                    params: section.page.params,
                    menu: {
                        name: payload.menu,
                        content: payload.menutree
                    },
                    page: {
                        params: section.page.params,
                        name: section.page.name,
                        content: payload.tree
                    }
                }
            })

        ).catch(e =>
            Observable.of(reloadPage.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export default reloadPageEpic;