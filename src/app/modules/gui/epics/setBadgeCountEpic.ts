/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { setBadgeCount } from '../actions';
import { Observable } from 'rxjs/Observable';
import platform from 'lib/platform';

const setBadgeCountEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(setBadgeCount)
        .flatMap(action => {
            platform.on('desktop', () => {
                const Electron = require('electron');
                Electron.remote.app.setBadgeCount(action.payload);
            });

            return Observable.empty();
        });

export default setBadgeCountEpic;