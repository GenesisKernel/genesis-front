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
import { Button, Col, Panel, Row, FormControlProps } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import MonacoEditor from 'react-monaco-editor';

import Validation from 'components/Validation';

interface IContractEditorProps {
    pending: boolean;
    code: string;
    wallet: string;
    conditions: string;
    active?: boolean;
    onSubmit: (values: { [key: string]: any }) => void;
    onSourceEdit: (code: string) => void;
    onWalletEdit: React.FormEventHandler<React.Component<FormControlProps>>;
    onConditionsEdit: React.ChangeEventHandler<HTMLTextAreaElement>;
    onContractActivation?: () => void;
}

const ContractEditor: React.SFC<IContractEditorProps> = (props) => (
    <Row>
        <Col md={12}>
            <Validation.components.ValidatedForm onSubmitSuccess={props.onSubmit}>
                <Panel
                    bsStyle="default"
                    footer={(
                        <div className="clearfix">
                            <Button bsStyle="default" type="button" className="pull-left" disabled>
                                <em className="fa fa-code fa-fw mr-sm" />
                                <FormattedMessage id="admin.contract.format" defaultMessage="Format code" />
                            </Button>

                            <Button bsStyle="primary" type="submit" className="pull-right" disabled={props.pending}>
                                <FormattedMessage id="admin.save" defaultMessage="Save" />
                            </Button>
                        </div>
                    )}
                >
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
                    {undefined !== props.active && (
                        <Validation.components.ValidatedFormGroup for="active">
                            <label htmlFor="active">
                                <FormattedMessage id="admin.contracts.active" defaultMessage="Active" />
                            </label>
                            <p className="form-control-static">
                                {props.active ?
                                    (
                                        <FormattedMessage id="admin.contracts.active.true" defaultMessage="True" />
                                    ) : (
                                        <span className="clearfix">
                                            <FormattedMessage id="admin.contracts.active.false" defaultMessage="False" />
                                            <Button bsStyle="primary" onClick={props.onContractActivation} className="pull-right">
                                                <FormattedMessage id="admin.contracts.activate" defaultMessage="Activate" />
                                            </Button>
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
                        {undefined === props.active ?
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
                </Panel>
            </Validation.components.ValidatedForm>
        </Col>
    </Row >
);

export default ContractEditor;