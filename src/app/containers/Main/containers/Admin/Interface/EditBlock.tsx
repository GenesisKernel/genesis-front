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
import { getBlock } from 'modules/admin/actions';

import EditBlock from 'components/Main/Admin/Interface/EditBlock';

export interface IEditBlockContainerProps {
    vde?: boolean;
    blockID: string;
}

interface IEditBlockContainerState {
    block: { id: string, name: string, value: string, conditions: string };
}

interface IEditBlockContainerDispatch {
    getBlock: typeof getBlock.started;
}

class EditBlockContainer extends React.Component<IEditBlockContainerProps & IEditBlockContainerState & IEditBlockContainerDispatch> {
    componentDidMount() {
        this.props.getBlock({
            id: this.props.blockID,
            vde: this.props.vde
        });
    }

    componentWillReceiveProps(props: IEditBlockContainerProps & IEditBlockContainerState & IEditBlockContainerDispatch) {
        if (this.props.blockID !== props.blockID || this.props.vde !== props.vde) {
            props.getBlock({
                id: props.blockID,
                vde: props.vde
            });
        }
    }

    render() {
        return (
            <EditBlock {...this.props} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    block: state.admin.block
});

const mapDispatchToProps = {
    getBlock: getBlock.started
};

export default connect<IEditBlockContainerState, IEditBlockContainerDispatch, IEditBlockContainerProps>(mapStateToProps, mapDispatchToProps)(EditBlockContainer);