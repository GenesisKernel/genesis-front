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

import DocumentTitle from 'components/DocumentTitle';
import ParameterEditor from './ParameterEditor';

export interface ICreateProps {
    navigate: (url: string) => void;
}

interface ICreateState {
    value: string;
    conditions: string;
}

class Create extends React.Component<ICreateProps, ICreateState> {
    constructor(props: ICreateProps) {
        super(props);
        this.state = {
            value: '',
            conditions: ''
        };
    }

    mapContractParams(values: { [key: string]: any }) {
        return {
            Name: values.name,
            Value: this.state.value,
            Conditions: this.state.conditions
        };
    }

    onExec(block: string, error: string) {
        // TODO: Notification stub
        if (block) {
            this.props.navigate('/admin/parameters');
            alert('Success:: ' + block);
        }
        else if (error) {
            alert('Error:: ' + error);
        }
    }

    onValueEdit(value: string) {
        this.setState({
            value
        });
    }

    onConditionsEdit(conditions: string) {
        this.setState({
            conditions
        });
    }

    render() {
        return (
            <DocumentTitle title="admin.parameters.create" defaultTitle="Create parameter">
                <div className="content-wrapper">
                    <div className="content-heading">
                        <FormattedMessage id="admin.parameters" defaultMessage="Ecosystem parameters" />
                    </div>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/admin/parameters">
                                <FormattedMessage id="admin.parameters" defaultMessage="Ecosystem parameters" />
                            </Link>
                        </li>
                        <li>
                            <FormattedMessage id="admin.create" defaultMessage="Create" />
                        </li>
                    </ol>
                    <ParameterEditor
                        value={this.state.value}
                        conditions={this.state.conditions}
                        contractName="@1NewParameter"
                        mapContractParams={this.mapContractParams.bind(this)}
                        onExec={this.onExec.bind(this)}
                        onValueEdit={this.onValueEdit.bind(this)}
                        onConditionsEdit={this.onConditionsEdit.bind(this)}
                    />
                </div>
            </DocumentTitle>
        );
    }
}

export default Create;