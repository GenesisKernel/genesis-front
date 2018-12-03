// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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
import { IWallet, ILoginCall, ISession, IAccountContext } from 'apla/auth';
import { ICreateWalletCall, IImportWalletCall } from 'apla/auth';
import { IAccount } from 'apla/api';

const actionCreator = actionCreatorFactory('auth');
export const login = actionCreator.async<ILoginCall, { privateKey: string, publicKey: string, session: ISession }, string>('LOGIN');
export const loginGuest = actionCreator.async<void, { privateKey: string, publicKey: string, wallet: IAccountContext, session: ISession }, string>('LOGIN_GUEST');
export const logout = actionCreator.async('LOGOUT');
export const inviteEcosystem = actionCreator<{ ecosystem: string, redirectPage?: string }>('INVITE_ECOSYSTEM');
export const generateSeed = actionCreator.async<void, string>('GENERATE_SEED');
export const importSeed = actionCreator.async<Blob, string>('IMPORT_SEED');
export const importSeedConfirmation = actionCreator.async<Blob, string>('IMPORT_SEED_CONFIRMATION');
export const changeSeed = actionCreator<string>('CHANGE_SEED');
export const changeSeedConfirmation = actionCreator<string>('CHANGE_SEED_CONFIRMATION');
export const createWallet = actionCreator.async<ICreateWalletCall, IWallet, string>('CREATE_WALLET');
export const importWallet = actionCreator.async<IImportWalletCall, IWallet, string>('IMPORT_WALLET');
export const removeWallet = actionCreator<IWallet>('REMOVE_WALLET');
export const selectWallet = actionCreator<IAccountContext>('SELECT_WALLET');
export const switchWallet = actionCreator<{ ecosystem: string, role: string }>('SWITCH_WALLET');
export const authorize = actionCreator<string>('AUTHORIZE');
export const deauthorize = actionCreator('DEAUTHORIZE');
export const changePassword = actionCreator.async<void, { oldPassword: string, newPassword: string }, string>('CHANGE_PASSWORD');
export const loadWallets = actionCreator.async<void, IAccount[]>('LOAD_WALLETS');
export const loadWallet = actionCreator<IAccount>('LOAD_WALLET');