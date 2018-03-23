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
import { getParameters } from 'modules/admin/actions';
import { IParameterResponse } from 'lib/api';

import DataPreloader from 'components/Animation/DataPreloader';
import Parameters from 'components/Main/Admin/Parameters';

export interface IParametersContainerProps {

}

interface IParametersContainerState {
    parameters: IParameterResponse[];
}

interface IParametersContainerDispatch {
    getParameters: typeof getParameters.started;
}

class ParametersContainer extends React.Component<IParametersContainerProps & IParametersContainerState & IParametersContainerDispatch> {
    componentDidMount() {
        this.props.getParameters({});
    }

    render() {
        return (
            <DataPreloader data={[this.props.parameters]}>
                <Parameters parameters={this.props.parameters} />
            </DataPreloader>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    parameters: state.admin.parameters
});

const mapDispatchToProps = {
    getParameters: getParameters.started
};

export default connect<IParametersContainerState, IParametersContainerDispatch, IParametersContainerProps>(mapStateToProps, mapDispatchToProps)(ParametersContainer);