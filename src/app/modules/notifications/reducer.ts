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

import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { INotification } from 'genesis/notifications';
import spawnNotificationHandler from './reducers/spawnNotificationHandler';
import destroyNotificationHandler from './reducers/destroyNotificationHandler';
import pushNotificationQueueHandler from './reducers/pushNotificationQueueHandler';

export type State = {
    NOTIFICATIONS_PER_SCREEN: number;
    queue: INotification[];
    notifications: INotification[];
};

export const initialState: State = {
    NOTIFICATIONS_PER_SCREEN: 3,
    queue: [],
    notifications: []
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.destroyNotification, destroyNotificationHandler)
    .case(actions.pushNotificationQueue, pushNotificationQueueHandler)
    .case(actions.spawnNotification, spawnNotificationHandler);