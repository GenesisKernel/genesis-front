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
import { navigate } from 'modules/engine/actions';
import { login, logout, selectAccount } from 'modules/auth/actions';
import { modalShow } from 'modules/modal/actions';
import { removeAccount } from 'modules/storage/actions';
import { IStoredAccount } from 'genesis/storage';
import { INotificationsMessage } from 'genesis/socket';
import { IRootState } from 'modules';

import Login from 'components/General/Login';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { IModalResult } from 'genesis/modal';

export interface ILoginContainerProps {

}

interface ILoginContainerState {
    isLoggingIn: boolean;
    authenticationError: string;
    account: IStoredAccount;
    accounts: IStoredAccount[];
    notifications: INotificationsMessage[];
    modalResult: IModalResult;
    defaultAccount: string;
}

interface ILoginContainerDispatch {
    selectAccount: typeof selectAccount.started;
    removeAccount: typeof removeAccount;
    navigate: typeof navigate;
    login: typeof login.started;
    logout: typeof logout.started;
    modalShow: typeof modalShow;
}

class LoginContainer extends React.Component<ILoginContainerProps & ILoginContainerState & ILoginContainerDispatch & InjectedIntlProps> {
    private _pendingRemove: IStoredAccount = null;

    componentWillReceiveProps(props: ILoginContainerProps & ILoginContainerState & ILoginContainerDispatch & InjectedIntlProps) {
        if (this._pendingRemove && props.modalResult && 'RESULT' === props.modalResult.reason && props.modalResult.data) {
            this.props.removeAccount(this._pendingRemove);
            this._pendingRemove = null;
        }
    }

    onError = (value: string) => this.props.modalShow({
        id: 'AUTH_ERROR',
        type: 'ERROR',
        params: {
            value
        }
    })

    onAccountRemove = (account: IStoredAccount) => {
        this._pendingRemove = account;
        this.props.modalShow({
            id: 'AUTH_REMOVE_ACCOUNT',
            type: 'CONFIRM',
            params: {
                description: this.props.intl.formatMessage({
                    id: 'auth.remove.desc',
                    defaultMessage: 'Do you really want to delete this account? THIS ACTION IS IRREVERSIBLE'
                })
            }
        });
    }

    render() {
        return (
            <Login
                isLoggingIn={this.props.isLoggingIn}
                authenticationError={this.props.authenticationError}
                account={this.props.account}
                accounts={this.props.accounts}
                notifications={this.props.notifications}
                defaultAccount={this.props.defaultAccount}
                selectAccount={this.props.selectAccount}
                onAccountRemove={this.onAccountRemove}
                navigate={this.props.navigate}
                login={this.props.login}
                logout={this.props.logout}
                onError={this.onError}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    isLoggingIn: state.auth.isLoggingIn,
    authenticationError: state.auth.authenticationError,
    account: state.auth.account,
    accounts: state.storage.accounts,
    notifications: state.socket.notifications,
    defaultAccount: state.auth.defaultAccount,
    modalResult: state.modal.result
});

const mapDispatchToProps = {
    removeAccount,
    selectAccount: selectAccount.started,
    logout: logout.started,
    navigate,
    login: login.started,
    modalShow
};

export default connect<ILoginContainerState, ILoginContainerDispatch, ILoginContainerProps>(mapStateToProps, mapDispatchToProps)(injectIntl(LoginContainer));