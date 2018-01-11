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

import * as React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'modules/engine/actions';
import { login, logout, selectAccount } from 'modules/auth/actions';
import { alertShow } from 'modules/content/actions';
import { removeAccount } from 'modules/storage/actions';
import { IStoredAccount } from 'apla/storage';

import Login, { ILoginProps } from 'components/General/Login';
import { IRootState } from 'modules';

export interface ILoginContainerProps {

}

interface ILoginContainerState {
    isLoggingIn: boolean;
    account: IStoredAccount;
    accounts: IStoredAccount[];
    alert: { id: string, success: string, error: string };
    defaultAccount: string;
}

interface ILoginContainerDispatch {
    selectAccount: typeof selectAccount;
    removeAccount: typeof removeAccount;
    navigate: typeof navigate;
    login: typeof login.started;
    logout: typeof logout.started;
    alertShow: typeof alertShow;
}

const LoginContainer: React.SFC<ILoginProps & ILoginContainerState & ILoginContainerDispatch> = (props) => (
    <Login {...props} intl={null} />
);

const mapStateToProps = (state: IRootState) => ({
    isLoggingIn: state.auth.isLoggingIn,
    authenticationError: state.auth.authenticationError,
    account: state.auth.account,
    accounts: state.storage.accounts,
    alert: state.content.alert,
    defaultAccount: state.auth.defaultAccount
});

const mapDispatchToProps = {
    removeAccount,
    selectAccount: selectAccount.started,
    logout: logout.started,
    navigate,
    login: login.started,
    alertShow
};

export default connect<ILoginContainerState, ILoginContainerDispatch, ILoginContainerProps>(mapStateToProps, mapDispatchToProps)(LoginContainer);