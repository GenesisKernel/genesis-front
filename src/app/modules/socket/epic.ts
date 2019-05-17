/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { combineEpics } from 'redux-observable';
import connectEpic from './epics/connectEpic';
import disconnectEpic from './epics/disconnectEpic';
import subscribeEpic from './epics/subscribeEpic';
import unsubscribeEpic from './epics/unsubscribeEpic';
import getNotificationsCountEpic from './epics/getNotificationsCountEpic';
import subscribeWalletsEpic from './epics/subscribeWalletsEpic';
import subscribeReconnectEpic from './epics/subscribeReconnectEpic';
import unsubscribeRemovedWalletEpic from './epics/unsubscribeRemovedWalletEpic';
import subscribeWalletEpic from './epics/subscribeWalletEpic';

export default combineEpics(
    connectEpic,
    disconnectEpic,
    subscribeEpic,
    unsubscribeEpic,
    getNotificationsCountEpic,
    subscribeWalletsEpic,
    subscribeWalletEpic,
    subscribeReconnectEpic,
    unsubscribeRemovedWalletEpic
);