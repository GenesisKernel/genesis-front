/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { combineEpics } from 'redux-observable';
import ecosystemInitEpic from './epics/ecosystemInitEpic';
import displayDataEpic from './epics/displayDataEpic';
import fetchNotificationsEpic from './epics/fetchNotificationsEpic';
import buttonInteractionEpic from './epics/buttonInteractionEpic';

export default combineEpics(
    ecosystemInitEpic,
    displayDataEpic,
    fetchNotificationsEpic,
    buttonInteractionEpic
);