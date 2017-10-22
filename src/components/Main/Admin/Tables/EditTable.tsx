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
import { Button, Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ITableResponse } from 'lib/api';
import { columnTypes } from './Create';

import DocumentTitle from 'components/DocumentTitle';

export interface IEditTableProps {
    table: ITableResponse;
}

const resolveColumnType = (type: string) => {
    const value = columnTypes.find(l => l.name === type);
    if (value) {
        return value.title;
    }
    else {
        return null;
    }
};

const EditTable: React.SFC<IEditTableProps> = (props) => (
    <DocumentTitle title={props.table && props.table.name}>
        <div className="content-wrapper">
            <div className="content-heading">
                <FormattedMessage id="admin.tables" defaultMessage="Tables" />
            </div>
            <ol className="breadcrumb">
                <li>
                    <Link to="/admin/tables">
                        <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                    </Link>
                </li>
                {props.table && (
                    <li>
                        <Link to={`/admin/tables/${props.table.name}`}>
                            {props.table.name}
                        </Link>
                    </li>
                )}
                <li>
                    <FormattedMessage id="admin.tables.edit" defaultMessage="Edit" />
                </li>
            </ol>
            <Panel
                bsStyle="default"
                footer={
                    <div className="clearfix">
                        <div className="pull-left">
                            {props.table && (
                                <Link to={`/admin/tables/${props.table.name}/edit/add-column`}>
                                    <Button bsStyle="primary">
                                        <FormattedMessage id="admin.tables.column.add" defaultMessage="Add column" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                }
            >
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <FormattedMessage id="admin.tables.column" defaultMessage="Column" />
                                </th>
                                <th>
                                    <FormattedMessage id="admin.tables.column.type" defaultMessage="Type" />
                                </th>
                                <th>
                                    <FormattedMessage id="admin.tables.column.permissions" defaultMessage="Permissions" />
                                </th>
                                <th style={{ width: 1 }}>
                                    <FormattedMessage id="admin.tables.column.action" defaultMessage="Action" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.table && props.table.columns.map(col => (
                                <tr key={col.name}>
                                    <td>{col.name}</td>
                                    <td>
                                        {resolveColumnType(col.type) || (
                                            <span className="text-muted">
                                                <FormattedMessage id="admin.tables.column.type.unknown" defaultMessage="Unknown" />
                                            </span>
                                        )}
                                    </td>
                                    <td>{col.perm}</td>
                                    <td>
                                        {props.table && (
                                            <Link to={`/admin/tables/${props.table.name}/edit/column/${col.name}`}>
                                                <Button bsStyle="primary">
                                                    <FormattedMessage id="admin.tables.column.edit" defaultMessage="Edit" />
                                                </Button>
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Panel>
        </div>
    </DocumentTitle>
);

export default EditTable;