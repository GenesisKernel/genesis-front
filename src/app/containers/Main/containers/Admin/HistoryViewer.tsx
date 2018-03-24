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
import { getHistory, getTableStruct } from 'modules/admin/actions';
import { IHistoryResponse, ITableResponse } from 'lib/api';

import DataPreloader from 'components/Animation/DataPreloader';
import History from 'components/Main/Admin/History';

export interface IHistoryContainerProps {
    id: string;
    table: string;
}

interface IHistoryContainerState {
    data: IHistoryResponse;
    struct: ITableResponse;
}

interface IHistoryContainerDispatch {
    getHistory: typeof getHistory.started;
    getTableStruct: typeof getTableStruct.started;
}

class ParametersContainer extends React.Component<IHistoryContainerProps & IHistoryContainerState & IHistoryContainerDispatch> {
    componentDidMount() {
        this.props.getHistory({
            id: this.props.id,
            table: this.props.table
        });
        this.props.getTableStruct({
            name: this.props.table
        });
    }

    componentWillReceiveProps(props: IHistoryContainerProps & IHistoryContainerState & IHistoryContainerDispatch) {
        if (this.props.id !== props.id || this.props.table !== props.table) {
            props.getHistory({
                id: props.id,
                table: props.table
            });
            props.getTableStruct({
                name: props.table
            });
        }
    }

    render() {
        return (
            <DataPreloader data={[this.props.data, this.props.struct && this.props.struct.columns]}>
                <History
                    id={this.props.id}
                    table={this.props.table}
                    columns={this.props.struct && this.props.struct.columns}
                    data={this.props.data && this.props.data.list}
                />
            </DataPreloader>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    data: state.admin.history,
    struct: state.admin.table
});

const mapDispatchToProps = {
    getHistory: getHistory.started,
    getTableStruct: getTableStruct.started,
};

export default connect<IHistoryContainerState, IHistoryContainerDispatch, IHistoryContainerProps>(mapStateToProps, mapDispatchToProps)(ParametersContainer);