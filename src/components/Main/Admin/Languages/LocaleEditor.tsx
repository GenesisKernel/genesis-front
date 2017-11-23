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
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Validation from 'components/Validation';

export interface ILocaleEditorProps {
    vde?: boolean;
    contractName: string;
    translation?: string;
    translations: {
        name: string;
        value: string;
    }[];
    onNewLocale: () => void;
    onDropLocale?: (index: number) => void;
    onTranslationUpdate: (index: number, property: string, value: any) => void;
    resolveTranslationValue: (index: number, property: string) => any;
    mapContractParams: (values: { [key: string]: any }) => { [key: string]: any };
    onExec?: (block: string, error: string) => void;
}

const LocaleEditor: React.SFC<ILocaleEditorProps> = (props) => (
    <ValidatedContractForm vde={props.vde} contractName={props.contractName} mapContractParams={props.mapContractParams} onExec={props.onExec}>
        <div className="panel panel-default">
            <div className="panel-body">
                <Validation.components.ValidatedFormGroup for="name">
                    <label htmlFor="name">
                        <FormattedMessage id="admin.languages.name" defaultMessage="Name" />
                    </label>
                    {props.translation ?
                        (
                            <Validation.components.ValidatedControl key="nameEdit" name="name" type="text" value={props.translation} readOnly />
                        ) : (
                            <Validation.components.ValidatedControl key="nameCreate" name="name" type="text" validators={[Validation.validators.required]} />
                        )
                    }
                </Validation.components.ValidatedFormGroup>
                <div className="form-group mb0">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover preline">
                            <thead>
                                <tr>
                                    <th style={{ width: 100 }}>
                                        <FormattedMessage id="admin.languages.locale" defaultMessage="Locale" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="admin.languages.value" defaultMessage="Value" />
                                    </th>
                                    {props.onDropLocale && (
                                        <th style={{ width: 1 }}>
                                            <FormattedMessage id="admin.languages.action" defaultMessage="Action" />
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {props.translations.map((col, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Validation.components.ValidatedFormGroup for={index + '_name'} className="m0">
                                                <Validation.components.ValidatedControl
                                                    type="text"
                                                    name={index + '_name'}
                                                    value={props.resolveTranslationValue(index, 'name')}
                                                    validators={[Validation.validators.required]}
                                                    onChange={(e: any) => props.onTranslationUpdate(index, 'name', e.target.value)}
                                                />
                                            </Validation.components.ValidatedFormGroup>
                                        </td>
                                        <td>
                                            <Validation.components.ValidatedFormGroup for={index + '_value'} className="m0">
                                                <Validation.components.ValidatedControl
                                                    type="text"
                                                    name={index + '_value'}
                                                    value={props.resolveTranslationValue(index, 'value')}
                                                    validators={[Validation.validators.required]}
                                                    onChange={(e: any) => props.onTranslationUpdate(index, 'value', e.target.value)}
                                                />
                                            </Validation.components.ValidatedFormGroup>
                                        </td>
                                        {props.onDropLocale && (
                                            <td>
                                                <Button
                                                    type="button"
                                                    bsStyle="primary"
                                                    onClick={() => props.onDropLocale(index)}
                                                    disabled={1 >= props.translations.length}
                                                >
                                                    <span>(-)</span>
                                                </Button>
                                            </td>
                                        )}
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
                        <Button bsStyle="primary" onClick={props.onNewLocale}>
                            <FormattedMessage id="admin.languages.add" defaultMessage="Add localization" />
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
);

export default LocaleEditor;