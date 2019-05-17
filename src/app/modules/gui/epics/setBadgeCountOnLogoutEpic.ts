/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { setBadgeCount } from '../actions';
import { login, loginGuest } from 'modules/auth/actions';
import { isType } from 'typescript-fsa';

const setBadgeCountOnLogoutEpic: Epic<Action, IRootState> =
    (action$, store) => action$.filter(action => isType(action, login.done) || isType(action, loginGuest.done))
        .map(action =>
            setBadgeCount(0)
        );

export default setBadgeCountOnLogoutEpic;