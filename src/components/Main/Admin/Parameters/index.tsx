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
import Heading from 'components/Heading';

export interface IParametersProps {
    vde?: boolean;
    parameters: IParameterResponse[];
}

const Parameters: React.SFC<IParametersProps> = (props) => (
    <DocumentTitle title="admin.parameters" defaultTitle="Ecosystem parameters">
        <div>
            <Heading>
                <FormattedMessage id="admin.parameters" defaultMessage="Ecosystem parameters" />
                <div className="pull-right">
                    <Link to={props.vde ? '/vde/parameters/stylesheet' : '/admin/parameters/stylesheet'} className="ml">
                        <button className="btn btn-default">
                            <em className="fa fa-paint-brush fa-fw mr-sm" />
                            <span>
                                <FormattedMessage id="admin.parameters.stylesheet" defaultMessage="Manage stylesheet" />
                            </span>
                        </button>
                    </Link>
                    <Link to={props.vde ? '/vde/parameters/create' : '/admin/paramters/create'} className="ml">
                        <button className="btn btn-default">
                            <em className="fa fa-plus-circle fa-fw mr-sm" />
                            <span>
                                <FormattedMessage id="admin.parameters.create" defaultMessage="Create" />
                            </span>
                        </button>
                    </Link>
                </div>
            </Heading>
            <div className="content-wrapper">
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
                                        <th style={{ width: 1 }}>ID</th>
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
                                        <tr key={param.id}>
                                            <td>
                                                {param.id}
                                            </td>
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
                                                <Link to={`/${props.vde ? 'vde' : 'admin'}/parameters/${param.name}`}>
                                                    <Button bsStyle="default" className="btn-labeled btn-icon">
                                                        <span className="btn-label">
                                                            <em className="fa fa-edit" />
                                                        </span>
                                                    </Button>
                                                </Link>
                                                <Link to={`/${props.vde ? 'vde' : 'admin'}/tabs/parameter-${param.name}`}>
                                                    <Button bsStyle="default" className="btn-labeled btn-icon">
                                                        <span className="btn-label">
                                                            <em className="fa fa-files-o" />
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
        </div>
    </DocumentTitle>
);

export default Parameters;