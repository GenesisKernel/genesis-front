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
import { getContract } from 'modules/admin/actions';

import DataPreloader from 'components/Animation/DataPreloader';
import Edit, { IEditProps } from 'components/Main/Admin/Contracts/Edit';

export interface IEditContainerProps {
    vde?: boolean;
    match: { params: { contractID: string } };
}

interface IEditContainerState {
    contract: { id: string, active: string, name: string, conditions: string, address: string, value: string };
}

interface IEditContainerDispatch {
    getContract: typeof getContract.started;
}

class EditContainer extends React.Component<IEditContainerProps & IEditContainerState & IEditContainerDispatch> {
    componentWillMount() {
        this.props.getContract({
            id: this.props.match.params.contractID,
            vde: this.props.vde
        });
    }

    render() {
        return (
            <DataPreloader data={[this.props.contract]}>
                <Edit {...this.props} vde={this.props.vde} />
            </DataPreloader>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    contract: state.admin.contract
});

const mapDispatchToProps = {
    getContract: getContract.started
};

export default connect<IEditContainerState, IEditContainerDispatch, IEditContainerProps>(mapStateToProps, mapDispatchToProps)(EditContainer);