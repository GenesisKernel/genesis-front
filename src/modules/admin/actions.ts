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
import { IListResponse, ITableResponse, ITablesResponse, IInterfacesResponse, IPageResponse, IContractsResponse, IParameterResponse, ITabListResponse } from 'lib/api';

const actionCreator = actionCreatorFactory('admin');

// Contracts
export const getContract = actionCreator.async<{ id: string, vde?: boolean }, { id: string, active: string, name: string, conditions: string, address: string, value: string }, string>('GET_CONTRACT');
export const getContracts = actionCreator.async<{ vde?: boolean, offset?: number, limit?: number }, IContractsResponse, string>('GET_CONTRACTS');

// Tables
export const getTable = actionCreator.async<{ table: string, vde?: boolean }, { table: ITableResponse, data: IListResponse }, string>('GET_TABLE');
export const getTableStruct = actionCreator.async<{ name: string, vde?: boolean }, ITableResponse, string>('GET_TABLE_STRUCT');
export const getTables = actionCreator.async<{ offset?: number, limit?: number, vde?: boolean }, ITablesResponse, string>('GET_TABLES');

// Pages
export const getPage = actionCreator.async<{ id: string, vde?: boolean }, IPageResponse, string>('GET_PAGE');
export const getInterface = actionCreator.async<{ vde?: boolean }, IInterfacesResponse, string>('GET_INTERFACE');

// Constructor

export const getPageTreeCode = actionCreator.async<{ code: string, vde?: boolean }, { pageTreeCode: any }, string>('GET_PAGE_TREE_CODE');
export const changePage = actionCreator<{ text: string, tag_id: string }>('CHANGE_PAGE');
export const selectTag = actionCreator<{ tag_id: string }>('SELECT_TAG');

// Menus
export const getMenu = actionCreator.async<{ id: string, vde?: boolean }, { id: string, name: string, value: string, conditions: string }, string>('GET_MENU');
export const getMenus = actionCreator.async<{ vde?: boolean }, { id: string, name: string, conditions: string, value: string }[], string>('GET_MENUS');

// Blocks
export const getBlock = actionCreator.async<{ id: string, vde?: boolean; }, { id: string, name: string, value: string, conditions: string }, string>('GET_BLOCK');

// Parameters
export const getParameter = actionCreator.async<{ name: string, vde?: boolean }, IParameterResponse, string>('GET_PARAMETER');
export const getParameters = actionCreator.async<{ params?: string[], vde?: boolean }, IParameterResponse[], string>('GET_PARAMETERS');

// Languages
export const getLanguage = actionCreator.async<{ id: string }, { id: string, res: any, name: string, conditions: string }, string>('GET_LANGUAGE');
export const getLanguages = actionCreator.async<{ vde?: boolean, offset?: number, limit?: number }, { id: string, res: any, name: string, conditions: string }[], string>('GET_LANGUAGES');

// Import/export
export const exportData = actionCreator.async<{ pages: string[], blocks: string[], menus: string[], parameters: string[], languages: string[], contracts: { id: string, name: string }[], tables: string[], data: string[] }, object, string>('EXPORT_DATA');
export const importData = actionCreator.async<File, any, undefined>('IMPORT_DATA');
export const importDataPrune = actionCreator<{ name: string, key: string, index?: number }>('IMPORT_DATA_PRUNE');

// Tabs
export const getTabList = actionCreator.async<{ addID?: string, addName?: string, addType?: string}, ITabListResponse, string>('GET_TAB_LIST');
export const removeTabList = actionCreator.async<{ id: string, type: string}, any, string>('REMOVE_TAB_LIST');
