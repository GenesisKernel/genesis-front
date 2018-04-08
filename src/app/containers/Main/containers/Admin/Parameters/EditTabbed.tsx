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
import { getParameter } from 'modules/admin/actions';

import Edit from 'components/Main/Admin/Parameters/Edit';

export interface IEditContainerProps {
    parameterName: string;
    tabData?: any;
    // match: { params: { parameterName: string } };
}

interface IEditContainerState {
    // parameter: IParameterResponse;
}

interface IEditContainerDispatch {
    getParameter: typeof getParameter.started;
}

class EditContainer extends React.Component<IEditContainerProps & IEditContainerState & IEditContainerDispatch> {
    componentDidMount() {
        this.props.getParameter({
            name: this.props.parameterName
        });
    }

    render() {
        const parameterTab = this.props.tabData && this.props.tabData['parameter' + this.props.parameterName] || null;
        let parameter = null;
        if (parameterTab) {
            parameter = parameterTab.data;
        }

        return (
            <Edit parameter={parameter} tabView={true} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    // parameter: state.admin.parameter
    tabData: state.admin.tabs && state.admin.tabs.data || null
});

const mapDispatchToProps = {
    getParameter: getParameter.started
};

export default connect<IEditContainerState, IEditContainerDispatch, IEditContainerProps>(mapStateToProps, mapDispatchToProps)(EditContainer);