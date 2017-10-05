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
import { IListResponse, ITableResponse, ITablesResponse, IPagesResponse } from 'lib/api';

export type State = {
    readonly pending: boolean;
    readonly tables: ITablesResponse;
    readonly table: ITableResponse;
    readonly tableData: IListResponse;
    readonly pages: IPagesResponse;
};

export const initialState: State = {
    pending: false,
    tables: null,
    table: null,
    tableData: null,
    pages: null
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.getPages.started)) {
        return {
            ...state,
            pending: true,
            pages: null
        };
    }

    if (isType(action, actions.getPages.done)) {
        return {
            ...state,
            pending: false,
            pages: action.payload.result
        }
    }

    if (isType(action, actions.getPages.failed)) {
        return {
            ...state,
            pending: false,
            pages: null
        };
    }

    if (isType(action, actions.getTables.started)) {
        return {
            ...state,
            pending: true,
            tables: null
        };
    }

    if (isType(action, actions.getTables.done)) {
        return {
            ...state,
            pending: false,
            tables: action.payload.result
        }
    }

    if (isType(action, actions.getTables.failed)) {
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

    if (isType(action, actions.getTable.done)) {
        return {
            ...state,
            pending: false,
            table: action.payload.result.table,
            tableData: action.payload.result.data
        }
    }

    if (isType(action, actions.getTable.failed)) {
        return {
            ...state,
            pending: false,
            table: null,
            tableData: null
        };
    }

    return state;
};