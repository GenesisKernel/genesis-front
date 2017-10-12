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
import { columnTypes } from './Create';
import { editColumn } from 'modules/admin/actions';
import { ITableResponse } from 'lib/api';

import Validation from 'components/Validation';

export interface IEditColumnProps {
    session: string;
    privateKey: string;
    publicKey: string;
    table: ITableResponse;
    pending: boolean;
    column: { name: string, type: string, index: boolean, permissions: string };
    editColumnStatus: { block: string, error: string };
    editColumn: typeof editColumn.started;
}

export default class EditColumn extends React.Component<IEditColumnProps> {
    componentWillReceiveProps(props: IEditColumnProps) {
        if (props.editColumnStatus && this.props.editColumnStatus !== props.editColumnStatus) {
            // TODO: Notification stub
            if (props.editColumnStatus.error) {
                alert('Error:: ' + props.editColumnStatus.error);
            }
            else {
                alert('Success:: ' + props.editColumnStatus.block);
            }
        }
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.editColumn({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            table: this.props.table.name,
            name: this.props.column.name,
            permissions: values.permissions
        });
    }

    render() {
        const columnDef = columnTypes.find(l => l.name === (this.props.column && this.props.column.type));
        const columnType = columnDef && columnDef.title;

        return (
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
                <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)}>
                    <Panel
                        bsStyle="default"
                        footer={(
                            <Button bsStyle="primary" type="submit" disabled={this.props.pending}>
                                <FormattedMessage id="admin.save" defaultMessage="Save" />
                            </Button>
                        )}
                    >
                        <div className="form-group">
                            <label>
                                <FormattedMessage id="admin.tables.column" defaultMessage="Column" />
                            </label>
                            <p className="form-control-static">
                                {this.props.column && this.props.column.name}
                            </p>
                        </div>
                        {/*<div className="form-group">
                            <label>
                                <FormattedMessage id="admin.tables.column.index" defaultMessage="Index" />
                            </label>
                            <p className="form-control-static">
                                {(this.props.column && this.props.column.index) ?
                                    (
                                        <FormattedMessage id="admin.tables.column.index.true" defaultMessage="True" />
                                    ) : (
                                        <FormattedMessage id="admin.tables.column.index.false" defaultMessage="False" />
                                    )
                                }
                            </p>
                        </div>*/}
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
                            <Validation.components.ValidatedTextarea name="permissions" validators={[Validation.validators.required]} />
                        </Validation.components.ValidatedFormGroup>
                    </Panel>
                </Validation.components.ValidatedForm>
            </div>
        );
    }
}