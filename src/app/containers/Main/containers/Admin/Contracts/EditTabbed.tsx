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
import { getContract } from 'modules/admin/actions';

import Edit from 'components/Main/Admin/Contracts/Edit';

export interface IEditProps {
    vde?: boolean;
    name: string;
    tabData: any;
    contract?: {
        id: string;
        active: string;
        name: string;
        conditions: string;
        address: string;
        value: string;
    };
    getContract?: typeof getContract.started;
}

class EditContainer extends React.Component<IEditProps> {
    componentWillMount() {
        this.props.getContract({
            id: this.props.contract.id,
            name: this.props.contract.name,
            vde: this.props.vde
        });
    }

    componentWillReceiveProps(props: IEditProps) {
        if (this.props.name !== props.name) {
            props.getContract({
                id: props.contract.id,
                name: props.contract.name,
                vde: props.vde
            });
        }
    }

    render() {
        const contractTab = this.props.tabData && this.props.tabData['contract' + this.props.name + (this.props.vde ? '-vde' : '')] || null;
        let contract = null;
        if (contractTab) {
            contract = contractTab.data;
        }
        return (
            <Edit getContract={this.props.getContract} contract={contract} tabView={true} vde={this.props.vde} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    // contract: state.admin.contract,
    tabData: state.admin.tabs && state.admin.tabs.data || null
});

const mapDispatchToProps = {
    getContract: getContract.started
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);