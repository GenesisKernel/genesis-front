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

import api, { IAPIError, ITxStatusResponse } from 'lib/api';
import keyring from 'lib/keyring';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import * as actions from './actions';

export const createPageEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.createPage.started.match)
        .switchMap(action => {
            const execParams = {
                Name: action.payload.name,
                Value: action.payload.template,
                Menu: action.payload.menu,
                Conditions: action.payload.conditions
            };

            const promise = api.txPrepare(action.payload.session, 'NewPage', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'NewPage', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.createPage.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.createPage.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export const editPageEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.editPage.started.match)
        .switchMap(action => {
            const execParams = {
                Id: action.payload.id,
                Value: action.payload.template,
                Menu: action.payload.menu,
                Conditions: action.payload.conditions
            };

            const promise = api.txPrepare(action.payload.session, 'EditPage', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'EditPage', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.editPage.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.editPage.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export const createMenuEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.createMenu.started.match)
        .switchMap(action => {
            const execParams = {
                Name: action.payload.name,
                Value: action.payload.template,
                Conditions: action.payload.conditions
            };

            const promise = api.txPrepare(action.payload.session, 'NewMenu', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'NewMenu', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.createMenu.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.createMenu.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export const editMenuEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.editMenu.started.match)
        .switchMap(action => {
            const execParams = {
                Id: action.payload.id,
                Value: action.payload.template,
                Conditions: action.payload.conditions
            };

            const promise = api.txPrepare(action.payload.session, 'EditMenu', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'EditMenu', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.editMenu.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.editMenu.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export const createTableEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.createTable.started.match)
        .switchMap(action => {
            const execParams = {
                Name: action.payload.name,
                Columns: action.payload.columns,
                Permissions: action.payload.permissions
            };

            const promise = api.txPrepare(action.payload.session, 'NewTable', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'NewTable', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.createTable.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.createTable.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export const addColumnEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.addColumn.started.match)
        .switchMap(action => {
            const execParams = {
                TableName: action.payload.table,
                Name: action.payload.name,
                Type: action.payload.type,
                Permissions: action.payload.permissions
            };

            const promise = api.txPrepare(action.payload.session, 'NewColumn', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'NewColumn', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.addColumn.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.addColumn.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export const editColumnEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.editColumn.started.match)
        .switchMap(action => {
            const execParams = {
                TableName: action.payload.table,
                Name: action.payload.name,
                Permissions: action.payload.permissions
            };

            const promise = api.txPrepare(action.payload.session, 'EditColumn', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'EditColumn', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.editColumn.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.editColumn.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

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

export const getTableStructEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getTableStruct.started.match)
        .switchMap(action => {
            const promise = api.table(action.payload.session, action.payload.table);
            return Observable.from(promise).map(payload => {
                return actions.getTableStruct.done({
                    params: null,
                    result: payload
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getTableStruct.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export const getMenusEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getMenus.started.match)
        .switchMap(action => {
            return Observable.from(api.list(action.payload.session, 'menu')).map(payload => {
                return actions.getMenus.done({
                    params: action.payload,
                    result: payload.list.map(v => ({
                        id: v.id,
                        name: v.name,
                        conditions: v.conditions,
                        value: v.value
                    }))
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getMenus.failed({
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
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getTables.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export const getPagesEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getInterface.started.match)
        .switchMap(action => {
            return Observable.from(api.pages(action.payload.session)).map(payload => {
                return actions.getInterface.done({
                    params: null,
                    result: payload
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getInterface.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export const getPageEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getPage.started.match)
        .switchMap(action => {
            return Observable.from(api.page(action.payload.session, action.payload.id)).map(payload => {
                return actions.getPage.done({
                    params: null,
                    result: payload
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getPage.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export const getMenuEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getMenu.started.match)
        .switchMap(action => {
            return Observable.from(api.row(action.payload.session, 'menu', action.payload.id)).map(payload => {
                return actions.getMenu.done({
                    params: null,
                    result: payload.value as any
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getMenu.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export const getContractEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getContract.started.match)
        .switchMap(action => {
            const promise = api.row(action.payload.session, 'contracts', action.payload.id);

            return Observable.from(promise).map(payload => {
                return actions.getContract.done({
                    params: null,
                    result: {
                        id: action.payload.id,
                        active: payload.value.active,
                        name: payload.value.name,
                        conditions: payload.value.conditions,
                        address: keyring.walletIdToAddr(payload.value.wallet_id),
                        value: payload.value.value
                    }
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getContract.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export const getContractsEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getContracts.started.match)
        .switchMap(action => {
            return Observable.from(api.contracts(action.payload.session, action.payload.offset, action.payload.limit)).map(payload => {
                return actions.getContracts.done({
                    params: null,
                    result: payload
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getContracts.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export const createContractEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.createContract.started.match)
        .switchMap(action => {
            const execParams = {
                Wallet: action.payload.wallet,
                Value: action.payload.code,
                Conditions: action.payload.conditions
            };

            const promise = api.txPrepare(action.payload.session, 'NewContract', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'NewContract', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.createContract.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.createContract.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export const editContractEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.editContract.started.match)
        .switchMap(action => {
            const execParams = {
                Id: action.payload.id,
                Value: action.payload.code,
                Conditions: action.payload.conditions
            };

            const promise = api.txPrepare(action.payload.session, 'EditContract', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'EditContract', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.editContract.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.editContract.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export const activateContractEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.activateContract.started.match)
        .switchMap(action => {
            const execParams = {
                Id: action.payload.id
            };

            const promise = api.txPrepare(action.payload.session, 'ActivateContract', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'ActivateContract', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.activateContract.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.activateContract.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export const getBlockEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.getBlock.started.match)
        .switchMap(action => {
            return Observable.from(api.row(action.payload.session, 'blocks', action.payload.id)).map(payload => {
                return actions.getBlock.done({
                    params: null,
                    result: payload.value as any
                });
            }).catch((error: IAPIError) => {
                return Observable.of(actions.getBlock.failed({
                    params: null,
                    error: error.error
                }));
            });
        });

export const createBlockEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.createBlock.started.match)
        .switchMap(action => {
            const execParams = {
                Name: action.payload.name,
                Value: action.payload.template,
                Conditions: action.payload.conditions
            };

            const promise = api.txPrepare(action.payload.session, 'NewBlock', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'NewBlock', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.createBlock.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.createBlock.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export const editBlockEpic = (actions$: Observable<Action>) =>
    actions$.filter(actions.editBlock.started.match)
        .switchMap(action => {
            const execParams = {
                Id: action.payload.id,
                Value: action.payload.template,
                Conditions: action.payload.conditions
            };

            const promise = api.txPrepare(action.payload.session, 'EditBlock', execParams).then(response => {
                const signature = keyring.sign(response.forsign, action.payload.privateKey);
                return api.txExec(action.payload.session, 'EditBlock', {
                    ...execParams,
                    pubkey: action.payload.publicKey,
                    signature,
                    time: response.time
                });
            });

            return Observable.from(promise).map(payload => {
                return actions.editBlock.done({
                    params: action.payload,
                    result: payload.blockid
                });
            }).catch((error: ITxStatusResponse) =>
                Observable.of(actions.editBlock.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export default combineEpics(
    getBlockEpic,
    getContractEpic,
    getContractsEpic,
    getTableEpic,
    getTablesEpic,
    getTableStructEpic,
    getPagesEpic,
    getPageEpic,
    getMenuEpic,
    getMenusEpic,
    createBlockEpic,
    createTableEpic,
    createPageEpic,
    createMenuEpic,
    createContractEpic,
    editBlockEpic,
    editPageEpic,
    editMenuEpic,
    editContractEpic,
    editColumnEpic,
    activateContractEpic,
    addColumnEpic
);