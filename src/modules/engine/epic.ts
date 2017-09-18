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

export const identityEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.identity.started.match)
        .switchMap(action => {
            return Observable.from(api.getUid()).map(payload => {
                return actions.identity.done({
                    params: null,
                    result: {
                        uid: payload.uid,
                        session: payload.token
                    }
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.identity.failed({
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

export default combineEpics(identityEpic, installEpic);