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

import { State } from '../reducer';
import { Success } from 'typescript-fsa';
import { ILoginCall, IRole } from 'genesis/auth';
import { IAccount } from 'genesis/auth';

export default function (state: State, payload: Success<ILoginCall, { account: IAccount, roles: IRole[], privateKey: string, publicKey: string }>): State {
    const hasRoles = !!(payload.result.roles && payload.result.roles.length);
    return {
        ...state,
        isAuthenticated: !hasRoles,
        isLoggingIn: hasRoles,
        account: payload.result.account,
        roles: payload.result.roles,
        ecosystem: payload.result.account.ecosystem,
        sessionToken: payload.result.account.sessionToken,
        refreshToken: payload.result.account.refreshToken,
        privateKey: payload.result.privateKey,
        socketToken: payload.result.account.socketToken,
        timestamp: payload.result.account.timestamp,
        id: payload.result.account.id
    };
}