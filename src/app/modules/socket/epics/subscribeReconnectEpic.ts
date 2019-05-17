/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { subscribe, connect } from '../actions';
import { Observable } from 'rxjs';

const subscribeReconnectEpic: Epic = (action$, store) => action$.ofAction(connect.done)
    .flatMap(action =>
        Observable.from(store.getState().auth.wallets).map(account =>
            subscribe.started(account)
        )
    );

export default subscribeReconnectEpic;