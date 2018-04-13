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

import * as actions from './actions';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import { ITableResponse, IDataResponse, IHistoryResponse, IParamResponse, ITablesResponse } from 'genesis/api';

export type State = {
    readonly pending: boolean;
    readonly block: { id: number, name: string, value: string, conditions: string };
    readonly menu: { id: number, name: string, value: string, conditions: string };
    readonly menus: { id: number, name: string, value: string, conditions: string }[];
    readonly tables: ITablesResponse;
    readonly table: ITableResponse;
    readonly tableData: IDataResponse;
    readonly history: IHistoryResponse;
    readonly page: { id: number, name: string, menu: string, conditions: string, value: string };
    readonly interfaces: {
        pages: { id: string, name: string }[];
        blocks: { id: string, name: string }[];
        menus: { id: string, name: string }[];
    };
    readonly contract: { id: string, active: string, name: string, conditions: string, address: string, value: string };
    readonly contracts: { id: string, name: string, value: string, wallet_id: string, address: string, conditions: string, token_id: string, active: string }[];
    readonly language: { id: string, res: any, name: string, conditions: string };
    readonly languages: { id: string, res: any, name: string, conditions: string }[];
    readonly parameter: IParamResponse;
    readonly parameters: IParamResponse[];
    readonly exportPayload: Object;
    readonly importPayload: {
        pages: { Name: string }[];
        blocks: { Name: string }[];
        menus: { Name: string }[];
        parameters: { Name: string }[];
        languages: { Name: string }[];
        contracts: { Name: string }[];
        tables: { Name: string }[];
        data: {
            Table: string;
            Columns: string[];
            Data: any[][];
        }[];
    };
};

