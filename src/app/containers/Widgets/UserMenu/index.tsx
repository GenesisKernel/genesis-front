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
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { IStoredKey } from 'lib/storage';
import { logout, switchEcosystem } from 'modules/auth/actions';

import UserMenu from 'components/Main//UserMenu';

interface IUserMenuContainerProps {
    collapsed: boolean;
    onToggleCollapsed: () => void;
}

interface IUserMenuContainerState {
    account: IStoredKey;
    ecosystem: string;
}

interface IUserMenuContainerDispatch {
    logout: typeof logout.started;
    switchEcosystem: typeof switchEcosystem.started;
}

const UserMenuContainer: React.SFC<IUserMenuContainerProps & IUserMenuContainerState & IUserMenuContainerDispatch> = (props) => (
    <UserMenu
        collapsed={props.collapsed}
        account={props.account}
        ecosystem={props.ecosystem}
        onToggleCollapsed={props.onToggleCollapsed}
        onLogout={() => props.logout(null)}
        onSwitchEcosystem={ecosystem => props.switchEcosystem(ecosystem)}
    />
);

const mapStateToProps = (state: IRootState) => ({
    account: state.auth.account,
    ecosystem: state.auth.ecosystem
});

const mapDispatchToProps = {
    logout: logout.started,
    switchEcosystem: switchEcosystem.started
};

export default connect<IUserMenuContainerState, IUserMenuContainerDispatch, IUserMenuContainerProps>(mapStateToProps, mapDispatchToProps)(UserMenuContainer);