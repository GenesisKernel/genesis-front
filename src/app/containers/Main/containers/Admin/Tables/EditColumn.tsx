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
import { getTableStruct } from 'modules/admin/actions';
import { ITableResponse } from 'lib/api';

import EditColumn from 'components/Main/Admin/Tables/EditColumn';

export interface IEditColumnContainerProps {
    vde?: boolean;
    table: string;
    column: string;
}

interface IEditColumnContainerState {
    tableStruct: ITableResponse;
}

interface IEditColumnContainerDispatch {
    getTableStruct: typeof getTableStruct.started;
}

class EditColumnContainer extends React.Component<IEditColumnContainerProps & IEditColumnContainerState & IEditColumnContainerDispatch> {
    componentDidMount() {
        this.props.getTableStruct({
            name: this.props.table,
            vde: this.props.vde
        });
    }

    componentWillReceiveProps(props: IEditColumnContainerProps & IEditColumnContainerState & IEditColumnContainerDispatch) {
        if (this.props.table !== props.table || this.props.vde !== props.vde) {
            props.getTableStruct({
                name: props.table,
                vde: props.vde
            });
        }
    }

    render() {
        const column = this.props.tableStruct && this.props.tableStruct.columns.find(l => l.name === this.props.column);
        return (
            <EditColumn
                {...this.props}
                column={column && {
                    name: column.name,
                    type: column.type,
                    permissions: column.perm,
                    index: '1' === column.index
                }}
            />
        );
    }
}

const mapStateToProps = (state: IRootState, ownProps: IEditColumnContainerProps) => ownProps.vde ? ({
    tableStruct: state.admin.vde_table
}) : ({
    tableStruct: state.admin.table
});

const mapDispatchToProps = {
    getTableStruct: getTableStruct.started
};

export default connect<IEditColumnContainerState, IEditColumnContainerDispatch, IEditColumnContainerProps>(mapStateToProps, mapDispatchToProps)(EditColumnContainer);