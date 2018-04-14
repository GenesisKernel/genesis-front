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
import { login, selectAccount, removeAccount } from 'modules/auth/actions';
import { navigate } from 'modules/engine/actions';

import AccountList from 'components/Auth/Login/AccountList';

export interface IAccountListContainerProps {

}

interface IAccountListContainerState {
    pending: boolean;
    account: IAccount;
    accounts: {
        account: IAccount;
        notifications: number;
    }[];
}

interface IAccountListContainerDispatch {
    onCreate: () => void;
    onRemove: typeof removeAccount;
    onSelect: typeof selectAccount;
    onLogin: typeof login.started;
}

const mapStateToProps = (state: IRootState) => ({
    pending: state.auth.isLoggingIn,
    account: state.auth.account,
    accounts: state.storage.accounts.map(account => ({
        account,
        notifications: state.socket.notifications
            .filter(notification =>
                notification.id === account.id &&
                notification.ecosystem === account.ecosystem
            )
            .map(l => l.count)
            .concat(0)
            .reduce((a, b) => a + b)
    }))
});

const mapDispatchToProps = {
    onRemove: removeAccount,
    onLogin: login.started,
    onSelect: selectAccount,
    onCreate: () => navigate('/account')
};

const AccountListContainer: React.SFC<IAccountListContainerProps & IAccountListContainerState & IAccountListContainerDispatch> = props => (
    <AccountList {...props} />
);

export default connect<IAccountListContainerState, IAccountListContainerDispatch, IAccountListContainerProps>(mapStateToProps, mapDispatchToProps)(AccountListContainer);