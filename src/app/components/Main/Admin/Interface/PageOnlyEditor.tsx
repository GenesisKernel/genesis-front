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
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Editor from 'components/Editor';

import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Validation from 'components/Validation';

interface IPageEditorProps {
    vde?: boolean;
    contractName: string;
    template: string;
    conditions: string;
    page?: { id: string, name: string, conditions: string, value: string };
    menu: { id: string, name: string, conditions: string, value: string };
    menus: { id: string, name: string, conditions: string, value: string }[];
    onSourceEdit: (code: string) => void;
    onConditionsEdit: React.ChangeEventHandler<HTMLTextAreaElement>;
    onMenuSelect: React.ChangeEventHandler<HTMLSelectElement>;
    onExec?: (block: string, error: string) => void;
    mapContractParams: (values: { [key: string]: any }) => { values: { [key: string]: any } };
}

const PageEditor: React.SFC<IPageEditorProps> = (props) => (
    <ValidatedContractForm vde={props.vde} contractName={props.contractName} mapContractParams={props.mapContractParams} onExec={props.onExec && props.onExec}>
        <div className="panel panel-primary">
            <div className="panel-body">
                <Validation.components.ValidatedFormGroup for="name">
                    <label htmlFor="name">
                        <FormattedMessage id="admin.interface.page.name" defaultMessage="Name" />
                    </label>
                    {props.page ?
                        (
                            <Validation.components.ValidatedControl key="nameEdit" name="name" readOnly value={props.page.name} />
                        ) : (
                            <Validation.components.ValidatedControl key="nameCreate" name="name" validators={[Validation.validators.required]} />
                        )
                    }
                </Validation.components.ValidatedFormGroup>
                <Validation.components.ValidatedFormGroup for="content">
                    <label htmlFor="content">
                        <FormattedMessage id="admin.interface.page.content" defaultMessage="Content" />
                    </label>
                    <div className="form-control" style={{ height: 'auto', padding: 0 }}>
                        <Editor
                            height={400}
                            language="protypo"
                            value={props.template}
                            onChange={props.onSourceEdit}
                            options={{
                                automaticLayout: true,
                                contextmenu: false,
                                scrollBeyondLastLine: false
                            }}
                        />
                    </div>
                </Validation.components.ValidatedFormGroup>
                <Validation.components.ValidatedFormGroup for="menu">
                    <label htmlFor="menu">
                        <FormattedMessage id="admin.interface.menu" defaultMessage="Menu" />
                    </label>
                    <Validation.components.ValidatedSelect name="menu" validators={[Validation.validators.required]} onChange={props.onMenuSelect} value={props.menu ? props.menu.name : ''}>
                        {props.menus.map(menu => (
                            <option key={menu.id} value={menu.name}>{menu.name}</option>
                        ))}
                    </Validation.components.ValidatedSelect>
                </Validation.components.ValidatedFormGroup>
                <Validation.components.ValidatedFormGroup for="conditions" className="mb0">
                    <label htmlFor="conditions">
                        <FormattedMessage id="admin.conditions.change" defaultMessage="Change conditions" />
                    </label>
                    <Validation.components.ValidatedTextarea name="conditions" onChange={props.onConditionsEdit} value={props.conditions} validators={[Validation.validators.required]} />
                </Validation.components.ValidatedFormGroup>
            </div>
            <div className="panel-footer">
                <div className="text-right">
                    {props.page ?
                        (
                            <Link to={`/${props.vde ? 'vde' : 'admin'}/interface/page/${props.page.id}-${props.page.name}/constructor`} className="btn btn-primary pull-left">
                                Open in Constructor
                            </Link>
                        ) : (
                            <Link to={`/${props.vde ? 'vde' : 'admin'}/interface/create-page/constructor`} className="btn btn-primary pull-left">
                                Open in Constructor
                        </Link>
                        )
                    }

                    <Validation.components.ValidatedSubmit bsStyle="primary">
                        <FormattedMessage id="admin.save" defaultMessage="Save" />
                    </Validation.components.ValidatedSubmit>
                </div>
            </div>
        </div>
    </ValidatedContractForm>
);

export default PageEditor;