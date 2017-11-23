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

import DocumentTitle from 'components/DocumentTitle';
import Heading from 'components/Heading';

export interface ILanguagesProps {
    vde?: boolean;
    resources: {
        id: string;
        res: any;
        name: string;
        conditions: string;
    }[];
}

const Languages: React.SFC<ILanguagesProps> = (props) => (
    <DocumentTitle title="admin.languages" defaultTitle="Language resources">
        <div>
            <Heading>
                <FormattedMessage id="admin.languages" defaultMessage="Language resources" />
                <div className="pull-right">
                    <Link to={props.vde ? '/vde/languages/create' : '/admin/languages/create'} className="ml">
                        <button className="btn btn-default ml">
                            <em className="fa fa-plus-circle fa-fw mr-sm" />
                            <span>
                                <FormattedMessage id="admin.languages.create" defaultMessage="Create localization" />
                            </span>
                        </button>
                    </Link>
                </div>
            </Heading>
            <div className="content-wrapper">
                <ol className="breadcrumb">
                    <li>
                        <FormattedMessage id="admin.languages" defaultMessage="Language resources" />
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
                                            <FormattedMessage id="admin.languages.name" defaultMessage="Name" />
                                        </th>
                                        <th className="text-center">
                                            <FormattedMessage id="admin.languages.resources" defaultMessage="Resources" />
                                        </th>
                                        <th className="text-center">
                                            <FormattedMessage id="admin.languages.edit" defaultMessage="Edit" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.resources && props.resources.length && (
                                        props.resources.sort((a, b) => a.name > b.name ? 1 : 0).map(res => (
                                            <tr key={res.id}>
                                                <td>{res.id}</td>
                                                <td>{res.name}</td>
                                                <td>{res.res}</td>
                                                <td style={{ width: 1 }}>
                                                    <Link to={`/${props.vde ? 'vde' : 'admin'}/languages/${res.id}-${res.name}`}>
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
        </div>
    </DocumentTitle>
);

export default Languages;