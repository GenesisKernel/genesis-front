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
import { getMenu } from 'modules/admin/actions';

import EditMenu from 'components/Main/Admin/Interface/EditMenu';

export interface IEditMenuContainerProps {
    vde?: boolean;
    name: string;
}

interface IEditMenuContainerState {
    // menu: { id: string, name: string, value: string, conditions: string };
    tabData: any;
}

interface IEditMenuContainerDispatch {
    getMenu: typeof getMenu.started;
}

class EditMenuContainer extends React.Component<IEditMenuContainerProps & IEditMenuContainerState & IEditMenuContainerDispatch> {
    componentWillMount() {
        this.props.getMenu({
            name: this.props.name,
            vde: this.props.vde
        });
    }

    render() {
        const menuTab = this.props.tabData && this.props.tabData['interfaceMenu' + this.props.name + (this.props.vde ? '-vde' : '')] || null;
        let menu = null;
        if (menuTab) {
            menu = menuTab.data;
        }

        return (
            <EditMenu menu={menu} tabView={true} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    tabData: state.admin.tabs && state.admin.tabs.data || null
});

const mapDispatchToProps = {
    getMenu: getMenu.started
};

export default connect<IEditMenuContainerState, IEditMenuContainerDispatch, IEditMenuContainerProps>(mapStateToProps, mapDispatchToProps)(EditMenuContainer);