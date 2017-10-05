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
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import * as actions from './actions';

export const getTableEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getTable.started.match)
        .switchMap(action => {
            const promise = Promise.all([
                api.table(action.payload.session, action.payload.table),
                api.list(action.payload.session, action.payload.table)
            ]);
            return Observable.from(promise).map(payload => {
                return actions.getTable.done({
                    params: null,
                    result: {
                        table: payload[0],
                        data: payload[1]
                    }
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getTable.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export const getTablesEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getTables.started.match)
        .switchMap(action => {
            return Observable.from(api.tables(action.payload.session, action.payload.offset, action.payload.limit)).map(payload => {
                return actions.getTables.done({
                    params: null,
                    result: payload
                })
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getTables.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export const getPagesEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getPages.started.match)
        .switchMap(action => {
            return Observable.from(api.pages(action.payload.session)).map(payload => {
                return actions.getPages.done({
                    params: null,
                    result: payload
                })
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getPages.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export default combineEpics(getTableEpic, getTablesEpic, getPagesEpic);