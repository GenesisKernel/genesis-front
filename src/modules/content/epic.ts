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
import swal, { SweetAlertType } from 'sweetalert2';
import { IRootState } from 'modules';
import { navigate } from 'modules/engine/actions';
import * as actions from './actions';

export const renderPageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.renderPage.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, action.payload.name, action.payload.params))
                .flatMap(payload => Observable.concat([
                    actions.renderPage.done({
                        params: action.payload,
                        result: {
                            menu: {
                                name: payload.menu,
                                content: JSON.parse(payload.menutree)
                            },
                            page: {
                                name: action.payload.name,
                                content: JSON.parse(payload.tree)
                            }
                        }
                    }),
                    navigate(`/page/${action.payload.name}`)
                ]))
                .catch((e: IAPIError) =>
                    Observable.of(actions.renderPage.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const menuInitEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.ecosystemInit.started)
        .flatMap(action => {
            const state = store.getState();

            const promise = Promise.all([
                api.contentMenu(state.auth.sessionToken, 'default_menu'),
                api.parameter(state.auth.sessionToken, 'stylesheet')
            ]);

            return Observable.fromPromise(promise)
                .map(payload => actions.ecosystemInit.done({
                    params: action.payload,
                    result: {
                        stylesheet: payload[1].value || null,
                        defaultMenu: {
                            name: 'default_menu',
                            content: JSON.parse(payload[0].tree)
                        }
                    }
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.ecosystemInit.failed({
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
                type: action.payload.type as SweetAlertType,
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

export const resetEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.reset.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, 'default_page', {}))
                .map(payload => actions.reset.done({
                    params: action.payload,
                    result: {
                        menu: {
                            name: payload.menu,
                            content: JSON.parse(payload.menutree)
                        },
                        page: {
                            name: 'default_page',
                            content: JSON.parse(payload.tree)
                        }
                    }
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.reset.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export default combineEpics(
    renderPageEpic,
    menuInitEpic,
    resetEpic,
    alertEpic
);