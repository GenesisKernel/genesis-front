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

import Editor from 'components/Editor';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Validation from 'components/Validation';

export interface IParameterEditorProps {
    vde?: boolean;
    name?: string;
    value: string;
    conditions: string;
    contractName: string;
    mapContractParams: (values: { [key: string]: any }) => { [key: string]: any };
    onExec?: (block: string, error?: { type: string, error: string }) => void;
    onValueEdit: (value: string) => void;
    onConditionsEdit: (value: string) => void;
}

const ParameterEditor: React.SFC<IParameterEditorProps> = (props) => (
    <ValidatedContractForm className="flex-col flex-stretch" vde={props.vde} contractName={props.contractName} mapContractParams={props.mapContractParams} onExec={props.onExec}>
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

        <Validation.components.ValidatedFormGroup for="value" className="flex-col flex-stretch">
            <label htmlFor="value">
                <FormattedMessage id="admin.parameters.value" defaultMessage="Value" />
            </label>
            {'stylesheet' === props.name ?
                (
                    <div className="form-control flex-col flex-stretch p0">
                        <Editor
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
                    <Validation.components.ValidatedTextarea className="flex-stretch" name="value" onChange={e => props.onValueEdit(e.target.value)} value={props.value || ''} validators={[Validation.validators.required]} />
                )
            }
        </Validation.components.ValidatedFormGroup>

        <Validation.components.ValidatedFormGroup for="conditions" className="mb0">
            <label htmlFor="conditions">
                <FormattedMessage id="admin.conditions.change" defaultMessage="Change conditions" />
            </label>
            <Validation.components.ValidatedControl type="text" name="conditions" onChange={e => props.onConditionsEdit((e.target as HTMLInputElement).value)} value={props.conditions || ''} validators={[Validation.validators.required]} />
        </Validation.components.ValidatedFormGroup>

        <div>
            <hr />
            <Validation.components.ValidatedSubmit bsStyle="primary">
                <FormattedMessage id="admin.save" defaultMessage="Save" />
            </Validation.components.ValidatedSubmit>
        </div>
    </ValidatedContractForm>
);

export default ParameterEditor;