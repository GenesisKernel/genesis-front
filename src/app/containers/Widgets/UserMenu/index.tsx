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
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { logout, selectAccount } from 'modules/auth/actions';
import { IAccount } from 'genesis/auth';

import UserMenu from 'components/Main//UserMenu';

export interface IUserMenuContainerProps {

}

interface IUserMenuContainerState {
    account: IAccount;
    ecosystemAccounts: IAccount[];
}

interface IUserMenuContainerDispatch {
    logout: typeof logout.started;
    selectAccount: typeof selectAccount;
}

const UserMenuContainer: React.SFC<IUserMenuContainerProps & IUserMenuContainerState & IUserMenuContainerDispatch> = (props) => (
    <UserMenu
        account={props.account}
        ecosystemAccounts={props.ecosystemAccounts}
        logout={() => props.logout({})}
        switchAccount={props.selectAccount}
    />
);

const mapStateToProps = (state: IRootState) => ({
    account: state.auth.account,
    ecosystemAccounts: state.auth.account ?
        state.storage.accounts.filter(l =>
            l.id === state.auth.account.id
        ).sort((a, b) => parseInt(a.ecosystem, 10) - parseInt(b.ecosystem, 10)) : [],
    ecosystem: state.auth.ecosystem
});

const mapDispatchToProps = {
    logout: logout.started,
    selectAccount: selectAccount
};

export default connect<IUserMenuContainerState, IUserMenuContainerDispatch, IUserMenuContainerProps>(mapStateToProps, mapDispatchToProps)(UserMenuContainer);