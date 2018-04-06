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

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IAccount } from 'genesis/auth';

import AccountList from 'containers/Auth/Login/AccountList';
import PasswordPrompt from 'containers/Auth/Login/PasswordPrompt';

export interface ILoginProps {
    account: IAccount;
}

const Login: React.SFC<ILoginProps> = props => (
    <div>
        <Switch>
            {props.account && (<Route path="/" component={PasswordPrompt} />)}
            <Route path="/" component={AccountList} />
        </Switch>
    </div>
);

export default Login;