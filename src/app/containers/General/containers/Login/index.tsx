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
import { login } from 'modules/auth/actions';
import { alertShow } from 'modules/content/actions';
import { IStoredKey } from 'lib/storage';

import Login, { ILoginProps } from 'components/General/Login';
import { IRootState } from 'modules';

export interface ILoginContainerProps {

}

interface ILoginContainerState {
    alert: { id: string, success: string, error: string };
    isImportingAccount: boolean;
    defaultAccount: IStoredKey;
}

interface ILoginContainerDispatch {
    navigate: typeof navigate;
    login: typeof login.started;
    alertShow: typeof alertShow;
}

const LoginContainer: React.SFC<ILoginProps & ILoginContainerState & ILoginContainerDispatch> = (props) => (
    <Login {...props} intl={null} />
);

const mapStateToProps = (state: IRootState) => ({
    alert: state.content.alert,
    isImportingAccount: state.auth.isImportingAccount,
    defaultAccount: state.auth.defaultAccount
});

const mapDispatchToProps = {
    navigate,
    login: login.started,
    alertShow
};

export default connect<ILoginContainerState, ILoginContainerDispatch, ILoginContainerProps>(mapStateToProps, mapDispatchToProps)(LoginContainer);