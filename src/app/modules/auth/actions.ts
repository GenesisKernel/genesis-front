// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import actionCreatorFactory from 'typescript-fsa';
import { IAccount, ILoginCall, IRole, ISession } from 'genesis/auth';
import { ICreateAccountCall, IImportAccountCall } from 'genesis/auth';

const actionCreator = actionCreatorFactory('auth');
export const login = actionCreator.async<ILoginCall, { account: IAccount, roles: IRole[], privateKey: string, publicKey: string, session: ISession }, string>('LOGIN');
export const logout = actionCreator.async('LOGOUT');
export const inviteEcosystem = actionCreator<{ ecosystem: string, redirectPage?: string }>('INVITE_ECOSYSTEM');
export const generateSeed = actionCreator.async<void, string>('GENERATE_SEED');
export const importSeed = actionCreator.async<Blob, string, undefined>('IMPORT_SEED');
export const createAccount = actionCreator.async<ICreateAccountCall, IAccount, string>('CREATE_ACCOUNT');
export const importAccount = actionCreator.async<IImportAccountCall, IAccount[], string>('IMPORT_ACCOUNT');
export const removeAccount = actionCreator<IAccount>('REMOVE_ACCOUNT');
export const selectAccount = actionCreator<IAccount>('SELECT_ACCOUNT');
export const selectRole = actionCreator.async<number, { sessionToken: string, refreshToken: string }>('SELECT_ROLE');
export const authorize = actionCreator<string>('AUTHORIZE');
export const deauthorize = actionCreator('DEAUTHORIZE');