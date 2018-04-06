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

import RoleList from 'components/Auth/Login/RoleList';
import { logout, selectRole } from 'modules/auth/actions';
import getNotificationsCount from 'modules/socket/reducers/getNotificationsCount';

export interface IAccountListContainerProps {

}

interface IRoleListContainerState {
    account: IAccount;
    roles: {
        id: number;
        name: string;
        notifications: number;
    }[];
}

interface IRoleListContainerDispatch {
    onSubmit: (role: number) => void;
    onCancel: () => void;
}

const mapStateToProps = (state: IRootState) => ({
    account: state.auth.account,
    roles: state.auth.roles.map(r => ({
        ...r,
        notifications: getNotificationsCount(state.socket, {
            account: state.auth.account,
            role: r.id
        })
    }))
});

const mapDispatchToProps = {
    onSubmit: (role: number) => selectRole.started(role),
    onCancel: () => logout.started(null)
};

const AccountListContainer: React.SFC<IAccountListContainerProps & IRoleListContainerState & IRoleListContainerDispatch> = props => (
    <RoleList {...props} />
);

export default connect<IRoleListContainerState, IRoleListContainerDispatch, IAccountListContainerProps>(mapStateToProps, mapDispatchToProps)(AccountListContainer);