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

import Editor from 'components/Editor';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Validation from 'components/Validation';

export interface IParameterEditorProps {
    name?: string;
    value: string;
    conditions: string;
    contractName: string;
    mapContractParams: (values: { [key: string]: any }) => { [key: string]: any };
    onExec?: (block: string, error: string) => void;
    onValueEdit: (value: string) => void;
    onConditionsEdit: (value: string) => void;
}

const ParameterEditor: React.SFC<IParameterEditorProps> = (props) => (
    <ValidatedContractForm contractName={props.contractName} mapContractParams={props.mapContractParams} onExec={props.onExec}>
        <div className="panel panel-default">
            <div className="panel-body">
                <Validation.components.ValidatedFormGroup for="name">
                    <label htmlFor="name">
                        <FormattedMessage id="admin.parameters.name" defaultMessage="Name" />
                    </label>
                    {props.name ?
                        (
                            <Validation.components.ValidatedControl key="nameEdit" type="text" name="name" readOnly value={props.name} />
                        ) : (
                            <Validation.components.ValidatedControl key="nameCreate" type="text" name="name" validators={[Validation.validators.required]} />
                        )
                    }
                </Validation.components.ValidatedFormGroup>
                <Validation.components.ValidatedFormGroup for="value">
                    <label htmlFor="value">
                        <FormattedMessage id="admin.parameters.value" defaultMessage="Value" />
                    </label>
                    {'stylesheet' === props.name ?
                        (
                            <div className="form-control" style={{ height: 'auto', padding: 0 }}>
                                <Editor
                                    height={400}
                                    language="css"
                                    value={props.value}
                                    onChange={value => props.onValueEdit(value)}
                                    options={{
                                        automaticLayout: true,
                                        contextmenu: false,
                                        scrollBeyondLastLine: false
                                    }}
                                />
                            </div>
                        ) : (
                            <Validation.components.ValidatedTextarea name="value" onChange={e => props.onValueEdit(e.target.value)} value={props.value || ''} validators={[Validation.validators.required]} />
                        )
                    }
                </Validation.components.ValidatedFormGroup>
                <Validation.components.ValidatedFormGroup for="conditions" className="mb0">
                    <label htmlFor="conditions">
                        <FormattedMessage id="admin.conditions.change" defaultMessage="Change conditions" />
                    </label>
                    <Validation.components.ValidatedTextarea name="conditions" onChange={e => props.onConditionsEdit(e.target.value)} value={props.conditions || ''} validators={[Validation.validators.required]} />
                </Validation.components.ValidatedFormGroup>
            </div>
            <div className="panel-footer">
                <div className="clearfix">
                    <Validation.components.ValidatedSubmit bsStyle="primary" className="pull-right">
                        <FormattedMessage id="admin.save" defaultMessage="Save" />
                    </Validation.components.ValidatedSubmit>
                </div>
            </div>
        </div>
    </ValidatedContractForm>
);

export default ParameterEditor;