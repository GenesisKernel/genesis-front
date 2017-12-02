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
import { getParameter } from 'modules/admin/actions';
import { IParameterResponse } from 'lib/api';

import DataPreloader from 'components/Animation/DataPreloader';
import Edit, { IEditProps } from 'components/Main/Admin/Parameters/Edit';

export interface IEditContainerProps {
    vde?: boolean;
    match: { params: { parameterName: string } };
}

interface IEditContainerState {
    parameter: IParameterResponse;
}

interface IEditContainerDispatch {
    getParameter: typeof getParameter.started;
}

class EditContainer extends React.Component<IEditContainerProps & IEditContainerState & IEditContainerDispatch> {
    componentDidMount() {
        this.props.getParameter({
            name: this.props.match.params.parameterName,
            vde: this.props.vde
        });
    }

    render() {
        return (
            <DataPreloader data={[this.props.parameter]}>
                <Edit parameter={this.props.parameter} vde={this.props.vde} />
            </DataPreloader>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    parameter: state.admin.parameter
});

const mapDispatchToProps = {
    getParameter: getParameter.started
};

export default connect<IEditContainerState, IEditContainerDispatch, IEditContainerProps>(mapStateToProps, mapDispatchToProps)(EditContainer);