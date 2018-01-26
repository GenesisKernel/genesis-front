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
import { FormattedMessage } from 'react-intl';
import { IParameterResponse } from 'lib/api';

import Wrapper from 'components/Wrapper';
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
            <Wrapper
                type="noscroll"
                title={{
                    title: 'admin.parameters',
                    defaultTitle: 'Ecosystem parameters'
                }}
                heading={{
                    content: (
                        <FormattedMessage id="admin.parameters" defaultMessage="Ecosystem parameters" />
                    )
                }}
                breadcrumbs={[
                    {
                        url: this.props.vde ? '/vde/parameters' : '/admin/parameters',
                        title: (
                            <FormattedMessage id="admin.parameters" defaultMessage="Ecosystem parameters" />
                        )
                    },
                    {
                        title: this.props.parameter.name
                    }
                ]}
            >
                <ParameterEditor
                    vde={this.props.vde}
                    name={this.props.parameter.name}
                    value={this.state.value}
                    conditions={this.state.conditions}
                    contractName="@1EditParameter"
                    mapContractParams={this.mapContractParams.bind(this)}
                    onValueEdit={this.onValueEdit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                />
            </Wrapper>
        );
    }
}

export default Edit;