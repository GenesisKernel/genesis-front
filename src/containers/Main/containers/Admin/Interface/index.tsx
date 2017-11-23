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
import { IRootState } from 'modules';
import { getInterface } from 'modules/admin/actions';
import { IInterfacesResponse } from 'lib/api';

import Interface from 'components/Main/Admin/Interface';

export interface IInterfaceContainerProps {
    vde?: boolean;
}

interface IInterfaceContainerState {
    pages: IInterfacesResponse;
}

interface IInterfaceContainerDispatch {
    getInterface: typeof getInterface.started;
}

class InterfaceContainer extends React.Component<IInterfaceContainerProps & IInterfaceContainerState & IInterfaceContainerDispatch> {
    componentWillMount() {
        this.props.getInterface({
            vde: this.props.vde
        });
    }

    componentWillReceiveProps(props: IInterfaceContainerProps & IInterfaceContainerDispatch) {
        if (this.props.vde !== props.vde) {
            props.getInterface({
                vde: props.vde
            });
        }
    }

    render() {
        return (
            <Interface
                vde={this.props.vde}
                pages={this.props.pages && this.props.pages.pages || []}
                menus={this.props.pages && this.props.pages.menus || []}
                blocks={this.props.pages && this.props.pages.blocks || []}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    pages: state.admin.interfaces
});

const mapDispatchToProps = {
    getInterface: getInterface.started
};

export default connect<IInterfaceContainerState, IInterfaceContainerDispatch, IInterfaceContainerProps>(mapStateToProps, mapDispatchToProps)(InterfaceContainer);