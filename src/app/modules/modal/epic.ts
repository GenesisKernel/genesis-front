/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { combineEpics } from 'redux-observable';
import modalPageEpic from './epics/modalPageEpic';
import closeModalOnInteractionEpic from './epics/closeModalOnInteractionEpic';
import removeNetworkEpic from './epics/removeNetworkEpic';

export default combineEpics(
    modalPageEpic,
    closeModalOnInteractionEpic,
    removeNetworkEpic
);