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

import { combineEpics } from 'redux-observable';
import loginEpic from './epics/loginEpic';
import logoutEpic from './epics/logoutEpic';
import authorizeEpic from './epics/authorizeEpic';
import createAccountEpic from './epics/createAccountEpic';
import importAccountEpic from './epics/importAccountEpic';
import importSeedEpic from './epics/importSeedEpic';
import generateSeedEpic from './epics/generateSeedEpic';
import authErrorEpic from './epics/authErrorEpic';
import removeAccountEpic from './epics/removeAccountEpic';
import selectRoleEpic from './epics/selectRoleEpic';
import logoutEmptySessionEpic from './epics/logoutEmptySessionEpic';
import inviteEcosystemEpic from './epics/inviteEcosystemEpic';

export default combineEpics(
    authorizeEpic,
    createAccountEpic,
    generateSeedEpic,
    importAccountEpic,
    importSeedEpic,
    loginEpic,
    authErrorEpic,
    logoutEmptySessionEpic,
    logoutEpic,
    removeAccountEpic,
    selectRoleEpic,
    inviteEcosystemEpic
);