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

import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import api, { IAPIError, ITableResponse, IListResponse } from 'lib/api';
import keyring from 'lib/keyring';
import { readTextFile } from 'lib/fs';
import { combineEpics, Epic } from 'redux-observable';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { IRootState } from 'modules';
import * as actions from './actions';
import storage from 'lib/storage';

export const getTableEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getTable.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.table(state.auth.sessionToken, action.payload.table, action.payload.vde))
                .flatMap(tableStruct => {
                    const columns: string[] = ['id'];
                    tableStruct.columns.forEach(column => {
                        if (-1 !== action.payload.columnTypes.indexOf(column.type)) {
                            columns.push(column.name);
                        }
                    });

                    return Observable.fromPromise(api.list(state.auth.sessionToken, action.payload.table, undefined, undefined, columns, action.payload.vde))
                        .map(tableData => actions.getTable.done({
                            params: action.payload,
                            result: {
                                table: tableStruct,
                                data: tableData
                            }
                        }));
                })
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
            return Observable.fromPromise(api.table(state.auth.sessionToken, action.payload.name, action.payload.vde))
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
            return Observable.fromPromise(api.list(state.auth.sessionToken, 'menu', undefined, undefined, undefined, action.payload.vde))
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
            return Observable.fromPromise(api.tables(state.auth.sessionToken, action.payload.offset, action.payload.limit, action.payload.vde))
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
            return Observable.fromPromise(api.pages(state.auth.sessionToken, action.payload.vde))
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
            return Observable.fromPromise(api.page(state.auth.sessionToken, action.payload.id, action.payload.vde))
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
            return Observable.fromPromise(api.row(state.auth.sessionToken, 'menu', action.payload.id, undefined, action.payload.vde))
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
            return Observable.fromPromise(api.row(state.auth.sessionToken, 'contracts', action.payload.id, undefined, action.payload.vde))
                .map(payload => actions.getContract.done({
                    params: action.payload,
                    result: {
                        id: action.payload.id,
                        active: payload.value.active,
                        name: payload.value.name,
                        conditions: payload.value.conditions,
                        address: payload.value.wallet_id && keyring.walletIdToAddr(payload.value.wallet_id),
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
            return Observable.fromPromise(api.contracts(state.auth.sessionToken, action.payload.vde, action.payload.offset, action.payload.limit))
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
            return Observable.fromPromise(api.row(state.auth.sessionToken, 'blocks', action.payload.id, undefined, action.payload.vde))
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
            return Observable.fromPromise(api.list(state.auth.sessionToken, 'languages', action.payload.offset, action.payload.limit, undefined, action.payload.vde))
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

export const getParametersEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getParameters.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.parameters(state.auth.sessionToken, action.payload.params, action.payload.vde))
                .map(payload => actions.getParameters.done({
                    params: action.payload,
                    result: payload
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.getParameters.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getParameterEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getParameter.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.parameter(state.auth.sessionToken, action.payload.name, action.payload.vde))
                .map(payload => actions.getParameter.done({
                    params: action.payload,
                    result: payload
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.getParameter.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getTabListEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getTabList.started)
        .flatMap(action => {

            let tabList: any = storage.settings.load('tabList');
            if (!tabList) {
                tabList = [];
            }
            else {
                try {
                    tabList = JSON.parse(tabList);
                }
                catch (e) {
                    tabList = [];
                }
            }

            if ('string' === typeof action.payload.addID) {
                let index = tabList.findIndex((item: any) => item.id === action.payload.addID && item.type === action.payload.addType);
                // delete existing tab and add to the end. update name
                if (index >= 0 && index < tabList.length) {
                    tabList = [
                        ...tabList.slice(0, index),
                        ...tabList.slice(index + 1)
                    ];
                }

                tabList = tabList.concat({
                    id: action.payload.addID,
                    name: action.payload.addName,
                    type: action.payload.addType,
                    visible: true
                });

                let settingsTabList = [];

                for (let item of tabList) {
                    settingsTabList.push({
                        id: item.id,
                        name: item.name,
                        type: item.type
                    });
                }
                storage.settings.save('tabList', JSON.stringify(settingsTabList));
            }

            return Observable.of(actions.getTabList.done({
                params: action.payload,
                result: { tabList: tabList }
            }));

        });

export const removeTabListEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.removeTabList.started)
        .flatMap(action => {

            const state = store.getState();

            let tabList = state.admin.tabs.list;

            if ('string' === typeof action.payload.id && 'string' === typeof action.payload.type) {
                let index = tabList.findIndex((item: any) => item.id === action.payload.id && item.type === action.payload.type);
                if (index >= 0 && index < tabList.length) {

                    // store only visible tabs
                    let tabListStorage = [
                        ...tabList.slice(0, index),
                        ...tabList.slice(index + 1)
                    ];

                    // remove visible attr
                    let tabListStorageCleared = [];
                    for (let item of tabListStorage) {
                        if (item.visible !== false) {
                            tabListStorageCleared.push({
                                id: item.id,
                                name: item.name,
                                type: item.type
                            });
                        }
                    }
                    storage.settings.save('tabList', JSON.stringify(tabListStorageCleared));

                    // mark tab is invisible to prevent reload pages
                    tabList = tabList.concat();
                    tabList[index].visible = false;

                }
            }

            return Observable.of(actions.removeTabList.done({
                params: action.payload,
                result: { tabList: tabList }
            }));

        });

export const getPageTreeCodeEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getPageTreeCode.started)
        .flatMap(action => {
            const state = store.getState();

            function generateId() {
                return 'tag_' + (10000000 + Math.floor(Math.random() * 89999999));
            }

            function setIds(children: any[]) {
                for (let tag of children) {
                    if (!tag) {
                        continue;
                    }
                    if (!tag.id) {
                        tag.id = generateId();
                    }
                    if (tag.children) {
                        setIds(tag.children);
                    }
                }

            }

            return Observable.fromPromise(api.contentTest(state.auth.sessionToken, action.payload.code))
                .map(payload => {
                    let pageTreeCode = payload.tree;
                    setIds(pageTreeCode);

                    return actions.getPageTreeCode.done({
                        params: action.payload,
                        result: {
                            pageTreeCode: pageTreeCode
                        }
                    });
                }
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.getPageTreeCode.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const getPageTreeEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.getPageTree.started)
        .flatMap(action => {
            const state = store.getState();

            function generateId() {
                return 'tag_' + (10000000 + Math.floor(Math.random() * 89999999));
            }

            function setIds(children: any[]) {
                for (let tag of children) {
                    if (!tag) {
                        continue;
                    }
                    if (!tag.id) {
                        tag.id = generateId();
                    }
                    if (tag.children) {
                        setIds(tag.children);
                    }
                }

            }

            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, action.payload.name, {}))
                .map(payload => {
                    let pageTree = payload.tree;
                    setIds(pageTree);

                    return actions.getPageTree.done({
                        params: action.payload,
                        result: {
                            page: {
                                name: action.payload.name,
                                tree: pageTree
                            }
                        }
                    });
                }
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.getPageTree.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const exportDataEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.exportData.started)
        .flatMap(action => {
            const state = store.getState();
            const promise = Bluebird.all([
                Bluebird.map(action.payload.pages, page => api.row(state.auth.sessionToken, 'pages', page, undefined, action.payload.vde), { concurrency: 3 }),
                Bluebird.map(action.payload.blocks, block => api.row(state.auth.sessionToken, 'blocks', block, undefined, action.payload.vde), { concurrency: 3 }),
                Bluebird.map(action.payload.menus, menu => api.row(state.auth.sessionToken, 'menu', menu, undefined, action.payload.vde), { concurrency: 3 }),
                action.payload.parameters.length ? api.parameters(state.auth.sessionToken, action.payload.parameters, action.payload.vde) : Promise.resolve([]),
                Bluebird.map(action.payload.languages, language => api.row(state.auth.sessionToken, 'languages', language, undefined, action.payload.vde), { concurrency: 3 }),
                Bluebird.map(action.payload.contracts, contract => api.row(state.auth.sessionToken, 'contracts', contract.id, undefined, action.payload.vde).then(data => ({ name: contract.name, ...data })), { concurrency: 3 }),
                Bluebird.map(action.payload.tables, table => api.table(state.auth.sessionToken, table, action.payload.vde), { concurrency: 3 }),
                Bluebird.map(action.payload.data, table => api.table(state.auth.sessionToken, table, action.payload.vde), { concurrency: 1 }).map((struct: ITableResponse) => {
                    const columns = struct.columns.map(l => l.name);

                    const mapColumns = (data: { [key: string]: string }) => {
                        return columns.map(col => data[col]);
                    };

                    const fetchPartial = (offset: number, limit: number, values: any[] = []): any =>
                        api.list(state.auth.sessionToken, struct.name, offset, limit, columns, action.payload.vde)
                            .then(result => {
                                // API returns null if requested offset is empty so we'll need to
                                // handle this, otherwise list.length will fail
                                if (!result.list) {
                                    return _.flatten(values);
                                }
                                else if (limit > result.list.length) {
                                    values.push(result.list.map(mapColumns));
                                    return _.flatten(values);
                                }
                                else {
                                    values.push(result.list.map(mapColumns));
                                    return fetchPartial(offset + limit, limit, values);
                                }
                            });

                    return fetchPartial(0, 15)
                        .then((data: any) => ({
                            Table: struct.name,
                            Columns: columns,
                            Data: data
                        }));
                })

            ]).spread((
                pages: { value: { id: string, name: string, conditions: string, menu: string, value: string } }[],
                blocks: { value: { id: string, name: string, conditions: string, menu: string, value: string } }[],
                menus: { value: { id: string, name: string, conditions: string, menu: string, value: string } }[],
                parameters: { name: string, value: string, conditions: string }[],
                languages: { value: { id: string, name: string, conditions: string, res: string } }[],
                contracts: { name: string, value: { id: string, conditions: string, value: string } }[],
                tables: ITableResponse[],
                data: IListResponse[]
            ) => ({
                // There are more fields so we'll need to pick only those we really need
                // Property names must be PascalCase as required by simvolio
                pages: pages.map(page => ({
                    Name: page.value.name,
                    Conditions: page.value.conditions,
                    Menu: page.value.menu,
                    Value: page.value.value
                })),
                blocks: blocks.map(block => ({
                    Name: block.value.name,
                    Conditions: block.value.conditions,
                    Value: block.value.value
                })),
                menus: menus.map(menu => ({
                    Name: menu.value.name,
                    Conditions: menu.value.conditions,
                    Value: menu.value.value
                })),
                parameters: parameters.map(parameter => ({
                    Name: parameter.name,
                    Value: parameter.value,
                    Conditions: parameter.conditions
                })),
                languages: languages.map(language => ({
                    Name: language.value.name,
                    Trans: language.value.res,
                    Conditions: language.value.conditions
                })),
                contracts: contracts.map(contract => ({
                    Name: contract.name,
                    Value: contract.value.value,
                    Conditions: contract.value.conditions
                })),
                tables: tables.map(table => ({
                    Name: table.name,
                    Columns: JSON.stringify(table.columns.map(col => ({
                        name: col.name,
                        type: col.type,
                        index: col.index,
                        conditions: col.perm
                    }))),
                    Permissions: JSON.stringify({
                        insert: table.insert,
                        update: table.update,
                        new_column: table.new_column
                    })
                })),
                data
            }));

            return Observable.fromPromise(promise)
                .map(payload =>
                    actions.exportData.done({
                        params: action.payload,
                        result: payload
                    }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.exportData.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const importDataEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.importData.started)
        .flatMap(action => {
            return Observable.from(readTextFile(action.payload)).map(payload => {
                const result = JSON.parse(payload);

                if (Array.isArray(result.pages) &&
                    Array.isArray(result.blocks) &&
                    Array.isArray(result.menus) &&
                    Array.isArray(result.parameters) &&
                    Array.isArray(result.languages) &&
                    Array.isArray(result.contracts)) {

                    return actions.importData.done({
                        params: null,
                        result
                    });
                }
                else {
                    throw { e: 'E_INVALID_PAYLOAD' };
                }
            }).catch(e => {
                return Observable.of(actions.importData.failed({
                    params: null,
                    error: null
                }));
            });
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
    getPageTreeEpic,
    getPageTreeCodeEpic,
    getMenuEpic,
    getMenusEpic,
    getLanguagesEpic,
    getLanguageEpic,
    getParameterEpic,
    getParametersEpic,
    getTabListEpic,
    removeTabListEpic,
    exportDataEpic,
    importDataEpic
);