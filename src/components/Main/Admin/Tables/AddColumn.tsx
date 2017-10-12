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
import { columnTypes } from './Create';
import { addColumn } from 'modules/admin/actions';

import Validation from 'components/Validation';

export interface IAddColumnProps {
    session: string;
    privateKey: string;
    publicKey: string;
    table: string;
    pending: boolean;
    addColumnStatus: { block: string, error: string };
    addColumn: typeof addColumn.started;
}

interface IAddColumnState {
    type: string;
    index: boolean;
}

class AddColumn extends React.Component<IAddColumnProps, IAddColumnState> {
    constructor(props: IAddColumnProps) {
        super(props);
        this.state = {
            type: columnTypes[0].name,
            index: false
        };
    }

    componentWillReceiveProps(props: IAddColumnProps) {
        if (props.addColumnStatus && this.props.addColumnStatus !== props.addColumnStatus) {
            // TODO: Notification stub
            if (props.addColumnStatus.error) {
                alert('Error:: ' + props.addColumnStatus.error);
            }
            else {
                alert('Success:: ' + props.addColumnStatus.block);
            }
        }
    }

    onIndexChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            index: e.target.checked
        });
    }

    onTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            type: e.target.value,
            index: this.isIndexDenied(e.target.value) ? false : this.state.index
        });
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.addColumn({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            table: this.props.table,
            name: values.name,
            type: this.state.type,
            index: this.state.index,
            permissions: values.permissions
        });
    }

    isIndexDenied(type?: string) {
        return !!columnTypes.find(l => l.name === (type || this.state.type) && l.denyIndex);
    }

    render() {
        return (
            <div className="content-wrapper" >
                <div className="content-heading">
                    <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                </div>
                <ol className="breadcrumb">
                    <li>
                        <Link to="/admin/tables">
                            <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                        </Link>
                    </li>
                    <li>
                        <Link to={`/admin/tables/${this.props.table}`}>
                            {this.props.table}
                        </Link>
                    </li>
                    <li>
                        <Link to={`/admin/tables/${this.props.table}/edit`}>
                            <FormattedMessage id="admin.tables.edit" defaultMessage="Edit" />
                        </Link>
                    </li>
                    <li>
                        <FormattedMessage id="admin.tables.column.add" defaultMessage="Add column" />
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
                        <Validation.components.ValidatedFormGroup for="name">
                            <label htmlFor="name">
                                <FormattedMessage id="admin.tables.column" defaultMessage="Column" />
                            </label>
                            <Validation.components.ValidatedControl type="text" name="name" validators={[Validation.validators.required]} />
                        </Validation.components.ValidatedFormGroup>
                        <Row>
                            <Col md={11}>
                                <Validation.components.ValidatedFormGroup for="type">
                                    <label htmlFor="type">
                                        <FormattedMessage id="admin.tables.column.type" defaultMessage="Type" />
                                    </label>
                                    <Validation.components.ValidatedSelect name="type" onChange={this.onTypeChange.bind(this)} value={this.state.type}>
                                        {columnTypes.map(type => (
                                            <option key={type.name} value={type.name}>
                                                {type.title}
                                            </option>
                                        ))}
                                    </Validation.components.ValidatedSelect>
                                </Validation.components.ValidatedFormGroup>
                            </Col>
                            <Col md={1}>
                                <Validation.components.ValidatedFormGroup for="index">
                                    <label htmlFor="index">
                                        <FormattedMessage id="admin.tables.column.index" defaultMessage="Index" />
                                    </label>
                                    <Validation.components.ValidatedCheckbox
                                        name="index"
                                        checked={this.state.index}
                                        onChange={this.onIndexChange.bind(this)}
                                        disabled={this.isIndexDenied()}
                                    />
                                </Validation.components.ValidatedFormGroup>
                            </Col>
                        </Row>
                        <Validation.components.ValidatedFormGroup for="permissions">
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

export default AddColumn;