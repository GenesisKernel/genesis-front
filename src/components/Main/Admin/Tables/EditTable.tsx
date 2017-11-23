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
import { Button, Col, Panel, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ITableResponse } from 'lib/api';
import { columnTypes } from './Create';

import Heading from 'components/Heading';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import DocumentTitle from 'components/DocumentTitle';
import Validation from 'components/Validation';

export interface IEditTableProps {
    vde?: boolean;
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

class EditTable extends React.Component<IEditTableProps> {
    mapContractParams(values: { [key: string]: any }) {
        return {
            Name: this.props.table.name,
            Permissions: JSON.stringify({
                insert: values.insert,
                update: values.update,
                new_column: values.newColumn
            })
        };
    }

    render() {
        return (
            <DocumentTitle title={this.props.table && this.props.table.name}>
                <div>
                    <Heading>
                        <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                    </Heading>
                    <div className="content-wrapper">
                        <ol className="breadcrumb">
                            <li>
                                <Link to={this.props.vde ? '/vde/tables' : '/admin/tables'}>
                                    <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                                </Link>
                            </li>
                            {this.props.table && (
                                <li>
                                    <Link to={`/${this.props.vde ? 'vde' : 'admin'}/tables/${this.props.table.name}`}>
                                        {this.props.table.name}
                                    </Link>
                                </li>
                            )}
                            <li>
                                <FormattedMessage id="admin.tables.edit" defaultMessage="Edit" />
                            </li>
                        </ol>
                        <Row>
                            <Col md={12}>
                                <Panel
                                    bsStyle="default"
                                    footer={
                                        <div className="clearfix">
                                            <div className="pull-left">
                                                {this.props.table && (
                                                    <Link to={`/${this.props.vde ? 'vde' : 'admin'}/tables/${this.props.table.name}/edit/add-column`}>
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
                                                {this.props.table && this.props.table.columns.map(col => (
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
                                                            {this.props.table && (
                                                                <Link to={`/${this.props.vde ? 'vde' : 'admin'}/tables/${this.props.table.name}/edit/column/${col.name}`}>
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
                            </Col>
                        </Row>
                        {this.props.table && (
                            <ValidatedContractForm vde={this.props.vde} contractName="EditTable" mapContractParams={this.mapContractParams.bind(this)}>
                                <Row>
                                    <Col md={6}>
                                        <Panel
                                            header={<FormattedMessage id="admin.tables.permissions" defaultMessage="Permissions" />}
                                            footer={<div className="text-right"><Button type="submit" bsStyle="primary"><FormattedMessage id="admin.tables.save" defaultMessage="Save" /></Button></div>}
                                        >
                                            <Validation.components.ValidatedFormGroup for="insert">
                                                <label>
                                                    <FormattedMessage id="admin.tables.permissions.insert" defaultMessage="Insert" />
                                                </label>
                                                <Validation.components.ValidatedControl type="text" name="insert" defaultValue={this.props.table.insert} validators={[Validation.validators.required]} />
                                            </Validation.components.ValidatedFormGroup>
                                            <Validation.components.ValidatedFormGroup for="update">
                                                <label>
                                                    <FormattedMessage id="admin.tables.permissions.update" defaultMessage="Update" />
                                                </label>
                                                <Validation.components.ValidatedControl type="text" name="update" defaultValue={this.props.table.update} validators={[Validation.validators.required]} />
                                            </Validation.components.ValidatedFormGroup>
                                            <Validation.components.ValidatedFormGroup for="newColumn">
                                                <label>
                                                    <FormattedMessage id="admin.tables.permissions.newcolumn" defaultMessage="New column" />
                                                </label>
                                                <Validation.components.ValidatedControl type="text" name="newColumn" defaultValue={this.props.table.new_column} validators={[Validation.validators.required]} />
                                            </Validation.components.ValidatedFormGroup>
                                        </Panel>
                                    </Col>
                                    <Col md={6}>
                                        <Panel
                                            header={<FormattedMessage id="admin.tables.permissions.conditions" defaultMessage="Conditions for changing permissions" />}
                                        >
                                            {this.props.table && (
                                                <Validation.components.ValidatedFormGroup for="conditions">
                                                    <Validation.components.ValidatedControl type="text" name="conditions" readOnly defaultValue={this.props.table.conditions} validators={[Validation.validators.required]} />
                                                </Validation.components.ValidatedFormGroup>
                                            )}
                                        </Panel>
                                    </Col>
                                </Row>
                            </ValidatedContractForm>
                        )}
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default EditTable;