// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import keyring from 'lib/keyring';
import { readTextFile } from 'lib/fs';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { Epic } from 'modules';
import * as actions from './actions';
import { ITableResponse, IDataResponse } from 'genesis/api';

export const getTableEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getTable.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getTable({
            name: action.payload.table

        })).flatMap(tableStruct => {
            const columns: string[] = [];
            tableStruct.columns.forEach(column => {
                if (-1 !== action.payload.columnTypes.indexOf(column.type)) {
                    columns.push(column.name);
                }
            });

            return Observable.fromPromise(client.getData({
                name: action.payload.table,
                columns

            })).map(tableData => actions.getTable.done({
                params: action.payload,
                result: {
                    table: tableStruct,
                    data: tableData
                }
            }));

        }).catch(e =>
            Observable.of(actions.getTable.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getTableStructEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getTableStruct.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getTable({
            name: action.payload.name

        })).map(payload =>
            actions.getTableStruct.done({
                params: action.payload,
                result: payload
            })

        ).catch(e =>
            Observable.of(actions.getTableStruct.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getMenusEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getMenus.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getData({
            name: 'menu'

        })).map(payload =>
            actions.getMenus.done({
                params: action.payload,
                result: payload.list.map(v => ({
                    id: v.id,
                    name: v.name,
                    conditions: v.conditions,
                    value: v.value
                }))
            })
        ).catch(e =>
            Observable.of(actions.getMenus.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getTablesEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getTables.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getTables({
            offset: action.payload.offset,
            limit: action.payload.limit

        })).map(payload =>
            actions.getTables.done({
                params: action.payload,
                result: payload
            })
        ).catch(e =>
            Observable.of(actions.getTables.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getHistoryEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getHistory.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getHistory({
            id: action.payload.id,
            table: action.payload.table

        })).map(payload =>
            actions.getHistory.done({
                params: action.payload,
                result: payload
            })
        ).catch(e =>
            Observable.of(actions.getHistory.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getInterfaceEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getInterface.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(Promise.all([
            client.getData({ name: 'pages', columns: ['name'] }),
            client.getData({ name: 'menu', columns: ['name'] }),
            client.getData({ name: 'blocks', columns: ['name'] })

        ])).map(payload =>
            actions.getInterface.done({
                params: action.payload,
                result: {
                    pages: payload[0].list as { id: string, name: string }[],
                    menus: payload[1].list as { id: string, name: string }[],
                    blocks: payload[2].list as { id: string, name: string }[]
                }
            })

        ).catch(e =>
            Observable.of(actions.getInterface.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getPageEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getPage.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(Promise.all([
            client.getPage({ name: action.payload.name }),
            client.getData({ name: 'menu' })

        ])).map(payload =>
            actions.getPage.done({
                params: action.payload,
                result: {
                    page: payload[0],
                    menus: payload[1].list as any
                }
            })
        ).catch(e =>
            Observable.of(actions.getPage.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getMenuEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getMenu.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getMenu({
            name: action.payload.name

        })).map(payload =>
            actions.getMenu.done({
                params: action.payload,
                result: payload
            })

        ).catch(e =>
            Observable.of(actions.getMenu.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getContractEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getContract.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(
            action.payload.id ?
                client.getRow({ table: 'contracts', id: action.payload.id })
                :
                client.getContract({ name: action.payload.name }).then(l =>
                    client.getRow({ table: 'contracts', id: l.tableid.toString() })
                )

        ).map(payload => actions.getContract.done({
            params: action.payload,
            result: {
                id: payload.value.id,
                active: payload.value.active,
                name: payload.value.name,
                conditions: payload.value.conditions,
                address: payload.value.wallet_id && keyring.walletIdToAddr(payload.value.wallet_id),
                value: payload.value.value
            }

        })).catch(e =>
            Observable.of(actions.getContract.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getContractsEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getContracts.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getContracts({
            offset: action.payload.offset,
            limit: action.payload.limit

        })).map(payload => actions.getContracts.done({
            params: action.payload,
            result: payload

        })).catch(e =>
            Observable.of(actions.getContracts.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getBlockEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getBlock.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getBlock({
            name: action.payload.name

        })).map(payload => actions.getBlock.done({
            params: action.payload,
            result: payload

        })).catch(e =>
            Observable.of(actions.getBlock.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getLanguagesEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getLanguages.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getData({
            name: 'languages',
            offset: action.payload.offset,
            limit: action.payload.limit

        })).map(payload => actions.getLanguages.done({
            params: action.payload,
            result: (payload.list as any) || []

        })).catch(e =>
            Observable.of(actions.getLanguages.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getLanguageEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getLanguage.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getRow({
            table: 'languages',
            id: action.payload.id

        })).map(payload => actions.getLanguage.done({
            params: action.payload,
            result: payload.value as any

        })).catch(e =>
            Observable.of(actions.getLanguage.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getParametersEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getParameters.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getParams({
            names: action.payload.params

        })).map(payload => actions.getParameters.done({
            params: action.payload,
            result: payload.list

        })).catch(e =>
            Observable.of(actions.getParameters.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const getParameterEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.getParameter.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        return Observable.fromPromise(client.getParam({
            name: action.payload.name

        })).map(payload => actions.getParameter.done({
            params: action.payload,
            result: payload

        })).catch(e =>
            Observable.of(actions.getParameter.failed({
                params: action.payload,
                error: e.error
            }))
        );
    });

export const exportDataEpic: Epic = (action$, store, { api }) => action$.ofAction(actions.exportData.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);

        const promise = Bluebird.all([
            Bluebird.map(action.payload.pages, page => client.getRow({ table: 'pages', id: page }), { concurrency: 3 }),
            Bluebird.map(action.payload.blocks, block => client.getRow({ table: 'blocks', id: block }), { concurrency: 3 }),
            Bluebird.map(action.payload.menus, menu => client.getRow({ table: 'menu', id: menu }), { concurrency: 3 }),
            action.payload.parameters.length ? client.getParams({ names: action.payload.parameters }) as any : Promise.resolve([]),
            Bluebird.map(action.payload.languages, language => client.getRow({ table: 'languages', id: language }), { concurrency: 3 }),
            Bluebird.map(action.payload.contracts, contract => client.getRow({ table: 'contracts', id: contract.id }).then(data => ({ name: contract.name, ...data })), { concurrency: 3 }),
            Bluebird.map(action.payload.tables, table => client.getTable({ name: table }), { concurrency: 3 }),
            Bluebird.map(action.payload.data, table => client.getTable({ name: table }), { concurrency: 1 })
                .map((struct: ITableResponse) => {
                    const columns = struct.columns.map(l => l.name);

                    const mapColumns = (data: { [key: string]: string }) => {
                        return columns.map(col => data[col]);
                    };

                    const fetchPartial = (offset: number, limit: number, values: any[] = []): any =>
                        client.getData({ name: struct.name, offset, limit, columns })
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
            data: IDataResponse[]
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
            .map(payload => actions.exportData.done({
                params: action.payload,
                result: payload

            })).catch(e =>
                Observable.of(actions.exportData.failed({
                    params: action.payload,
                    error: e.error
                }))
            );
    });

export const importDataEpic: Epic = (action$, store) => action$.ofAction(actions.importData.started)
    .flatMap(action => {
        return Observable.from(readTextFile(action.payload.file)).map(payload => {
            const result = JSON.parse(payload);

            if (Array.isArray(result.pages) &&
                Array.isArray(result.blocks) &&
                Array.isArray(result.menus) &&
                Array.isArray(result.parameters) &&
                Array.isArray(result.languages) &&
                Array.isArray(result.contracts)) {

                return actions.importData.done({
                    params: action.payload,
                    result
                });
            }
            else {
                throw { e: 'E_INVALID_PAYLOAD' };
            }
        }).catch(e => {
            return Observable.of(actions.importData.failed({
                params: action.payload,
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
    getHistoryEpic,
    getTableStructEpic,
    getInterfaceEpic,
    getPageEpic,
    getMenuEpic,
    getMenusEpic,
    getLanguagesEpic,
    getLanguageEpic,
    getParameterEpic,
    getParametersEpic,
    exportDataEpic,
    importDataEpic
);