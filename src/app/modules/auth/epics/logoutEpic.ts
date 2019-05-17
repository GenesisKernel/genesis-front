/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'modules';
import { logout, deauthorize } from '../actions';
import { Observable } from 'rxjs/Observable';

const logoutEpic: Epic = (action$, store) => action$.ofAction(logout.started)
    .flatMap(action =>
        Observable.of<Action>(
            deauthorize(null),
            logout.done({
                params: action.payload,
                result: null
            })
        )
    );

export default logoutEpic;