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
import defaultLocale from 'lib/en-US.json';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import initializeDoneHandler from './reducers/initializeDoneHandler';
import setLocaleDoneHandler from './reducers/setLocaleDoneHandler';
import setCollapsedHandler from './reducers/setCollapsedHandler';
import initializeFailedHandler from './reducers/initializeFailedHandler';
import initializeHandler from './reducers/initializeHandler';

export type State = {
    readonly nodeHost: string;
    readonly localeMessages: { [key: string]: string };
    readonly isCollapsed: boolean;
    readonly isLoaded: boolean;
    readonly isOffline: boolean;
    readonly isConnecting: boolean;
};

export const initialState: State = {
    nodeHost: null,
    localeMessages: defaultLocale,
    isCollapsed: true,
    isLoaded: false,
    isOffline: false,
    isConnecting: false
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.initialize.started, initializeHandler)
    .case(actions.initialize.done, initializeDoneHandler)
    .case(actions.initialize.failed, initializeFailedHandler)
    .case(actions.setCollapsed, setCollapsedHandler)
    .case(actions.setLocale.done, setLocaleDoneHandler);