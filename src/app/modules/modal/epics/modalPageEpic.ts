/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { modalPage, modalShow } from '../actions';
import { Observable } from 'rxjs/Observable';

const modalPageEpic: Epic = (action$, store, { api }) => action$.ofAction(modalPage)
    .flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });

        return Observable.fromPromise(client.content({
            type: 'page',
            name: action.payload.name,
            params: action.payload.params,
            locale: state.storage.locale

        })).map(payload =>
            modalShow({
                id: 'PAGE_MODAL',
                type: 'PAGE_MODAL',
                params: {
                    title: action.payload.title || action.payload.name,
                    width: action.payload.width,
                    tree: payload.tree
                }

            })

        ).catch(e =>
            Observable.empty<never>()
        );
    });

export default modalPageEpic;