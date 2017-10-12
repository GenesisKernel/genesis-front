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
import { createTable } from 'modules/admin/actions';

import Checkbox from 'components/Checkbox';
import Validation from 'components/Validation';

export const columnTypes = [
    {
        name: 'text',
        title: 'Text',
        denyIndex: true
    },
    {
        name: 'datetime',
        title: 'Date/Time',
        denyIndex: false
    },
    {
        name: 'varchar',
        title: 'Varchar',
        denyIndex: false
    },
    {
        name: 'character',
        title: 'Character',
        denyIndex: true
    },
    {
        name: 'number',
        title: 'Number',
        denyIndex: false
    },
    {
        name: 'money',
        title: 'Money',
        denyIndex: true
    },
    {
        name: 'double',
        title: 'Double',
        denyIndex: true
    },
    {
        name: 'bytea',
        title: 'Binary',
        denyIndex: true
    },
];

export interface ICreateProps {
    session: string;
    privateKey: string;
    publicKey: string;
    createTableStatus: { block: string, error: string };
    createTable: typeof createTable.started;
}

interface ICreateState {
    columns: {
        name: string;
        type: string;
        index: boolean;
    }[];
}

class Create extends React.Component<ICreateProps, ICreateState> {
    constructor(props: ICreateProps) {
        super(props);
        this.state = {
            columns: [
                { name: '', type: columnTypes[0].name, index: false }
            ]
        };
    }

    componentWillReceiveProps(props: ICreateProps) {
        if (props.createTableStatus) {
            // TODO: Notification stub
            if (props.createTableStatus.error) {
                alert('Error:: ' + props.createTableStatus.error);
            }
            else {
                alert('Success:: ' + props.createTableStatus.block);
            }
        }
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.createTable({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            name: values.name,
            columns: JSON.stringify(this.state.columns.map(col => ({
                name: col.name,
                type: col.type,
                index: Number(col.index).toString(),
                conditions: 'true'
            }))),
            permissions: JSON.stringify({
                insert: 'true',
                update: 'true',
                new_column: 'true'
            })
        });
    }

    onNewColumn() {
        this.setState({
            columns: [
                ...this.state.columns,
                { name: '', type: columnTypes[0].name, index: false }
            ]
        });
    }

    onDropColumn(index: number) {
        if (1 >= this.state.columns.length) {
            return;
        }

        this.setState({
            columns: [
                ...this.state.columns.slice(0, index),
                ...this.state.columns.slice(index + 1)
            ]
        });
    }

    onColumnUpdate(index: number, property: string, value: any) {
        const column = this.state.columns[index];
        if (column) {
            this.setState({
                columns: [
                    ...this.state.columns.slice(0, index),
                    {
                        ...column,
                        // Drop index value if requested column type is non-indexable
                        // must be happening before actual [property] update
                        index: this.isIndexDenied(index) ? false : column.index,
                        [property]: value

                    },
                    ...this.state.columns.slice(index + 1)
                ]
            });
        }
        else {
            // TODO: Impossible happened
        }
    }

    resolveColumnValue(index: number, property: string) {
        const column = this.state.columns[index];
        if (column) {
            return column[property];
        }
        else {
            return null;
        }
    }

    isIndexDenied(index: number) {
        const columnType = this.resolveColumnValue(index, 'type');
        return !!columnTypes.find(l => l.name === columnType && l.denyIndex);
    }

    render() {
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
                    <li>
                        <FormattedMessage id="admin.tables.create" defaultMessage="Create" />
                    </li>
                </ol>
                <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)}>
                    <Panel
                        bsStyle="default"
                        footer={
                            <div className="clearfix">
                                <div className="pull-left">
                                    <Button bsStyle="primary" onClick={this.onNewColumn.bind(this)}>
                                        <FormattedMessage id="admin.tables.column.add" defaultMessage="Add column" />
                                    </Button>
                                </div>
                                <div className="pull-right">
                                    <Button bsStyle="primary" type="submit">
                                        <FormattedMessage id="admin.save" defaultMessage="Save" />
                                    </Button>
                                </div>
                            </div>
                        }
                    >
                        <Validation.components.ValidatedFormGroup for="name">
                            <label htmlFor="name">
                                <FormattedMessage id="admin.tables.name" defaultMessage="Name" />
                            </label>
                            <Validation.components.ValidatedControl name="name" type="text" validators={[Validation.validators.required]} />
                        </Validation.components.ValidatedFormGroup>
                        <div className="form-group mb0">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover preline">
                                    <thead>
                                        <tr>
                                            <th>
                                                <FormattedMessage id="admin.tables.column" defaultMessage="Column" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="admin.tables.column.type" defaultMessage="Type" />
                                            </th>
                                            <th style={{ width: 1 }}>
                                                <FormattedMessage id="admin.tables.column.index" defaultMessage="Index" />
                                            </th>
                                            <th style={{ width: 1 }}>
                                                <FormattedMessage id="admin.tables.column.action" defaultMessage="Action" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className="form-control-static">id</p>
                                            </td>
                                            <td>
                                                <select className="form-control" disabled>
                                                    <option>Number</option>
                                                </select>

                                            </td>
                                            <td>
                                                <Checkbox readOnly checked />
                                            </td>
                                            <td />
                                        </tr>
                                        {this.state.columns.map((col, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Validation.components.ValidatedFormGroup for={index + '_name'} className="m0">
                                                        <Validation.components.ValidatedControl
                                                            type="text"
                                                            name={index + '_name'}
                                                            value={this.resolveColumnValue(index, 'name')}
                                                            validators={[Validation.validators.required]}
                                                            onChange={(e: any) => this.onColumnUpdate(index, 'name', e.target.value)}
                                                        />
                                                    </Validation.components.ValidatedFormGroup>
                                                </td>
                                                <td>
                                                    <Validation.components.ValidatedSelect
                                                        name={index + '_type'}
                                                        value={this.resolveColumnValue(index, 'type')}
                                                        onChange={e => this.onColumnUpdate(index, 'type', e.target.value)}
                                                    >
                                                        {columnTypes.map(type => (
                                                            <option key={type.name} value={type.name}>
                                                                {type.title}
                                                            </option>
                                                        ))}
                                                    </Validation.components.ValidatedSelect>
                                                </td>
                                                <td>
                                                    <Validation.components.ValidatedCheckbox
                                                        name={index + '_index'}
                                                        checked={this.isIndexDenied(index) ? false : (this.resolveColumnValue(index, 'index') || false)}
                                                        disabled={this.isIndexDenied(index)}
                                                        onChange={e => this.onColumnUpdate(index, 'index', e.target.checked || false)}
                                                    />
                                                </td>
                                                <td>
                                                    <Button
                                                        type="button"
                                                        bsStyle="primary"
                                                        onClick={this.onDropColumn.bind(this, index)}
                                                        disabled={1 >= this.state.columns.length}
                                                    >
                                                        (-)
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Panel>
                </Validation.components.ValidatedForm>
            </div >
        );
    }
}

export default Create;