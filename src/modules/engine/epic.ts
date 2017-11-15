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

import api, { IAPIError } from 'lib/api';
import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { IRootState } from 'modules';
import * as actions from './actions';
import { history } from 'store';

export const checkOnlineEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.checkOnline.started.match)
        .switchMap(action => {
            return Observable.from(api.getUid()).map(payload => {
                return actions.checkOnline.done({
                    params: null,
                    result: true
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.checkOnline.failed({
                    params: null,
                    error: error.error
                }));
            }).delay(600);
        });

export const installEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.install.started.match)
        .switchMap(action => {
            return Observable.from(api.install(action.payload)).map(payload => {
                return actions.install.done({
                    params: null,
                    result: null
                });
            }).catch((error: IAPIError) => {
                switch (error.error) {
                    // TODO: NOTIFICATION STUB
                    case 'E_DBNIL': alert('NL_DATABASE_IS_NIL'); break;
                    default: break;
                }

                return Observable.of(actions.install.failed({
                    params: null,
                    error: error.error
                }));
            }).delay(600);
        });

export const navigatePageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.navigatePage.started)
        .map(action => {
            history.push(`/page/${action.payload.name}`, { params: action.payload.params });
            return actions.navigatePage.done({
                params: action.payload,
                result: null
            });
        });

export default combineEpics(checkOnlineEpic, installEpic, navigatePageEpic);