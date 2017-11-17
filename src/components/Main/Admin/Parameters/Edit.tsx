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
import { IParameterResponse } from 'lib/api';

import DocumentTitle from 'components/DocumentTitle';
import Heading from 'containers/Widgets/Heading';
import ParameterEditor from './ParameterEditor';

export interface IEditProps {
    vde?: boolean;
    tabView?: boolean;
    parameter: IParameterResponse;
}

interface IEditState {
    value: string;
    conditions: string;
}

class Edit extends React.Component<IEditProps, IEditState> {
    constructor(props: IEditProps) {
        super(props);

        this.state = {
            value: props.parameter ? props.parameter.value : '',
            conditions: props.parameter ? props.parameter.conditions : ''
        };
    }

    componentWillReceiveProps(props: IEditProps) {
        if (!this.props.parameter && props.parameter) {
            this.setState({
                value: props.parameter.value,
                conditions: props.parameter.conditions
            });
        }
    }

    mapContractParams(values: { [key: string]: any }) {
        return {
            Id: this.props.parameter.id,
            Value: this.state.value,
            Conditions: this.state.conditions
        };
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
        if (this.props.tabView) {
            return (
                <ParameterEditor
                    vde={this.props.vde}
                    name={this.props.parameter && this.props.parameter.name}
                    value={this.state.value}
                    conditions={this.state.conditions}
                    contractName="@1EditParameter"
                    mapContractParams={this.mapContractParams.bind(this)}
                    onValueEdit={this.onValueEdit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                />
            );
        }

        return (
            <DocumentTitle title={this.props.parameter && this.props.parameter.name}>
                <div>
                    <Heading>
                        <FormattedMessage id="admin.parameters" defaultMessage="Ecosystem parameters" />
                    </Heading>
                    <div className="content-wrapper">
                        <ol className="breadcrumb">
                            <li>
                                <Link to={this.props.vde ? '/vde/parameters' : '/admin/parameters'}>
                                    <FormattedMessage id="admin.parameters" defaultMessage="Ecosystem parameters" />
                                </Link>
                            </li>
                            {this.props.parameter && (
                                <li>
                                    {this.props.parameter.name}
                                </li>
                            )}
                        </ol>
                        <ParameterEditor
                            vde={this.props.vde}
                            name={this.props.parameter && this.props.parameter.name}
                            value={this.state.value}
                            conditions={this.state.conditions}
                            contractName="@1EditParameter"
                            mapContractParams={this.mapContractParams.bind(this)}
                            onValueEdit={this.onValueEdit.bind(this)}
                            onConditionsEdit={this.onConditionsEdit.bind(this)}
                        />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default Edit;