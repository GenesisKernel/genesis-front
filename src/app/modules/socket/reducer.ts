// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { INotificationsMessage } from 'genesis/socket';
import { IStoredAccount } from 'genesis/storage';
import connectDoneHandler from './reducers/connectDoneHandler';
import disconnectDoneHandler from './reducers/disconnectDoneHandler';
import subscribeDoneHandler from './reducers/subscribeDoneHandler';
import setNotificationsCountHandler from './reducers/setNotificationsCountHandler';
import unsubscribeHandler from './reducers/unsubscribeHandler';

export type State = {
    readonly socket: ICentrifuge;
    readonly notifications: INotificationsMessage[];
    readonly subscriptions: {
        account: IStoredAccount;
        instance: ISubscription;
    }[];
};

export const initialState: State = {
    socket: null,
    notifications: [],
    subscriptions: []
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.connect.done, connectDoneHandler)
    .case(actions.disconnect.done, disconnectDoneHandler)
    .case(actions.setNotificationsCount, setNotificationsCountHandler)
    .case(actions.subscribe.done, subscribeDoneHandler)
    .case(actions.unsubscribe.done, unsubscribeHandler);