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

import * as actions from './actions';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import { IListResponse, ITableResponse, ITablesResponse, IInterfacesResponse, IContract } from 'lib/api';

export type State = {
    readonly pending: boolean;
    readonly createTableStatus: { block: string, error: string };
    readonly addColumnStatus: { block: string, error: string };
    readonly editColumnStatus: { block: string, error: string };
    readonly createPageStatus: { block: string, error: string };
    readonly editPageStatus: { block: string, error: string };
    readonly createMenuStatus: { block: string, error: string };
    readonly editMenuStatus: { block: string, error: string };
    readonly createContractStatus: { block: string, error: string };
    readonly editContractStatus: { block: string, error: string };
    readonly activateContractStatus: { block: string, error: string };
    readonly createBlockStatus: { block: string, error: string };
    readonly editBlockStatus: { block: string, error: string };
    readonly block: { id: string, name: string, value: string, conditions: string };
    readonly menu: { id: string, name: string, value: string, conditions: string };
    readonly menus: { id: string, name: string }[];
    readonly tables: ITablesResponse;
    readonly table: ITableResponse;
    readonly tableData: IListResponse;
    readonly page: { id: string, [key: string]: any };
    readonly interfaces: IInterfacesResponse;
    readonly contract: { id: string, name: string, conditions: string, address: string, value: string };
    readonly contracts: IContract[];
};

