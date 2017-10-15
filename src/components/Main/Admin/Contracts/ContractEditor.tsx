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
import { Button, Col, Row, FormControlProps } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import MonacoEditor from 'react-monaco-editor';

import TxButton from 'containers/Widgets/TxButton';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Validation from 'components/Validation';

interface IContractEditorProps {
    contractName: string;
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
    onSourceEdit: (code: string) => void;
    onWalletEdit: React.FormEventHandler<React.Component<FormControlProps>>;
    onConditionsEdit: React.ChangeEventHandler<HTMLTextAreaElement>;
    onContractActivation?: (block: string, error: string) => void;
    onExec?: (block: string, error: string) => void;
    mapContractParams: (values: { [key: string]: any }) => { values: { [key: string]: any } };
}

const ContractEditor: React.SFC<IContractEditorProps> = (props) => (
    <Row>
        <Col md={12}>
            <ValidatedContractForm contractName={props.contractName} mapContractParams={props.mapContractParams} onExec={props.onExec && props.onExec}>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <Validation.components.ValidatedFormGroup for="content">
                            <label htmlFor="content">
                                <FormattedMessage id="admin.contract.code" defaultMessage="Code" />
                            </label>
                            <div className="form-control" style={{ height: 'auto', padding: 0 }}>
                                <MonacoEditor
                                    height={400}
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
                        {props.contract && (
                            <Validation.components.ValidatedFormGroup for="active">
                                <label htmlFor="active">
                                    <FormattedMessage id="admin.contracts.active" defaultMessage="Active" />
                                </label>
                                <p className="form-control-static">
                                    {'1' === props.contract.active ?
                                        (
                                            <FormattedMessage id="admin.contracts.active.true" defaultMessage="True" />
                                        ) : (
                                            <span className="clearfix">
                                                <FormattedMessage id="admin.contracts.active.false" defaultMessage="False" />
                                                <TxButton
                                                    contractName="ActivateContract"
                                                    contractParams={{ Id: props.contract.id }}
                                                    bsStyle="primary"
                                                    className="pull-right"
                                                    onExec={props.onContractActivation}
                                                >
                                                    <FormattedMessage id="admin.contracts.activate" defaultMessage="Activate" />
                                                </TxButton>
                                            </span>
                                        )
                                    }
                                </p>
                            </Validation.components.ValidatedFormGroup>
                        )}
                        <Validation.components.ValidatedFormGroup for="address">
                            <label htmlFor="address">
                                <FormattedMessage id="admin.contracts.wallet" defaultMessage="Wallet" />
                            </label>
                            {props.contract ?
                                (
                                    <Validation.components.ValidatedControl key="walletCreate" name="wallet" onChange={props.onWalletEdit} value={props.wallet} />
                                ) : (
                                    <Validation.components.ValidatedControl key="walletEdit" name="wallet" value={props.wallet} readOnly />
                                )
                            }
                        </Validation.components.ValidatedFormGroup>
                        <Validation.components.ValidatedFormGroup for="conditions" className="mb0">
                            <label htmlFor="conditions">
                                <FormattedMessage id="admin.conditions.change" defaultMessage="Change conditions" />
                            </label>
                            <Validation.components.ValidatedTextarea name="conditions" onChange={props.onConditionsEdit} value={props.conditions} validators={[Validation.validators.required]} />
                        </Validation.components.ValidatedFormGroup>
                    </div>
                    <div className="panel-footer">
                        <div className="clearfix">
                            <Button bsStyle="default" type="button" className="pull-left" disabled>
                                <em className="fa fa-code fa-fw mr-sm" />
                                <FormattedMessage id="admin.contract.format" defaultMessage="Format code" />
                            </Button>

                            <Validation.components.ValidatedSubmit bsStyle="primary" className="pull-right">
                                <FormattedMessage id="admin.save" defaultMessage="Save" />
                            </Validation.components.ValidatedSubmit>
                        </div>
                    </div>
                </div>
            </ValidatedContractForm>
        </Col>
    </Row >
);

export default ContractEditor;