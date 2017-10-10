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
import { Link } from 'react-router-dom';
import { Button, Col, Panel, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export interface IContractsProps {
    contracts: {
        id: string;
        name: string;
        wallet: string;
        active: string;
    }[];
}

const Contracts: React.SFC<IContractsProps> = (props) => (
    <div className="content-wrapper">
        <div className="content-heading">
            <div>
                <div className="pull-right">
                    <button className="btn btn-green ml">
                        <em className="fa fa-globe fa-fw mr-sm" />
                        <span>
                            <FormattedMessage id="admin.tables.global" defaultMessage="Global" />
                        </span>
                    </button>
                    <Link to="/admin/contracts/create" className="ml">
                        <button className="btn btn-default ml">
                            <em className="fa fa-plus-circle fa-fw mr-sm" />
                            <span>
                                <FormattedMessage id="admin.contracts.create" defaultMessage="Create contract" />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
            <FormattedMessage id="admin.contracts" defaultMessage="Smart contracts" />
        </div>
        <ol className="breadcrumb">
            <li>
                <FormattedMessage id="admin.contracts" defaultMessage="Smart contracts" />
            </li>
        </ol>
        <Row>
            <Col md={12}>
                <Panel bsStyle="default">
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th className="text-center">
                                    <FormattedMessage id="admin.contracts.name" defaultMessage="Name" />
                                </th>
                                <th className="text-center">
                                    <FormattedMessage id="admin.contracts.wallet" defaultMessage="Wallet" />
                                </th>
                                <th className="text-center">
                                    <FormattedMessage id="admin.contracts.active" defaultMessage="Active" />
                                </th>
                                <th className="text-center">
                                    <FormattedMessage id="admin.contracts.edit" defaultMessage="Edit" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.contracts.length && (
                                props.contracts.map(contract => (
                                    <tr key={contract.id}>
                                        <td>{contract.id}</td>
                                        <td>{contract.name}</td>
                                        <td>{contract.wallet}</td>
                                        <td>{contract.active}</td>
                                        <td style={{ width: 1 }}>
                                            <Link to={`/admin/contracts/${contract.id}-${contract.name}`}>
                                                <Button bsStyle="default" className="btn-labeled btn-icon">
                                                    <span className="btn-label">
                                                        <em className="fa fa-edit" />
                                                    </span>
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Panel>
            </Col>
        </Row>
    </div>
);

export default Contracts;