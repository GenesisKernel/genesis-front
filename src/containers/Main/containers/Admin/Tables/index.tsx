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
import { getTables } from 'modules/admin/actions';
import { ITablesResponse } from 'lib/api';

import Tables from 'components/Main/Admin/Tables';

export interface ITablesContainerProps {
    vde?: boolean;
    match?: { params: { tableName: string } };
}

interface ITablesContainerState {
    tables: ITablesResponse;
}

interface ITablesContainerDispatch {
    getTables: typeof getTables.started;
}

class TablesContainer extends React.Component<ITablesContainerProps & ITablesContainerState & ITablesContainerDispatch> {
    componentWillMount() {
        this.props.getTables({
            vde: this.props.vde
        });
    }

    render() {
        return (
            <Tables tables={this.props.tables} vde={this.props.vde} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    tables: state.admin.tables
});

const mapDispatchToProps = {
    getTables: getTables.started
};

export default connect<ITablesContainerState, ITablesContainerDispatch, ITablesContainerProps>(mapStateToProps, mapDispatchToProps)(TablesContainer);