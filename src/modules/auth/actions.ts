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
import { IStoredKey } from 'lib/storage';

const actionCreator = actionCreatorFactory('auth');
export const login = actionCreator.async<{ privateKey: string, publicKey: string, remember: boolean }, ILoginResponse & { account: IStoredKey, privateKey: string }, string>('LOGIN');
export const setAction = actionCreator<string>('SET_ACTION');
export const importSeed = actionCreator.async<Blob, string, undefined>('IMPORT_SEED');
export const createAccount = actionCreator.async<{ privateKey: string, publicKey: string, password: string }, { id: string, address: string, privateKey: string, publicKey: string, password: string }, undefined>('CREATE_ACCOUNT');
export const clearCreatedAccount = actionCreator('CLEAR_CREATED_ACCOUNT');
export const refreshSession = actionCreator.async<undefined, { token: string, refresh: string }, string>('REFRESH_SESSION');