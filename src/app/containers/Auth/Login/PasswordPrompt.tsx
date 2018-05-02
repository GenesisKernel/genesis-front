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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IAccount } from 'genesis/auth';

import PasswordPrompt from 'components/Auth/Login/PasswordPrompt';
import { logout, login } from 'modules/auth/actions';

export interface IPasswordPromptContainerProps {

}

interface IPasswordPromptContainerState {
    account: IAccount;
}

interface IPasswordPromptContainerDispatch {
    onSubmit: (params: { account: IAccount, password: string }) => void;
    onCancel: () => void;
}

const mapStateToProps = (state: IRootState) => ({
    account: state.auth.account
});

const mapDispatchToProps = {
    onCancel: () => logout.started(null),
    onSubmit: (params: { account: IAccount, password: string }) => login.started(params)
};

const PasswordPromptContainer: React.SFC<IPasswordPromptContainerProps & IPasswordPromptContainerState & IPasswordPromptContainerDispatch> = props => (
    <PasswordPrompt {...props} />
);

export default connect<IPasswordPromptContainerState, IPasswordPromptContainerDispatch, IPasswordPromptContainerProps>(mapStateToProps, mapDispatchToProps)(PasswordPromptContainer);