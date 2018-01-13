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
import * as actions from './actions';
import { logout, selectAccount } from 'modules/auth/actions';
import * as storageActions from 'modules/storage/actions';
import { history } from 'store';

export const navigatePageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.navigatePage.started)
        .map(action => {
            history.push(`/${action.payload.vde ? 'vde/page' : 'page'}/${action.payload.name}`, { params: action.payload.params });
            return actions.navigatePage.done({
                params: action.payload,
                result: null
            });
        });

export const renderPageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.renderPage.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, action.payload.name, action.payload.params, action.payload.vde))
                .map(payload =>
                    actions.renderPage.done({
                        params: action.payload,
                        result: {
                            menu: {
                                name: payload.menu,
                                vde: action.payload.vde,
                                content: payload.menutree
                            },
                            page: {
                                name: action.payload.name,
                                content: payload.tree
                            }
                        }
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.renderPage.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const reloadPageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.reloadPage.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, state.content.page.name, state.content.page, state.content.page.vde))
                .map(payload =>
                    actions.reloadPage.done({
                        params: action.payload,
                        result: {
                            vde: state.content.page.vde,
                            params: state.content.page.params,
                            menu: {
                                name: payload.menu,
                                vde: state.content.page.vde,
                                content: payload.menutree
                            },
                            page: {
                                name: state.content.page.name,
                                content: payload.tree
                            }
                        }
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.reloadPage.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const ecosystemInitEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.ecosystemInit.started)
        .flatMap(action => {
            const state = store.getState();

            const promise = Promise.all([
                api.contentMenu(state.auth.sessionToken, 'default_menu'),
                api.parameter(state.auth.sessionToken, 'stylesheet'),
                api.parameter(state.auth.sessionToken, 'ecosystem_name')
            ]);

            return Observable.fromPromise(promise)
                .flatMap(payload =>
                    Observable.concat([
                        storageActions.saveAccount({
                            ...state.auth.account,
                            ecosystemName: payload[2].value
                        }),
                        actions.fetchNotifications.started(null),
                        actions.ecosystemInit.done({
                            params: action.payload,
                            result: {
                                stylesheet: payload[1].value || null,
                                defaultMenu: {
                                    name: 'default_menu',
                                    vde: false,
                                    content: payload[0].tree
                                }
                            }
                        })
                    ])
                )
                .catch((e: IAPIError) => {
                    if ('E_SERVER' === e.error || 'E_TOKENEXPIRED' === e.error) {
                        const account = store.getState().auth.account;

                        return Observable.concat([
                            logout.started({}),
                            selectAccount.started({
                                account
                            }),
                            actions.ecosystemInit.failed({
                                params: action.payload,
                                error: e.error
                            })
                        ]);
                    }
                    return Observable.of(actions.ecosystemInit.failed({
                        params: action.payload,
                        error: e.error
                    }));
                });
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
                            vde: false,
                            content: payload.menutree
                        },
                        page: {
                            name: 'default_page',
                            content: payload.tree
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

export const fetchNotificationsEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.fetchNotifications.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, 'notifications', {}))
                .map(payload =>
                    actions.fetchNotifications.done({
                        params: action.payload,
                        result: payload.tree
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.fetchNotifications.failed({
                        params: action.payload,
                        error: null
                    }))
                );
        });

export default combineEpics(
    renderPageEpic,
    reloadPageEpic,
    ecosystemInitEpic,
    resetEpic,
    alertEpic,
    navigatePageEpic,
    fetchNotificationsEpic
);