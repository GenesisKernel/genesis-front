/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { combineEpics } from 'redux-observable';
import switchWindowEpic from './epics/switchWindowEpic';
import setBadgeCountEpic from './epics/setBadgeCountEpic';
import switchWindowOnLoginEpic from './epics/switchWindowOnLoginEpic';
import setBadgeCountOnLogoutEpic from './epics/setBadgeCountOnLogoutEpic';

export default combineEpics(
    setBadgeCountEpic,
    switchWindowEpic,
    switchWindowOnLoginEpic,
    setBadgeCountOnLogoutEpic
);