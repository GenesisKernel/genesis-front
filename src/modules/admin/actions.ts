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

import actionCreatorFactory from 'typescript-fsa';
import { IListResponse, ITableResponse, ITablesResponse, IInterfacesResponse, IPageResponse, IContractsResponse, IParameterResponse } from 'lib/api';

const actionCreator = actionCreatorFactory('admin');

// Contracts
export const getContract = actionCreator.async<{ id: string }, { id: string, active: string, name: string, conditions: string, address: string, value: string }, string>('GET_CONTRACT');
export const getContracts = actionCreator.async<{ offset?: number, limit?: number }, IContractsResponse, string>('GET_CONTRACTS');

// Tables
export const getTable = actionCreator.async<{ table: string }, { table: ITableResponse, data: IListResponse }, string>('GET_TABLE');
export const getTableStruct = actionCreator.async<{ name: string }, ITableResponse, string>('GET_TABLE_STRUCT');
export const getTables = actionCreator.async<{ offset?: number, limit?: number }, ITablesResponse, string>('GET_TABLES');

// Pages
export const getPage = actionCreator.async<{ id: string }, IPageResponse, string>('GET_PAGE');
export const getInterface = actionCreator.async<undefined, IInterfacesResponse, string>('GET_INTERFACE');

// Menus
export const getMenu = actionCreator.async<{ id: string }, { id: string, name: string, value: string, conditions: string }, string>('GET_MENU');
export const getMenus = actionCreator.async<undefined, { id: string, name: string, conditions: string, value: string }[], string>('GET_MENUS');

// Blocks
export const getBlock = actionCreator.async<{ id: string }, { id: string, name: string, value: string, conditions: string }, string>('GET_BLOCK');

// Parameters
export const getParameter = actionCreator.async<{ name: string }, IParameterResponse, string>('GET_PARAMETER');
export const getParameters = actionCreator.async<{ params?: string[] }, IParameterResponse[], string>('GET_PARAMETERS');

// Languages
export const getLanguage = actionCreator.async<{ id: string }, { id: string, res: any, name: string, conditions: string }, string>('GET_LANGUAGE');
export const getLanguages = actionCreator.async<{ offset?: number, limit?: number }, { id: string, res: any, name: string, conditions: string }[], string>('GET_LANGUAGES');

// Import/export
export const exportData = actionCreator.async<{ pages: string[], blocks: string[], menus: string[], parameters: string[], languages: string[], contracts: { id: string, name: string }[], tables: string[], data: string[] }, object, string>('EXPORT_DATA');
export const importData = actionCreator.async<File, any, undefined>('IMPORT_DATA');
export const importDataPrune = actionCreator<{ name: string, key: string, index?: number }>('IMPORT_DATA_PRUNE');

// Constructor
export const loadTabList = actionCreator<{ addID?: string, addType?: string}>('LOAD_TAB_LIST');
export const addTabList = actionCreator<{ id: string, type: string }>('ADD_TAB_LIST');
export const removeTabList = actionCreator<{ id: string, type: string}>('REMOVE_TAB_LIST');
