// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { INotificationsMessage } from 'apla/socket';

export type State = {
    socket: any;
    notifications: INotificationsMessage[];
};

export const initialState: State = {
    socket: null,
    notifications: []
};

export default reducerWithInitialState<State>(initialState)
    // SocketConnect
    .case(actions.connect.done, (state, payload) => ({
        ...state,
        socket: payload.result
    }))

    // SetNotificationsCoun
    .case(actions.setNotificationsCount, (state, payload) => ({
        ...state,
        notifications: [
            ...state.notifications.filter(l =>
                l.id !== payload.id ||
                l.role !== payload.role ||
                l.ecosystem !== payload.ecosystem
            ),
            payload
        ]
    }));