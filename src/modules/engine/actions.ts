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
import { push } from 'react-router-redux';
import { IInstallParams } from 'lib/api';

const actionCreator = actionCreatorFactory('engine');
export const navigate = (url: string) => push(url);
export const identity = actionCreator.async<void, { uid: string, session: string }, string>('IDENTITY');
export const install = actionCreator.async<IInstallParams, { uid: string, session: string }, string>('INSTALL');
export const setLoading = actionCreator<boolean>('SET_LOADING');