/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import actionCreatorFactory from 'typescript-fsa';
import { TProtypoElement, IButtonInteraction } from 'apla/protypo';

const actionCreator = actionCreatorFactory('content');

// Navigation
export const setResizing = actionCreator<boolean>('SET_RESIZING');
export const ecosystemInit = actionCreator.async<{ section?: string }, { stylesheet: string }, string>('ECOSYSTEM_INIT');

// Interaction
export const buttonInteraction = actionCreator<IButtonInteraction>('BUTTON_INTERACTION');
export const displayData = actionCreator.async<string, string, string>('DISPLAY_DATA');

// Notifications
export const fetchNotifications = actionCreator.async<void, TProtypoElement[], void>('FETCH_NOTIFICATIONS');

export const reloadStylesheet = actionCreator<string>('RELOAD_STYLESHEET');