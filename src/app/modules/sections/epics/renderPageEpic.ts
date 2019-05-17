/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { renderPage } from '../actions';

const renderPageEpic: Epic = (action$, store, { api }) => action$.ofAction(renderPage.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });
        const section = state.sections.sections[action.payload.section || state.sections.section];

        return Observable.from(Promise.all([
            client.content({
                type: 'page',
                name: action.payload.name,
                params: action.payload.params,
                locale: state.storage.locale

            }),
            (!section.menus.length && section.defaultPage !== action.payload.name) ? client.content({
                type: 'page',
                name: section.defaultPage,
                params: {},
                locale: state.storage.locale
            }) : Promise.resolve(null)

        ])).map(payload => {
            const page = payload[0];
            const defaultPage = payload[1];

            return renderPage.done({
                params: action.payload,
                result: {
                    defaultMenu: defaultPage && defaultPage.menu !== page.menu && {
                        name: defaultPage.menu,
                        content: defaultPage.menutree
                    },
                    menu: {
                        name: page.menu,
                        content: page.menutree
                    },
                    page: {
                        params: action.payload.params,
                        name: action.payload.name,
                        content: page.tree
                    }
                }
            });

        }).catch(e =>
            Observable.of(renderPage.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export default renderPageEpic;