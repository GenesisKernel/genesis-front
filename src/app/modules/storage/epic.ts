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

import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { IRootState } from 'modules';
import * as actions from './actions';
import { subscribe, unsubscribe } from 'modules/socket/actions';

export const saveAccountEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.saveAccount)
        .map(action =>
            subscribe.started({ account: action.payload })
        );

export const removeAccountEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.removeAccount)
        .map(action =>
            unsubscribe.started({ account: action.payload })
        );

export default combineEpics(
    saveAccountEpic,
    removeAccountEpic
);