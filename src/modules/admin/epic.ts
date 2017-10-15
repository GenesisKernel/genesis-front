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
import keyring from 'lib/keyring';
import { combineEpics, Epic } from 'redux-observable';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { IRootState } from 'modules';
import * as actions from './actions';

export const getTableEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getTable.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(Promise.all([
                api.table(state.auth.sessionToken, action.payload.table),
                api.list(state.auth.sessionToken, action.payload.table)
            ]))
                .map(payload => actions.getTable.done({
                    params: action.payload,
                    result: {
                        table: payload[0],
                        data: payload[1]
                    }
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.getTable.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getTableStructEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getTableStruct.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.table(state.auth.sessionToken, action.payload.name))
                .map(payload =>
                    actions.getTableStruct.done({
                        params: action.payload,
                        result: payload
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.getTableStruct.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getMenusEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getMenus.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.list(state.auth.sessionToken, 'menu'))
                .map(payload =>
                    actions.getMenus.done({
                        params: action.payload,
                        result: payload.list.map(v => ({
                            id: v.id,
                            name: v.name,
                            conditions: v.conditions,
                            value: v.value
                        }))
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.getMenus.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getTablesEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getTables.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.tables(state.auth.sessionToken, action.payload.offset, action.payload.limit))
                .map(payload =>
                    actions.getTables.done({
                        params: action.payload,
                        result: payload
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.getTables.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getInterfaceEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getInterface.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.pages(state.auth.sessionToken))
                .map(payload =>
                    actions.getInterface.done({
                        params: action.payload,
                        result: payload
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.getInterface.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getPageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getPage.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.page(state.auth.sessionToken, action.payload.id))
                .map(payload =>
                    actions.getPage.done({
                        params: action.payload,
                        result: payload
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.getPage.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getMenuEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getMenu.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.row(state.auth.sessionToken, 'menu', action.payload.id))
                .map(payload =>
                    actions.getMenu.done({
                        params: action.payload,
                        result: payload.value as any
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.getMenu.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getContractEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getContract.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.row(state.auth.sessionToken, 'contracts', action.payload.id))
                .map(payload => actions.getContract.done({
                    params: action.payload,
                    result: {
                        id: action.payload.id,
                        active: payload.value.active,
                        name: payload.value.name,
                        conditions: payload.value.conditions,
                        address: keyring.walletIdToAddr(payload.value.wallet_id),
                        value: payload.value.value
                    }
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.getContract.failed({
                        params: action.payload,
                        error: e.error
                    })));
        });

export const getContractsEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getContracts.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.contracts(state.auth.sessionToken, action.payload.offset, action.payload.limit))
                .map(payload => actions.getContracts.done({
                    params: action.payload,
                    result: payload
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.getContracts.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getBlockEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getBlock.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.row(state.auth.sessionToken, 'blocks', action.payload.id))
                .map(payload => actions.getBlock.done({
                    params: action.payload,
                    result: payload.value as any
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.getBlock.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getLanguagesEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getLanguages.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.list(state.auth.sessionToken, 'languages', action.payload.offset, action.payload.limit))
                .map(payload => actions.getLanguages.done({
                    params: action.payload,
                    result: payload.list as any
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.getLanguages.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getLanguageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getLanguage.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.row(state.auth.sessionToken, 'languages', action.payload.id))
                .map(payload => actions.getLanguage.done({
                    params: action.payload,
                    result: payload.value as any
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.getLanguage.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export default combineEpics(
    getBlockEpic,
    getContractEpic,
    getContractsEpic,
    getTableEpic,
    getTablesEpic,
    getTableStructEpic,
    getInterfaceEpic,
    getPageEpic,
    getMenuEpic,
    getMenusEpic,
    getLanguagesEpic,
    getLanguageEpic
);