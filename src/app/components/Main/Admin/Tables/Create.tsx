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
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import DocumentTitle from 'components/DocumentTitle';
import Heading from 'components/Heading';
import PageLink from 'containers/Routing/PageLink';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Validation from 'components/Validation';

export const columnTypes = [
    {
        name: 'text',
        title: 'Text'
    },
    {
        name: 'datetime',
        title: 'Date/Time'
    },
    {
        name: 'varchar',
        title: 'Varchar'
    },
    {
        name: 'character',
        title: 'Character'
    },
    {
        name: 'json',
        title: 'JSON'
    },
    {
        name: 'number',
        title: 'Number'
    },
    {
        name: 'money',
        title: 'Money'
    },
    {
        name: 'double',
        title: 'Double'
    },
    {
        name: 'bytea',
        title: 'Binary'
    },
];

export interface ICreateProps {
    vde?: boolean;
    navigate: (url: string) => void;
}

interface ICreateState {
    columns: {
        name: string;
        type: string;
    }[];
}

class Create extends React.Component<ICreateProps, ICreateState> {
    constructor(props: ICreateProps) {
        super(props);
        this.state = {
            columns: [
                {
                    name: '',
                    type: columnTypes[0].name
                }
            ]
        };
    }

    mapContractParams(values: { [key: string]: any }) {
        return {
            Name: values.name,
            Columns: JSON.stringify(this.state.columns.map(col => ({
                name: col.name,
                type: col.type,
                conditions: 'true'
            }))),
            Permissions: JSON.stringify({
                insert: 'true',
                update: 'true',
                new_column: 'true'
            })
        };
    }

    onExec(block: string, error: string) {
        if (block) {
            this.props.vde ?
                this.props.navigate('/vde/tables') :
                this.props.navigate('/admin/tables');
        }
    }

    onNewColumn() {
        this.setState({
            columns: [
                ...this.state.columns,
                {
                    name: '',
                    type: columnTypes[0].name,
                }
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

    render() {
        return (
            <DocumentTitle title="admin.tables.create" defaultTitle="Create table">
                <div>
                    <Heading>
                        <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                    </Heading>
                    <div className="content-wrapper">
                        <ol className="breadcrumb">
                            <li>
                                <PageLink page="tables" section="admin" vde={this.props.vde}>
                                    <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                                </PageLink>
                            </li>
                            <li>
                                <FormattedMessage id="admin.create" defaultMessage="Create" />
                            </li>
                        </ol>
                        <ValidatedContractForm vde={this.props.vde} contractName="@1NewTable" mapContractParams={this.mapContractParams.bind(this)} onExec={this.onExec.bind(this)}>
                            <div className="panel panel-default">
                                <div className="panel-body">
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
                                                                <Button
                                                                    type="button"
                                                                    bsStyle="primary"
                                                                    onClick={this.onDropColumn.bind(this, index)}
                                                                    disabled={1 >= this.state.columns.length}
                                                                >
                                                                    <span>(-)</span>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-footer">
                                    <div className="clearfix">
                                        <div className="pull-left">
                                            <Button bsStyle="primary" onClick={this.onNewColumn.bind(this)}>
                                                <FormattedMessage id="admin.tables.column.add" defaultMessage="Add column" />
                                            </Button>
                                        </div>
                                        <div className="pull-right">
                                            <Validation.components.ValidatedSubmit bsStyle="primary">
                                                <FormattedMessage id="admin.save" defaultMessage="Save" />
                                            </Validation.components.ValidatedSubmit>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ValidatedContractForm>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default Create;