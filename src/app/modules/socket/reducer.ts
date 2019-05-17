/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { INotificationsMessage } from 'apla/socket';
import { IWallet } from 'apla/auth';
import connectDoneHandler from './reducers/connectDoneHandler';
import disconnectDoneHandler from './reducers/disconnectDoneHandler';
import subscribeDoneHandler from './reducers/subscribeDoneHandler';
import setNotificationsCountHandler from './reducers/setNotificationsCountHandler';
import unsubscribeDoneHandler from './reducers/unsubscribeDoneHandler';
import setConnectedHandler from './reducers/setConnectedHandler';

export type State = {
    readonly session: string;
    readonly socket: ICentrifuge;
    readonly connected: boolean;
    readonly notifications: INotificationsMessage[];
    readonly subscriptions: {
        wallet: IWallet;
        instance: ISubscription;
    }[];
};

export const initialState: State = {
    session: null,
    socket: null,
    connected: false,
    notifications: [],
    subscriptions: []
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.connect.done, connectDoneHandler)
    .case(actions.disconnect.done, disconnectDoneHandler)
    .case(actions.setNotificationsCount, setNotificationsCountHandler)
    .case(actions.setConnected, setConnectedHandler)
    .case(actions.subscribe.done, subscribeDoneHandler)
    .case(actions.unsubscribe.done, unsubscribeDoneHandler);