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
import { getTable } from 'modules/admin/actions';
import { ITableResponse, IListResponse } from 'lib/api';

import View from 'components/Main/Admin/Tables/View';

interface IViewContainerProps {
    session: string;
    table: ITableResponse;
    tableData: IListResponse;
    getTable: typeof getTable.started;
}

class ViewContainer extends React.Component<IViewContainerProps & { match?: { params: { tableName: string } } }> {
    componentWillMount() {
        this.props.getTable({ session: this.props.session, table: this.props.match.params.tableName });
    }

    render() {
        return (
            <View tableName={this.props.match.params.tableName} table={this.props.table} tableData={this.props.tableData} />
        )
    }
}

const mapStateToProps = (state: IRootState) => ({
    session: state.auth.sessionToken,
    table: state.admin.table,
    tableData: state.admin.tableData
});

const mapDispatchToProps = {
    getTable: getTable.started
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);