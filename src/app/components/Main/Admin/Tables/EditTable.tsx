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
import { Button, Col, Panel, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { ITableResponse } from 'lib/api';
import { columnTypes } from './Create';

import Heading from 'components/Heading';
import PageLink from 'containers/Routing/PageLink';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Validation from 'components/Validation';

export interface IEditTableProps {
    tableStruct: ITableResponse;
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
            Name: this.props.tableStruct.name,
            Permissions: JSON.stringify({
                insert: values.insert,
                update: values.update,
                new_column: values.newColumn,
                ...(false ? {
                    read: values.read,
                    filter: values.filter
                } : {})
            })
        };
    }

    render() {
        return this.props.tableStruct && (
            <LocalizedDocumentTitle title={this.props.tableStruct.name}>
                <div>
                    <Heading>
                        <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                    </Heading>
                    <div className="content-wrapper">
                        <ol className="breadcrumb">
                            <li>
                                <PageLink page="tables">
                                    <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                                </PageLink>
                            </li>
                            <li>
                                <PageLink page="table" params={{ table: this.props.tableStruct.name }}>
                                    {this.props.tableStruct.name}
                                </PageLink>
                            </li>
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
                                                <PageLink page="add-column" params={{ table: this.props.tableStruct.name }}>
                                                    <Button bsStyle="primary">
                                                        <FormattedMessage id="admin.tables.column.add" defaultMessage="Add column" />
                                                    </Button>
                                                </PageLink>
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
                                                {this.props.tableStruct.columns.map(col => (
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
                                                            <PageLink page="edit-column" params={{ table: this.props.tableStruct.name, column: col.name }}>
                                                                <Button bsStyle="primary">
                                                                    <FormattedMessage id="admin.tables.column.edit" defaultMessage="Edit" />
                                                                </Button>
                                                            </PageLink>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Panel>
                            </Col>
                        </Row>
                        <ValidatedContractForm contractName="@1EditTable" mapContractParams={this.mapContractParams.bind(this)}>
                            <Row>
                                <Col md={6}>
                                    <Panel
                                        header={<FormattedMessage id="admin.tables.permissions.write" defaultMessage="Write permissions" />}
                                        footer={<div className="text-right"><Button type="submit" bsStyle="primary"><FormattedMessage id="admin.tables.save" defaultMessage="Save" /></Button></div>}
                                    >
                                        <Validation.components.ValidatedFormGroup for="insert">
                                            <label>
                                                <FormattedMessage id="admin.tables.permissions.insert" defaultMessage="Insert" />
                                            </label>
                                            <Validation.components.ValidatedControl type="text" name="insert" defaultValue={this.props.tableStruct.insert} validators={[Validation.validators.required]} />
                                        </Validation.components.ValidatedFormGroup>
                                        <Validation.components.ValidatedFormGroup for="update">
                                            <label>
                                                <FormattedMessage id="admin.tables.permissions.update" defaultMessage="Update" />
                                            </label>
                                            <Validation.components.ValidatedControl type="text" name="update" defaultValue={this.props.tableStruct.update} validators={[Validation.validators.required]} />
                                        </Validation.components.ValidatedFormGroup>
                                        <Validation.components.ValidatedFormGroup for="newColumn">
                                            <label>
                                                <FormattedMessage id="admin.tables.permissions.newcolumn" defaultMessage="New column" />
                                            </label>
                                            <Validation.components.ValidatedControl type="text" name="newColumn" defaultValue={this.props.tableStruct.new_column} validators={[Validation.validators.required]} />
                                        </Validation.components.ValidatedFormGroup>
                                    </Panel>
                                </Col>
                                <Col md={6}>
                                    {false && (
                                        <Panel header={<FormattedMessage id="admin.tables.permissions.read" defaultMessage="Read permissions" />}>
                                            <Validation.components.ValidatedFormGroup for="read">
                                                <label>
                                                    <FormattedMessage id="admin.tables.permissions.read" defaultMessage="Read" />
                                                </label>
                                                <Validation.components.ValidatedControl type="text" name="read" defaultValue={this.props.tableStruct.read} />
                                            </Validation.components.ValidatedFormGroup>
                                            <Validation.components.ValidatedFormGroup for="filter">
                                                <label>
                                                    <FormattedMessage id="admin.tables.permissions.filter" defaultMessage="Filter" />
                                                </label>
                                                <Validation.components.ValidatedControl type="text" name="filter" defaultValue={this.props.tableStruct.filter} />
                                            </Validation.components.ValidatedFormGroup>
                                        </Panel>
                                    )}
                                    <Panel
                                        header={<FormattedMessage id="admin.tables.permissions.conditions" defaultMessage="Conditions for changing permissions" />}
                                    >
                                        <Validation.components.ValidatedFormGroup for="conditions">
                                            <Validation.components.ValidatedControl type="text" name="conditions" readOnly defaultValue={this.props.tableStruct.conditions} validators={[Validation.validators.required]} />
                                        </Validation.components.ValidatedFormGroup>
                                    </Panel>
                                </Col>
                            </Row>
                        </ValidatedContractForm>
                    </div>
                </div>
            </LocalizedDocumentTitle>
        );
    }
}

export default EditTable;