export const initialState: State = {
    block: null,
    menu: null,
    menus: null,
    pending: false,
    tables: null,
    table: null,
    tableData: null,
    history: null,
    page: null,
    interfaces: null,
    contract: null,
    contracts: null,
    language: null,
    languages: null,
    parameter: null,
    parameters: null,
    exportPayload: null,
    importPayload: null
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
            menus: action.payload.result.menus,
            // tabs: {
            //     ...state.tabs,
            //     data: {
            //         ...state.tabs.data,
            //         ['interfacePage' + action.payload.result.page.id]: {
            //             type: 'interfacePage',
            //             data: action.payload.result.page
            //         }
            //     }
            // }
        };
    }
    else if (isType(action, actions.getPage.failed)) {
        return {
            ...state,
            pending: false,
            ['page']: null,
            ['menus']: null
        };
    }

    if (isType(action, actions.getMenu.started)) {
        return {
            ...state,
            pending: true,
            ['menu']: null
        };
    }
    else if (isType(action, actions.getMenu.done)) {
        return {
            ...state,
            pending: false,
            ['menu']: action.payload.result
        };
    }
    else if (isType(action, actions.getMenu.failed)) {
        return {
            ...state,
            pending: false,
            ['menu']: null
        };
    }

    if (isType(action, actions.getTables.started)) {
        return {
            ...state,
            pending: true,
            ['tables']: null
        };
    }
    else if (isType(action, actions.getTables.done)) {
        return {
            ...state,
            pending: false,
            ['tables']: action.payload.result
        };
    }
    else if (isType(action, actions.getTables.failed)) {
        return {
            ...state,
            pending: false,
            ['tables']: null
        };
    }

    if (isType(action, actions.getHistory.started)) {
        return {
            ...state,
            pending: true,
            history: null
        };
    }
    else if (isType(action, actions.getHistory.done)) {
        return {
            ...state,
            pending: false,
            history: action.payload.result
        };
    }
    else if (isType(action, actions.getHistory.failed)) {
        return {
            ...state,
            pending: false,
            history: null
        };
    }

    if (isType(action, actions.getTable.started)) {
        return {
            ...state,
            pending: true,
            ['table']: null,
            ['tableData']: null
        };
    }
    else if (isType(action, actions.getTable.done)) {
        return {
            ...state,
            pending: false,
            ['table']: action.payload.result.table,
            ['tableData']: action.payload.result.data
        };
    }
    else if (isType(action, actions.getTable.failed)) {
        return {
            ...state,
            pending: false,
            ['table']: null,
            ['tableData']: null
        };
    }

    if (isType(action, actions.getTableStruct.started)) {
        return {
            ...state,
            pending: true,
            ['table']: null
        };
    }
    else if (isType(action, actions.getTableStruct.done)) {
        return {
            ...state,
            pending: false,
            ['table']: action.payload.result
        };
    }
    else if (isType(action, actions.getTableStruct.failed)) {
        return {
            ...state,
            pending: false,
            ['table']: null
        };
    }

    if (isType(action, actions.getMenus.started)) {
        return {
            ...state,
            pending: true,
            ['menus']: null
        };
    }
    else if (isType(action, actions.getMenus.done)) {
        return {
            ...state,
            pending: false,
            menus: {
                ...action.payload.result.map(l => ({
                    ...l,
                    id: parseInt(l.id, 10)
                }))
            }
        };
    }
    else if (isType(action, actions.getMenus.failed)) {
        return {
            ...state,
            pending: false,
            ['menus']: null
        };
    }

    if (isType(action, actions.getContract.started)) {
        return {
            ...state,
            pending: true,
            ['contract']: null
        };
    }
    else if (isType(action, actions.getContract.done)) {
        return {
            ...state,
            pending: false,
            ['contract']: action.payload.result
        };
    }
    else if (isType(action, actions.getContract.failed)) {
        return {
            ...state,
            pending: false,
            ['contract']: null
        };
    }

    if (isType(action, actions.getContracts.started)) {
        return {
            ...state,
            pending: true,
            ['contracts']: null
        };
    }
    else if (isType(action, actions.getContracts.done)) {
        return {
            ...state,
            pending: false,
            ['contracts']: action.payload.result.list
        };
    }
    else if (isType(action, actions.getContracts.failed)) {
        return {
            ...state,
            pending: false,
            ['contracts']: null
        };
    }

    if (isType(action, actions.getBlock.started)) {
        return {
            ...state,
            pending: true,
            ['block']: null
        };
    }
    else if (isType(action, actions.getBlock.done)) {
        return {
            ...state,
            pending: false,
            ['block']: action.payload.result
        };
    }
    else if (isType(action, actions.getBlock.failed)) {
        return {
            ...state,
            pending: false,
            ['block']: null
        };
    }

    if (isType(action, actions.getLanguages.started)) {
        return {
            ...state,
            pending: true,
            ['languages']: null
        };
    }
    else if (isType(action, actions.getLanguages.done)) {
        return {
            ...state,
            pending: false,
            ['languages']: action.payload.result
        };
    }
    else if (isType(action, actions.getLanguages.failed)) {
        return {
            ...state,
            pending: false,
            ['languages']: null
        };
    }

    if (isType(action, actions.getLanguage.started)) {
        return {
            ...state,
            pending: true,
            ['language']: null
        };
    }
    else if (isType(action, actions.getLanguage.done)) {
        return {
            ...state,
            pending: false,
            ['language']: action.payload.result
        };
    }
    else if (isType(action, actions.getLanguage.failed)) {
        return {
            ...state,
            pending: false,
            ['language']: null
        };
    }

    if (isType(action, actions.getParameters.started)) {
        return {
            ...state,
            pending: true,
            ['parameters']: null
        };
    }
    else if (isType(action, actions.getParameters.done)) {
        return {
            ...state,
            pending: false,
            ['parameters']: action.payload.result
        };
    }
    else if (isType(action, actions.getParameters.failed)) {
        return {
            ...state,
            pending: false,
            ['parameters']: null
        };
    }

    if (isType(action, actions.getParameter.started)) {
        return {
            ...state,
            pending: true,
            ['parameter']: null
        };
    }
    else if (isType(action, actions.getParameter.done)) {
        return {
            ...state,
            pending: false,
            ['parameter']: action.payload.result
        };
    }
    else if (isType(action, actions.getParameter.failed)) {
        return {
            ...state,
            pending: false,
            ['parameter']: null
        };
    }

    if (isType(action, actions.exportData.started)) {
        return {
            ...state,
            pending: true,
            ['exportPayload']: null
        };
    }
    else if (isType(action, actions.exportData.done)) {
        return {
            ...state,
            pending: false,
            ['exportPayload']: action.payload.result
        };
    }
    else if (isType(action, actions.exportData.failed)) {
        return {
            ...state,
            pending: false,
            ['exportPayload']: null
        };
    }

    if (isType(action, actions.importData.started)) {
        return {
            ...state,
            pending: true,
            ['importPayload']: null
        };
    }
    else if (isType(action, actions.importData.done)) {
        return {
            ...state,
            pending: false,
            ['importPayload']: action.payload.result
        };
    }
    else if (isType(action, actions.importData.failed)) {
        return {
            ...state,
            pending: false,
            ['importPayload']: null
        };
    }

    if (isType(action, actions.importDataPrune)) {
        const statePayload = state.importPayload;
        let payload: any = null;
        if ('number' === typeof action.payload.index) {
            const table = statePayload[action.payload.name].find((l: any) => l.Table === action.payload.key);
            const otherTables = statePayload[action.payload.name].filter((l: any) => l.Table !== action.payload.key);

            payload = [
                ...otherTables,
                {
                    Table: table.Table,
                    Columns: table.Columns,
                    Data: table.Data.filter((v: any, i: number) => i !== action.payload.index)
                }
            ];
        }
        else {
            payload = statePayload[action.payload.name].filter((l: any) => l.Name !== action.payload.key);
        }

        return {
            ...state,
            pending: true,
            ['importPayload']: {
                ...statePayload,
                [action.payload.name]: payload
            }
        };
    }

    return state;
};
