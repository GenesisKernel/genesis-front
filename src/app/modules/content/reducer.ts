/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TProtypoElement } from 'apla/protypo';
import ecosystemInitDoneHandler from './reducers/ecosystemInitDoneHandler';
import ecosystemInitFailedHandler from './reducers/ecosystemInitFailedHandler';
import fetchNotificationsDoneHandler from './reducers/fetchNotificationsDoneHandler';
import setResizingHandler from './reducers/setResizingHandler';
import ecosystemInitHandler from './reducers/ecosystemInitHandler';
import reloadStylesheetHandler from './reducers/reloadStylesheetHandler';

export type State = {
    readonly preloading: boolean;
    readonly preloadingError: string;
    readonly stylesheet: string;
    readonly navigationResizing: boolean;
    readonly notifications: TProtypoElement[];
};

export const initialState: State = {
    preloading: false,
    preloadingError: null,
    stylesheet: null,
    navigationResizing: false,
    notifications: null
};

export default reducerWithInitialState(initialState)
    .case(actions.ecosystemInit.done, ecosystemInitDoneHandler)
    .case(actions.ecosystemInit.failed, ecosystemInitFailedHandler)
    .case(actions.ecosystemInit.started, ecosystemInitHandler)
    .case(actions.fetchNotifications.done, fetchNotificationsDoneHandler)
    .case(actions.setResizing, setResizingHandler)
    .case(actions.reloadStylesheet, reloadStylesheetHandler);