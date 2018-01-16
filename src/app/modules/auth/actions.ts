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
import { ILoginResponse } from 'lib/api';
import { IStoredAccount } from 'apla/storage';

const actionCreator = actionCreatorFactory('auth');
export const selectAccount = actionCreator.async<{ account: IStoredAccount }, { sessionToken: string, refreshToken: string }, string>('SELECT_ACCOUNT');
export const authorizeAccount = actionCreator<{ account: IStoredAccount }>('AUTHORIZE_ACCOUNT');
export const login = actionCreator.async<{ encKey: string, ecosystem: string, password: string }, ILoginResponse & { account: IStoredAccount, privateKey: string, publicKey: string }, string>('LOGIN');
export const logout = actionCreator.async('LOGOUT');
export const createEcosystem = actionCreator<{ name: string, id: string }>('CREATE_ECOSYSTEM');
export const setAction = actionCreator<string>('SET_ACTION');
export const importSeed = actionCreator.async<Blob, string, undefined>('IMPORT_SEED');
export const importAccount = actionCreator.async<{ backup: string, password: string, isDefault?: boolean }, IStoredAccount[], string>('IMPORT_ACCOUNT');
export const createAccount = actionCreator.async<{ seed: string, password: string }, IStoredAccount, string>('CREATE_ACCOUNT');
export const authorize = actionCreator<{ privateKey: string }>('AUTHORIZE');
export const deauthorize = actionCreator<void>('DEAUTHORIZE');