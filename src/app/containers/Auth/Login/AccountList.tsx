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