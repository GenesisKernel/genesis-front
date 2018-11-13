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

import { combineEpics } from 'redux-observable';
import loginEpic from './epics/loginEpic';
import logoutEpic from './epics/logoutEpic';
import authorizeEpic from './epics/authorizeEpic';
import createWalletEpic from './epics/createWalletEpic';
import importWalletEpic from './epics/importWalletEpic';
import importSeedEpic from './epics/importSeedEpic';
import generateSeedEpic from './epics/generateSeedEpic';
import authErrorEpic from './epics/authErrorEpic';
import removeWalletEpic from './epics/removeWalletEpic';
import logoutEmptySessionEpic from './epics/logoutEmptySessionEpic';
import changePasswordEpic from './epics/changePasswordEpic';
import importSeedConfirmationEpic from './epics/importSeedConfirmationEpic';
import loadWalletsEpic from './epics/loadWalletsEpic';
import reloadWalletsEpic from './epics/reloadWalletsEpic';
import loadSavedWalletEpic from './epics/loadSavedWalletEpic';
import switchWalletEpic from './epics/switchWalletEpic';
import acquireSessionEpic from './epics/acquireSessionEpic';

export default combineEpics(
    authorizeEpic,
    createWalletEpic,
    generateSeedEpic,
    importWalletEpic,
    importSeedEpic,
    importSeedConfirmationEpic,
    loginEpic,
    authErrorEpic,
    logoutEmptySessionEpic,
    logoutEpic,
    removeWalletEpic,
    loadWalletsEpic,
    loadSavedWalletEpic,
    reloadWalletsEpic,
    changePasswordEpic,
    switchWalletEpic,
    acquireSessionEpic
);