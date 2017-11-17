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
import { Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ITablesResponse } from 'lib/api';

import DocumentTitle from 'components/DocumentTitle';
import Heading from 'containers/Widgets/Heading';

export interface ITablesProps {
    vde?: boolean;
    tables: ITablesResponse;
}

const Tables: React.SFC<ITablesProps> = (props) => (
    <DocumentTitle title="admin.tables" defaultTitle="Tables">
        <div>
            <Heading>
                <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                <div className="pull-right">
                    <Link to={props.vde ? '/vde/tables/create' : '/admin/tables/create'} className="ml btn-tool">
                        <em className="icon icon-plus" />
                        <span>
                            <FormattedMessage id="admin.tables.create" defaultMessage="Create" />
                        </span>
                    </Link>
                </div>
            </Heading>
            <div className="content-wrapper">
                <ol className="breadcrumb">
                    <li>
                        <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                    </li>
                </ol>
                <Panel bsStyle="default">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <FormattedMessage id="admin.tables.name" defaultMessage="Name" />
                                    </th>
                                    <th className="text-center">
                                        <FormattedMessage id="admin.tables.count" defaultMessage="Count" />
                                    </th>
                                    <th className="text-center">
                                        <FormattedMessage id="admin.tables.show" defaultMessage="Show" />
                                    </th>
                                    <th className="text-center">
                                        <FormattedMessage id="admin.tables.edit" defaultMessage="Edit" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.tables && props.tables.list.map(table => (
                                    <tr key={table.name}>
                                        <td>
                                            <strong>{table.name}</strong>
                                        </td>
                                        <td className="text-center" style={{ width: 1 }}>
                                            <strong>{table.count}</strong>
                                        </td>
                                        <td style={{ width: 1 }}>
                                            {'0' === table.count ?
                                                (
                                                    <Button bsStyle="primary" disabled>
                                                        <FormattedMessage id="admin.tables.show" defaultMessage="Show" />
                                                    </Button>
                                                ) : (
                                                    <Link to={`/${props.vde ? 'vde' : 'admin'}/tables/${table.name}`}>
                                                        <Button bsStyle="primary">
                                                            <FormattedMessage id="admin.tables.show" defaultMessage="Show" />
                                                        </Button>
                                                    </Link>
                                                )
                                            }
                                        </td>
                                        <td style={{ width: 1 }}>
                                            <Link to={`/${props.vde ? 'vde' : 'admin'}/tables/${table.name}/edit`}>
                                                <Button bsStyle="primary" type="button">
                                                    <FormattedMessage id="admin.tables.edit" defaultMessage="Edit" />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Panel>
            </div>
        </div>
    </DocumentTitle>
);

export default Tables;