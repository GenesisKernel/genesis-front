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
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { columnTypes } from './Create';
import { ITableResponse } from 'lib/api';

import DocumentTitle from 'components/DocumentTitle';
import Heading from 'containers/Widgets/Heading';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Validation from 'components/Validation';

export interface IEditColumnProps {
    table: ITableResponse;
    column: { name: string, type: string, index: boolean, permissions: string };
}

interface IEditColumnState {
    permissions: string;
}

export default class EditColumn extends React.Component<IEditColumnProps, IEditColumnState> {
    constructor(props: IEditColumnProps) {
        super(props);
        this.state = props.column ?
            {
                permissions: props.column.permissions
            } : {
                permissions: ''
            };
    }

    componentWillReceiveProps(props: IEditColumnProps) {
        if (!this.props.column && props.column) {
            this.setState({
                permissions: props.column.permissions
            });
        }
    }

    mapContractParams(values: { [key: string]: any }) {
        return {
            TableName: this.props.table.name,
            Name: this.props.column.name,
            Permissions: this.state.permissions
        };
    }

    onPermissionsChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            permissions: e.target.value
        });
    }

    render() {
        const columnDef = columnTypes.find(l => l.name === (this.props.column && this.props.column.type));
        const columnType = columnDef && columnDef.title;

        return (
            <DocumentTitle title="admin.tables.column.edit" defaultTitle="Edit column">
                <div>
                    <Heading>
                        <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                    </Heading>
                    <div className="content-wrapper">
                        <ol className="breadcrumb">
                            <li>
                                <Link to="/admin/tables">
                                    <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                                </Link>
                            </li>
                            {this.props.table && (
                                <li>
                                    <Link to={`/admin/tables/${this.props.table.name}`}>
                                        {this.props.table.name}
                                    </Link>
                                </li>
                            )}
                            {this.props.table && (
                                <li>
                                    <Link to={`/admin/tables/${this.props.table.name}/edit`}>
                                        <FormattedMessage id="admin.tables.edit" defaultMessage="Edit" />
                                    </Link>
                                </li>
                            )}
                            <li>
                                <FormattedMessage id="admin.tables.column.edit" defaultMessage="Edit column" />
                            </li>
                        </ol>
                        <ValidatedContractForm contractName="@1EditColumn" mapContractParams={this.mapContractParams.bind(this)}>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="form-group">
                                        <label>
                                            <FormattedMessage id="admin.tables.column" defaultMessage="Column" />
                                        </label>
                                        <p className="form-control-static">
                                            {this.props.column && this.props.column.name}
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <FormattedMessage id="admin.tables.column.type" defaultMessage="Type" />
                                        </label>
                                        <p className="form-control-static">
                                            {columnType || (
                                                <span className="text-muted">
                                                    <FormattedMessage id="admin.tables.column.type.unknown" defaultMessage="Unknown" />
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <Validation.components.ValidatedFormGroup for="permissions" className="mb0">
                                        <label htmlFor="permissions">
                                            <FormattedMessage id="admin.tables.permissions" defaultMessage="Permissions" />
                                        </label>
                                        <Validation.components.ValidatedTextarea name="permissions" validators={[Validation.validators.required]} value={this.state.permissions} onChange={this.onPermissionsChange.bind(this)} />
                                    </Validation.components.ValidatedFormGroup>
                                </div>
                                <div className="panel-footer">
                                    <Validation.components.ValidatedSubmit bsStyle="primary">
                                        <FormattedMessage id="admin.save" defaultMessage="Save" />
                                    </Validation.components.ValidatedSubmit>
                                </div>
                            </div>
                        </ValidatedContractForm>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}