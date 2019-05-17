/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { getNotificationsCount } from '../actions';
import { Observable } from 'rxjs/Observable';

const getNotificationsCountEpic: Epic = (action$, store, { api }) => action$.ofAction(getNotificationsCount)
    .flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: state.engine.guestSession.network.apiHost,
            sessionToken: state.socket.session
        });

        return Observable.fromPromise(client.requestNotifications(action.payload.ids))
            .flatMap(() => Observable.empty<never>())
            .catch(() => Observable.empty<never>());
    });

export default getNotificationsCountEpic;