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

import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer as router, RouterState } from 'react-router-redux';
import * as auth from './auth';
import * as engine from './engine';
import * as tx from './tx';
import * as admin from './admin';

export interface IRootState {
    engine: engine.State;
    auth: auth.State;
    tx: tx.State;
    admin: admin.State;
    router: RouterState;
}

export const rootEpic = combineEpics<any>(
    engine.epic,
    auth.epic,
    tx.epic,
    admin.epic
);

export default combineReducers<IRootState>({
    engine: engine.reducer,
    auth: auth.reducer,
    tx: tx.reducer,
    admin: admin.reducer,
    router
});