export const initialState: State = {
    createTableStatus: null,
    addColumnStatus: null,
    editColumnStatus: null,
    createPageStatus: null,
    editPageStatus: null,
    createMenuStatus: null,
    editMenuStatus: null,
    createContractStatus: null,
    editContractStatus: null,
    activateContractStatus: null,
    createBlockStatus: null,
    editBlockStatus: null,
    block: null,
    menu: null,
    menus: null,
    pending: false,
    tables: null,
    table: null,
    tableData: null,
    page: null,
    interfaces: null,
    contract: null,
    contracts: null
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.getInterface.started)) {
        return {
            ...state,
            pending: true,
            interfaces: null
        };
    }
    else if (isType(action, actions.getInterface.done)) {
        return {
            ...state,
            pending: false,
            interfaces: action.payload.result
        };
    }
    else if (isType(action, actions.getInterface.failed)) {
        return {
            ...state,
            pending: false,
            interfaces: null
        };
    }

    if (isType(action, actions.getPage.started)) {
        return {
            ...state,
            pending: true,
            page: null
        };
    }
    else if (isType(action, actions.getPage.done)) {
        return {
            ...state,
            pending: false,
            page: action.payload.result.page,
            menus: action.payload.result.menus
        };
    }
    else if (isType(action, actions.getPage.failed)) {
        return {
            ...state,
            pending: false,
            page: null,
            menus: null
        };
    }

    if (isType(action, actions.getMenu.started)) {
        return {
            ...state,
            pending: true,
            menu: null
        };
    }
    else if (isType(action, actions.getMenu.done)) {
        return {
            ...state,
            pending: false,
            menu: action.payload.result
        };
    }
    else if (isType(action, actions.getMenu.failed)) {
        return {
            ...state,
            pending: false,
            menu: null
        };
    }

    if (isType(action, actions.getTables.started)) {
        return {
            ...state,
            pending: true,
            tables: null
        };
    }
    else if (isType(action, actions.getTables.done)) {
        return {
            ...state,
            pending: false,
            tables: action.payload.result
        };
    }
    else if (isType(action, actions.getTables.failed)) {
        return {
            ...state,
            pending: false,
            tables: null
        };
    }

    if (isType(action, actions.getTable.started)) {
        return {
            ...state,
            pending: true,
            table: null,
            tableData: null
        };
    }
    else if (isType(action, actions.getTable.done)) {
        return {
            ...state,
            pending: false,
            table: action.payload.result.table,
            tableData: action.payload.result.data
        };
    }
    else if (isType(action, actions.getTable.failed)) {
        return {
            ...state,
            pending: false,
            table: null,
            tableData: null
        };
    }

    if (isType(action, actions.createTable.started)) {
        return {
            ...state,
            pending: true,
            createTableStatus: null
        };
    }
    else if (isType(action, actions.createTable.done)) {
        return {
            ...state,
            pending: false,
            createTableStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.createTable.failed)) {
        return {
            ...state,
            pending: false,
            createTableStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.addColumn.started)) {
        return {
            ...state,
            pending: true,
            addColumnStatus: null
        };
    }
    else if (isType(action, actions.addColumn.done)) {
        return {
            ...state,
            pending: false,
            addColumnStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.addColumn.failed)) {
        return {
            ...state,
            pending: false,
            addColumnStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.editColumn.started)) {
        return {
            ...state,
            pending: true,
            editColumnStatus: null
        };
    }
    else if (isType(action, actions.editColumn.done)) {
        return {
            ...state,
            pending: false,
            editColumnStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.editColumn.failed)) {
        return {
            ...state,
            pending: false,
            editColumnStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.getTableStruct.started)) {
        return {
            ...state,
            pending: true,
            table: null
        };
    }
    else if (isType(action, actions.getTableStruct.done)) {
        return {
            ...state,
            pending: false,
            table: action.payload.result
        };
    }
    else if (isType(action, actions.getTableStruct.failed)) {
        return {
            ...state,
            pending: false,
            table: null
        };
    }

    if (isType(action, actions.createPage.started)) {
        return {
            ...state,
            pending: true,
            createPageStatus: null
        };
    }
    else if (isType(action, actions.createPage.done)) {
        return {
            ...state,
            pending: false,
            createPageStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.createPage.failed)) {
        return {
            ...state,
            pending: false,
            createPageStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.editPage.started)) {
        return {
            ...state,
            pending: true,
            editPageStatus: null
        };
    }
    else if (isType(action, actions.editPage.done)) {
        return {
            ...state,
            pending: false,
            editPageStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.editPage.failed)) {
        return {
            ...state,
            pending: false,
            editPageStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.createMenu.started)) {
        return {
            ...state,
            pending: true,
            createMenuStatus: null
        };
    }
    else if (isType(action, actions.createMenu.done)) {
        return {
            ...state,
            pending: false,
            createMenuStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.createMenu.failed)) {
        return {
            ...state,
            pending: false,
            createMenuStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.editMenu.started)) {
        return {
            ...state,
            pending: true,
            editMenuStatus: null
        };
    }
    else if (isType(action, actions.editMenu.done)) {
        return {
            ...state,
            pending: false,
            editMenuStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.editMenu.failed)) {
        return {
            ...state,
            pending: false,
            editMenuStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.getMenus.started)) {
        return {
            ...state,
            pending: true,
            menus: null
        };
    }
    else if (isType(action, actions.getMenus.done)) {
        return {
            ...state,
            pending: false,
            menus: action.payload.result
        };
    }
    else if (isType(action, actions.getMenus.failed)) {
        return {
            ...state,
            pending: false,
            menus: null
        };
    }

    if (isType(action, actions.getContract.started)) {
        return {
            ...state,
            pending: true,
            contract: null
        };
    }
    else if (isType(action, actions.getContract.done)) {
        return {
            ...state,
            pending: false,
            contract: action.payload.result
        };
    }
    else if (isType(action, actions.getContract.failed)) {
        return {
            ...state,
            pending: false,
            contract: null
        };
    }

    if (isType(action, actions.getContracts.started)) {
        return {
            ...state,
            pending: true,
            contracts: null
        };
    }
    else if (isType(action, actions.getContracts.done)) {
        return {
            ...state,
            pending: false,
            contracts: action.payload.result.list
        };
    }
    else if (isType(action, actions.getContracts.failed)) {
        return {
            ...state,
            pending: false,
            contracts: null
        };
    }

    if (isType(action, actions.createContract.started)) {
        return {
            ...state,
            pending: true,
            createContractStatus: null
        };
    }
    else if (isType(action, actions.createContract.done)) {
        return {
            ...state,
            pending: false,
            createContractStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.createContract.failed)) {
        return {
            ...state,
            pending: false,
            createContractStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.editContract.started)) {
        return {
            ...state,
            pending: true,
            editContractStatus: null
        };
    }
    else if (isType(action, actions.editContract.done)) {
        return {
            ...state,
            pending: false,
            editContractStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.editContract.failed)) {
        return {
            ...state,
            pending: false,
            editContractStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.activateContract.started)) {
        return {
            ...state,
            pending: true,
            activateContractStatus: null
        };
    }
    else if (isType(action, actions.activateContract.done)) {
        return {
            ...state,
            pending: false,
            activateContractStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.activateContract.failed)) {
        return {
            ...state,
            pending: false,
            activateContractStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.createBlock.started)) {
        return {
            ...state,
            pending: true,
            createBlockStatus: null
        };
    }
    else if (isType(action, actions.createBlock.done)) {
        return {
            ...state,
            pending: false,
            createBlockStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.createBlock.failed)) {
        return {
            ...state,
            pending: false,
            createBlockStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.getBlock.started)) {
        return {
            ...state,
            pending: true,
            block: null
        };
    }
    else if (isType(action, actions.getBlock.done)) {
        return {
            ...state,
            pending: false,
            block: action.payload.result
        };
    }
    else if (isType(action, actions.getBlock.failed)) {
        return {
            ...state,
            pending: false,
            block: null
        };
    }

    if (isType(action, actions.editBlock.started)) {
        return {
            ...state,
            pending: true,
            editBlockStatus: null
        };
    }
    else if (isType(action, actions.editBlock.done)) {
        return {
            ...state,
            pending: false,
            editBlockStatus: {
                block: action.payload.result,
                error: null
            }
        };
    }
    else if (isType(action, actions.editBlock.failed)) {
        return {
            ...state,
            pending: false,
            editBlockStatus: {
                block: null,
                error: action.payload.error
            }
        };
    }

    return state;
};