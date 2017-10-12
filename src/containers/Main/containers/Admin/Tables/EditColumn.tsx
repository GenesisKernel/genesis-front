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
import { editColumn, getTableStruct } from 'modules/admin/actions';

import EditColumn, { IEditColumnProps } from 'components/Main/Admin/Tables/EditColumn';

class EditColumnContainer extends React.Component<IEditColumnProps & { getTableStruct: typeof getTableStruct.started, match: { params: { tableName: string, columnName: string } } }> {
    componentWillMount() {
        this.props.getTableStruct({
            session: this.props.session,
            table: this.props.match.params.tableName
        });
    }

    render() {
        const column = this.props.table && this.props.table.columns.find(l => l.name === this.props.match.params.columnName);
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

const mapStateToProps = (state: IRootState) => ({
    session: state.auth.sessionToken,
    privateKey: state.auth.privateKey,
    publicKey: state.auth.account.publicKey,
    pending: state.admin.pending,
    table: state.admin.table,
    editColumnStatus: state.admin.editColumnStatus
});

const mapDispatchToProps = {
    getTableStruct: getTableStruct.started,
    editColumn: editColumn.started
};

export default connect(mapStateToProps, mapDispatchToProps)(EditColumnContainer);