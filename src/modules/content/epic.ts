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

export const renderPageEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.renderPage.started.match)
        .switchMap(action => {
            const promise = api.contentPage(action.payload.session, action.payload.name, action.payload.params).then(page => {
                return api.contentMenu(action.payload.session, page.menu).then(menu => ({
                    menu: {
                        name: page.menu,
                        content: JSON.parse(menu.tree)
                    },
                    page: {
                        name: action.payload.name,
                        content: JSON.parse(page.tree)
                    }
                }));
            });

            return Observable.from(promise).map(payload => {
                return actions.renderPage.done({
                    params: action.payload,
                    result: payload
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.renderPage.failed({
                    params: action.payload,
                    error: error.error
                }));
            });
        });

export default combineEpics(
    renderPageEpic
);