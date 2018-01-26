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
import { js } from 'js-beautify';
import { Button, Col, FormControlProps, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import Editor from 'components/Editor';

import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Validation from 'components/Validation';
import TxButton from 'containers/Widgets/TxButton';

interface IContractEditorProps {
    vde?: boolean;
    contractName: string;
    bound: boolean;
    code: string;
    wallet: string;
    conditions: string;
    contract?: {
        id: string;
        active: string;
        name: string;
        conditions: string;
        address: string;
        value: string;
    };
    setBound: (bound: boolean) => void;
    onSourceEdit: (code: string) => void;
    onWalletEdit: React.FormEventHandler<React.Component<FormControlProps>>;
    onConditionsEdit: React.ChangeEventHandler<React.Component<FormControlProps>>;
    onExec?: (block: string, error?: { type: string, error: string }) => void;
    mapContractParams: (values: { [key: string]: any }) => { values: { [key: string]: any } };
}

const ContractEditor: React.SFC<IContractEditorProps> = (props) => (
    <ValidatedContractForm vde={props.vde} className="flex-col flex-stretch" contractName={props.contractName} mapContractParams={props.mapContractParams} onExec={props.onExec}>
        <Validation.components.ValidatedFormGroup for="content" className="flex-col flex-stretch">
            <div className="form-control p0 flex-col flex-stretch">
                <Editor
                    language="simvolio"
                    value={props.code}
                    onChange={props.onSourceEdit}
                    options={{
                        automaticLayout: true,
                        contextmenu: false,
                        scrollBeyondLastLine: false
                    }}
                />
            </div>
        </Validation.components.ValidatedFormGroup>
        <Validation.components.ValidatedFormGroup for="address">
            <label htmlFor="address">
                <FormattedMessage id="admin.contracts.wallet" defaultMessage="Wallet" />
            </label>
            <Row className="p0">
                <Col md={props.contract ? 10 : 12}>
                    <Validation.components.ValidatedControl key="walletCreate" name="wallet" onChange={props.onWalletEdit} value={props.wallet} />
                </Col>
                {props.contract && (
                    <Col md={2}>
                        {props.bound ?
                            (
                                <TxButton className="btn btn-primary btn-block" contractName="@1DeactivateContract" contractParams={{ Id: props.contract.id }} onExec={block => block && props.setBound(false)}>
                                    <FormattedMessage id="admin.contracts.unbind" defaultMessage="Unbind" />
                                </TxButton>
                            ) : (
                                <TxButton className="btn btn-primary btn-block" contractName="@1ActivateContract" contractParams={{ Id: props.contract.id }} onExec={block => block && props.setBound(true)}>
                                    <FormattedMessage id="admin.contracts.bind" defaultMessage="Bind" />
                                </TxButton>
                            )
                        }
                    </Col>
                )}
            </Row>
        </Validation.components.ValidatedFormGroup>
        <Validation.components.ValidatedFormGroup for="conditions" className="mb0">
            <label htmlFor="conditions">
                <FormattedMessage id="admin.conditions.change" defaultMessage="Change conditions" />
            </label>
            <Validation.components.ValidatedControl type="text" name="conditions" onChange={props.onConditionsEdit} value={props.conditions} validators={[Validation.validators.required]} />
        </Validation.components.ValidatedFormGroup>

        <div>
            <hr />
            <Validation.components.ValidatedSubmit bsStyle="primary">
                <FormattedMessage id="admin.save" defaultMessage="Save" />
            </Validation.components.ValidatedSubmit>

            <Button bsStyle="link" type="button" onClick={() => props.onSourceEdit(js(props.code))}>
                <em className="fa fa-code fa-fw mr-sm" />
                <FormattedMessage id="admin.contract.format" defaultMessage="Format code" />
            </Button>
        </div>

    </ValidatedContractForm>
);

export default ContractEditor;