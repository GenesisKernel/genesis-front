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
import { IParameterResponse } from 'lib/api';

import DocumentTitle from 'components/DocumentTitle';

export interface IParametersProps {
    parameters: IParameterResponse[];
}

const Parameters: React.SFC<IParametersProps> = (props) => (
    <DocumentTitle title="admin.parameters" defaultTitle="Ecosystem parameters">
        <div className="content-wrapper">
            <div className="content-heading">
                <div>
                    <div className="pull-right">
                        <Link to="/admin/parameters/create" className="ml">
                            <button className="btn btn-default">
                                <em className="fa fa-plus-circle fa-fw mr-sm" />
                                <span>
                                    <FormattedMessage id="admin.parameters.create" defaultMessage="Create" />
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
                <FormattedMessage id="admin.parameters" defaultMessage="Ecosystem parameters" />
            </div>
            <ol className="breadcrumb">
                <li>
                    <FormattedMessage id="admin.parameters" defaultMessage="Ecosystem parameters" />
                </li>
            </ol>
            <Panel bsStyle="default">
                <div className="table-responsive">
                    {props.parameters && (
                        <table className="table table-striped table-bordered table-hover ui-responsive ui-table ui-table-reflow">
                            <thead>
                                <tr>
                                    <th>
                                        <FormattedMessage id="admin.parameters.name" defaultMessage="Name" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="admin.parameters.value" defaultMessage="Value" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="admin.parameters.conditions" defaultMessage="Change condittions" />
                                    </th>
                                    <th style={{ width: 1 }}>
                                        <FormattedMessage id="admin.parameters.action" defaultMessage="Action" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.parameters.sort((a, b) => a.name > b.name ? 0 : 1).map(param => (
                                    <tr key={param.name}>
                                        <td>
                                            {param.name}
                                        </td>
                                        <td>
                                            {param.value}
                                        </td>
                                        <td>
                                            {param.conditions}
                                        </td>
                                        <td>
                                            <Link to={`/admin/parameters/${param.name}`}>
                                                <Button bsStyle="default" className="btn-labeled btn-icon">
                                                    <span className="btn-label">
                                                        <em className="fa fa-edit" />
                                                    </span>
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Panel>
        </div>
    </DocumentTitle>
);

export default Parameters;