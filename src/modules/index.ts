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
import { loadingBarReducer } from 'react-redux-loading-bar';
import * as admin from './admin';
import * as auth from './auth';
import * as content from './content';
import * as engine from './engine';
import * as tx from './tx';

export interface IRootState {
    auth: auth.State;
    admin: admin.State;
    content: content.State;
    engine: engine.State;
    tx: tx.State;
    loadingBarReducer: number;
    router: RouterState;
}

export const rootEpic = combineEpics(
    admin.epic,
    auth.epic,
    content.epic,
    engine.epic,
    tx.epic,
);

export default combineReducers<IRootState>({
    admin: admin.reducer,
    auth: auth.reducer,
    content: content.reducer,
    engine: engine.reducer,
    tx: tx.reducer,
    loadingBarReducer,
    router
});