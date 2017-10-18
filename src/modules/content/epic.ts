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
import { combineEpics, Epic } from 'redux-observable';
import swal from 'sweetalert2';
import { IRootState } from 'modules';
import * as actions from './actions';

export const renderPageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.renderPage.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, action.payload.name, action.payload.params)
                .then(page => {
                    return api.contentMenu(state.auth.sessionToken, page.menu)
                        .then(menu => ({
                            menu: {
                                name: page.menu,
                                content: JSON.parse(menu.tree)
                            },
                            page: {
                                name: action.payload.name,
                                content: JSON.parse(page.tree)
                            }
                        }));
                }))
                .map(payload => actions.renderPage.done({
                    params: action.payload,
                    result: payload
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.renderPage.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const menuInitEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.menuInit.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.contentMenu(state.auth.sessionToken, 'default_menu'))
                .map(payload => actions.menuInit.done({
                    params: action.payload,
                    result: {
                        name: 'default_menu',
                        content: JSON.parse(payload.tree)
                    }
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.menuInit.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const alertEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.alertShow)
        .flatMap(action => {
            return Observable.fromPromise(swal({
                title: action.payload.title,
                text: action.payload.text,
                type: action.payload.type,
                showCancelButton: true,
                showCloseButton: !!action.payload.cancelButton,
                showConfirmButton: !!action.payload.confirmButton,
                confirmButtonText: action.payload.confirmButton,
                cancelButtonText: action.payload.cancelButton
            })
                .then(result => ({ success: result, error: null }))
                .catch(error => ({ success: null, error }))
            )
                .map(payload => actions.alertClose({
                    id: action.payload.id,
                    ...payload
                }));
        });

export default combineEpics(
    renderPageEpic,
    menuInitEpic,
    alertEpic
);