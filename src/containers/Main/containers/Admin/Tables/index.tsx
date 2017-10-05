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

interface ITablesContainerProps {
    session: string;
    tables: ITablesResponse;
    getTables: typeof getTables.started;
}

class TablesContainer extends React.Component<ITablesContainerProps & { match?: { params: { tableName: string } } }> {
    componentWillMount() {
        this.props.getTables({ session: this.props.session });
    }

    render() {
        return (
            <Tables tables={this.props.tables} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    session: state.auth.sessionToken,
    tables: state.admin.tables
});

const mapDispatchToProps = {
    getTables: getTables.started
};

export default connect(mapStateToProps, mapDispatchToProps)(TablesContainer);