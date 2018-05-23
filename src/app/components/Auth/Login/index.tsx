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

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IAccount } from 'genesis/auth';

import AccountList from 'containers/Auth/Login/AccountList';
import RoleList from 'containers/Auth/Login/RoleList';
import PasswordPrompt from 'containers/Auth/Login/PasswordPrompt';

export interface ILoginProps {
    account: IAccount;
    isAuthenticating: boolean;
    isSelectingRole: boolean;
}

const Login: React.SFC<ILoginProps> = props => (
    <div>
        <Switch>
            {props.account && props.isSelectingRole ? <Route path="/" component={RoleList} /> : null}
            {props.account && props.isAuthenticating ? <Route path="/" component={PasswordPrompt} /> : null}
            <Route path="/" component={AccountList} />
        </Switch>
    </div>
);

export default Login;