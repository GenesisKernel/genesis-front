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
import { IListResponse, ITableResponse, ITablesResponse, IPagesResponse, IPageResponse, IContractsResponse } from 'lib/api';

const actionCreator = actionCreatorFactory('admin');

// Contracts
export const activateContract = actionCreator.async<{ session: string, privateKey: string, publicKey: string, id: string }, string, string>('ACTIVATE_CONTRACT');
export const getContract = actionCreator.async<{ session: string, id: string }, { id: string, active: string, name: string, conditions: string, address: string, value: string }, string>('GET_CONTRACT');
export const getContracts = actionCreator.async<{ session: string, offset?: number, limit?: number }, IContractsResponse, string>('GET_CONTRACTS');
export const createContract = actionCreator.async<{ session: string, privateKey: string, publicKey: string, code: string, wallet: string, conditions: string }, string, string>('CREATE_CONTRACT');
export const editContract = actionCreator.async<{ session: string, privateKey: string, publicKey: string, id: string, code: string, conditions: string }, string, string>('EDIT_CONTRACT');

// Tables
export const getTable = actionCreator.async<{ session: string, table: string }, { table: ITableResponse, data: IListResponse }, string>('GET_TABLE');
export const getTables = actionCreator.async<{ session: string, offset?: number, limit?: number }, ITablesResponse, string>('GET_TABLES');
export const createTable = actionCreator.async<{ session: string, table: string }, string, string>('CREATE_TABLE');

// Pages
export const getPage = actionCreator.async<{ session: string, id: string }, IPageResponse, string>('GET_PAGE');
export const getPages = actionCreator.async<{ session: string }, IPagesResponse, string>('GET_PAGES');
export const createPage = actionCreator.async<{ session: string, privateKey: string, publicKey: string, name: string, template: string, conditions: string, menu: string }, string, string>('CREATE_PAGE');
export const editPage = actionCreator.async<{ session: string, privateKey: string, publicKey: string, id: string, template: string, conditions: string, menu: string }, string, string>('EDIT_PAGE');

// Menus
export const getMenu = actionCreator.async<{ session: string, id: string }, { id: string, name: string, value: string, conditions: string }, string>('GET_MENU');
export const getMenus = actionCreator.async<{ session: string }, { id: string, name: string, conditions: string, value: string }[], string>('GET_MENUS');
export const createMenu = actionCreator.async<{ session: string, privateKey: string, publicKey: string, name: string, template: string, conditions: string }, string, string>('CREATE_MENU');
export const editMenu = actionCreator.async<{ session: string, privateKey: string, publicKey: string, id: string, template: string, conditions: string }, string, string>('EDIT_MENU');