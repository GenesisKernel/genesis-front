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
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';

import Table, { ICellRenderer } from 'components/Table';
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
    onExec?: (block: string, error?: { type: string, error: string }) => void;
}

const LocaleEditor: React.SFC<ILocaleEditorProps & InjectedIntlProps> = (props) => {
    const renderParameter: ICellRenderer = (value, rowData) => {
        const index = rowData.rowData[2] as number;

        switch (rowData.colIndex) {
            case 0: return (
                <Validation.components.ValidatedFormGroup for={index + '_name'} className="m0">
                    <Validation.components.ValidatedControl
                        type="text"
                        name={index + '_name'}
                        value={value}
                        validators={[Validation.validators.required]}
                        onChange={(e: any) => props.onTranslationUpdate(index, 'name', e.target.value)}
                    />
                </Validation.components.ValidatedFormGroup>
            );

            case 1: return (
                <Validation.components.ValidatedFormGroup for={index + '_value'} className="m0">
                    <Validation.components.ValidatedControl
                        type="text"
                        name={index + '_value'}
                        value={props.resolveTranslationValue(index, 'value')}
                        validators={[Validation.validators.required]}
                        onChange={(e: any) => props.onTranslationUpdate(index, 'value', e.target.value)}
                    />
                </Validation.components.ValidatedFormGroup>
            );

            case 2: return (
                <Button
                    bsStyle="default"
                    className="btn-labeled btn-icon"
                    onClick={() => props.onDropLocale(rowData.rowIndex)}
                    disabled={1 >= props.translations.length}
                >
                    <span className="btn-label">
                        <em className="icon-trash" />
                    </span>
                </Button>
            );

            default: return value;
        }
    };

    return (
        <ValidatedContractForm vde={props.vde} className="flex-col flex-stretch" contractName={props.contractName} mapContractParams={props.mapContractParams} onExec={props.onExec}>
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

            <div className="form-group mb0 flex-col flex-stretch">
                <div className="table-responsive form-element flex-stretch">
                    <Table
                        striped
                        renderCell={renderParameter}
                        columns={[
                            { title: props.intl.formatMessage({ id: 'admin.languages.locale', defaultMessage: 'Locale' }), width: 100 },
                            { title: props.intl.formatMessage({ id: 'admin.parameters.value', defaultMessage: 'Value' }) },
                            { width: 1 }
                        ]}
                        data={props.translations.map((p, index) => [p.name, p.value, index])}
                    />
                </div>
            </div>

            <div>
                <hr />
                <Validation.components.ValidatedSubmit bsStyle="primary">
                    <FormattedMessage id="admin.save" defaultMessage="Save" />
                </Validation.components.ValidatedSubmit>
                <Button bsStyle="link" onClick={props.onNewLocale}>
                    <FormattedMessage id="admin.languages.add" defaultMessage="Add localization" />
                </Button>
            </div>
        </ValidatedContractForm>
    );
};

export default injectIntl(LocaleEditor);