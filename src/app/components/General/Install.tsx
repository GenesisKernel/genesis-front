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
import { Button, Col, FormGroup, Well } from 'react-bootstrap';
import styled from 'styled-components';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { install } from 'modules/engine/actions';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import General from 'components/General';

const fieldsetMargin = 10;
const StyledInstallForm = styled.div`
    fieldset {
        margin-top: ${fieldsetMargin}px;
        margin-bottom: ${fieldsetMargin}px;
    }
`;

import Checkbox from 'components/Checkbox';
import Validation from 'components/Validation';

export interface IInstallProps extends InjectedIntlProps {
    isInstalling: boolean;
    install: typeof install.started;
}

interface IInstallState {
    type?: string;
    generateFirst?: boolean;
}

class InstallForm extends React.Component<IInstallProps, IInstallState> {
    constructor(props: IInstallProps) {
        super(props);
        this.state = {
            type: 'PRIVATE_NET',
            generateFirst: true
        };
    }

    onTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            type: e.target.value
        });
    }

    onGenerateFirstChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            generateFirst: e.target.checked
        });
    }

    onSubmit(values: { [key: string]: string }) {
        this.props.install({
            type: values.type,
            log_level: values.logLevel,
            db_host: values.dbHost,
            db_port: parseInt(values.dbPort, 10),
            db_name: values.dbName,
            db_user: values.dbUser,
            db_pass: values.dbPass,
            first_block_dir: values.blockDir,
            generate_first_block: Number(this.state.generateFirst),
            centrifugo_url: values.pushHost,
            centrifugo_secret: values.pushSecret
        });
    }

    render() {
        return (
            <LocalizedDocumentTitle title="general.install" defaultTitle="Install">
                <General>
                    <StyledInstallForm>
                        <Validation.components.ValidatedForm className="form-horizontal component-install-form" onSubmitSuccess={this.onSubmit.bind(this)}>
                            <fieldset>
                                <FormGroup>
                                    <Col md={3}>
                                        <label className="control-label">
                                            <FormattedMessage id="install.mode" defaultMessage="Mode" />
                                        </label>
                                    </Col>
                                    <Col md={9}>
                                        <Validation.components.ValidatedSelect name="type" defaultValue="PRIVATE_NET" onChange={this.onTypeChange.bind(this)} id="installMode">
                                            <option value="PRIVATE_NET">{this.props.intl.formatMessage({ id: 'install.mode.private_net', defaultMessage: 'Private network' })}</option>
                                            <option value="TESTNET_NODE">{this.props.intl.formatMessage({ id: 'install.mode.testnet_node', defaultMessage: 'Testned nodes' })}</option>
                                            <option value="TESTNET_URL">{this.props.intl.formatMessage({ id: 'install.mode.testnet_url', defaultMessage: 'Testnet URL' })}</option>
                                        </Validation.components.ValidatedSelect>
                                    </Col>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup>
                                    <Col md={3}>
                                        <label className="control-label">
                                            <FormattedMessage id="install.log.level" defaultMessage="Log level" />
                                        </label>
                                    </Col>
                                    <Col md={9}>
                                        <Validation.components.ValidatedSelect id="installLogLevel" name="logLevel" defaultValue="ERROR">
                                            <option value="ERROR">ERROR</option>
                                            <option value="DEBUG">DEBUG</option>
                                        </Validation.components.ValidatedSelect>
                                    </Col>
                                </FormGroup>
                            </fieldset>
                            {'PRIVATE_NET' === this.state.type && (
                                <fieldset className="mb0 bb0">
                                    <FormGroup>
                                        <Col md={3} />
                                        <Col md={9} className="text-left">
                                            <Checkbox id="installGenerateFirstBlock" title={this.props.intl.formatMessage({ id: 'install.first_block_generate', defaultMessage: 'Generate first block' })} checked={this.state.generateFirst} onChange={this.onGenerateFirstChange.bind(this)} />
                                        </Col>
                                    </FormGroup>
                                </fieldset>
                            )}
                            {('PRIVATE_NET' !== this.state.type || !this.state.generateFirst) && (
                                <fieldset className="mb0 bb0">
                                    <Validation.components.ValidatedFormGroup for="blockDir">
                                        <Col md={3}>
                                            <label className="control-label">
                                                <FormattedMessage id="install.first_block_dir" defaultMessage="First block dir" />
                                                <strong className="text-danger">*</strong>
                                            </label>
                                        </Col>
                                        <Col md={9}>
                                            <Validation.components.ValidatedControl id="installFirstBlockDir" type="text" name="blockDir" validators={[Validation.validators.required]} />
                                        </Col>
                                    </Validation.components.ValidatedFormGroup>
                                </fieldset>
                            )}
                            <Well className="box-placeholder pb0">
                                <legend>
                                    <h4 className="clearfix mt0">
                                        <span className="pull-left">
                                            <FormattedMessage id="install.centrifugo_settings" defaultMessage="Centrifugo settings" />
                                        </span>
                                    </h4>
                                </legend>
                                <fieldset>
                                    <Validation.components.ValidatedFormGroup for="installPushHost">
                                        <Col md={3}>
                                            <label className="control-label">
                                                <FormattedMessage id="install.centrifugo.host" defaultMessage="Host" />
                                            </label>
                                        </Col>
                                        <Col md={9}>
                                            <Validation.components.ValidatedControl id="installPushHost" name="pushHost" type="text" />
                                        </Col>
                                    </Validation.components.ValidatedFormGroup>
                                </fieldset>
                                <fieldset>
                                    <Validation.components.ValidatedFormGroup for="installPushSecret">
                                        <Col md={3}>
                                            <label className="control-label">
                                                <FormattedMessage id="install.centrifugo.secret" defaultMessage="Secret key" />
                                            </label>
                                        </Col>
                                        <Col md={9}>
                                            <Validation.components.ValidatedControl id="installPushSecret" name="pushSecret" type="text" />
                                        </Col>
                                    </Validation.components.ValidatedFormGroup>
                                </fieldset>
                            </Well>
                            <Well className="box-placeholder pb0">
                                <legend>
                                    <h4 className="clearfix mt0">
                                        <span className="pull-left"><FormattedMessage id="install.database_settings" defaultMessage="Database settings" /></span>
                                        <a href="https://github.com/EGaaS/go-egaas-mvp/wiki/eGaaS-app-installation-instruction" className="pull-right small align-middle">
                                            <FormattedMessage id="install.instructions" defaultMessage="Instructions" />
                                        </a>
                                    </h4>
                                </legend>
                                <fieldset>
                                    <Validation.components.ValidatedFormGroup for="dbHost">
                                        <Col md={3}>
                                            <label className="control-label">
                                                <FormattedMessage id="install.database.host" defaultMessage="Host" />
                                                <strong className="text-danger">*</strong>
                                            </label>
                                        </Col>
                                        <Col md={9}>
                                            <Validation.components.ValidatedControl id="installDbHost" name="dbHost" type="text" defaultValue="localhost" validators={[Validation.validators.required]} />
                                        </Col>
                                    </Validation.components.ValidatedFormGroup>
                                </fieldset>
                                <fieldset>
                                    <Validation.components.ValidatedFormGroup for="dbPort">
                                        <Col md={3}>
                                            <label className="control-label">
                                                <FormattedMessage id="install.database.port" defaultMessage="Port" />
                                                <strong className="text-danger">*</strong>
                                            </label>
                                        </Col>
                                        <Col md={9}>
                                            <Validation.components.ValidatedControl id="installDbPort" name="dbPort" type="number" defaultValue="5432" validators={[Validation.validators.required]} />
                                        </Col>
                                    </Validation.components.ValidatedFormGroup>
                                </fieldset>
                                <fieldset>
                                    <Validation.components.ValidatedFormGroup for="dbName">
                                        <Col md={3}>
                                            <label className="control-label">
                                                <FormattedMessage id="install.database.name" defaultMessage="DB name" />
                                                <strong className="text-danger">*</strong>
                                            </label>
                                        </Col>
                                        <Col md={9}>
                                            <Validation.components.ValidatedControl id="installDbName" name="dbName" type="text" validators={[Validation.validators.required]} />
                                        </Col>
                                    </Validation.components.ValidatedFormGroup>
                                </fieldset>
                                <fieldset>
                                    <Validation.components.ValidatedFormGroup for="dbUser">
                                        <Col md={3}>
                                            <label className="control-label">
                                                <FormattedMessage id="install.database.user" defaultMessage="Username" />
                                                <strong className="text-danger">*</strong>
                                            </label>
                                        </Col>
                                        <Col md={9}>
                                            <Validation.components.ValidatedControl id="installDbUser" name="dbUser" type="text" defaultValue="postgres" validators={[Validation.validators.required]} />
                                        </Col>
                                    </Validation.components.ValidatedFormGroup>
                                </fieldset>
                                <fieldset className="mb0">
                                    <Validation.components.ValidatedFormGroup for="dbPass">
                                        <Col md={3}>
                                            <label className="control-label">
                                                <FormattedMessage id="install.database.pass" defaultMessage="Password" />
                                            </label>
                                        </Col>
                                        <Col md={9}>
                                            <Validation.components.ValidatedControl id="installDbPass" name="dbPass" type="password" />
                                        </Col>
                                    </Validation.components.ValidatedFormGroup>
                                </fieldset>
                            </Well>
                            <div>
                                <Button disabled={this.props.isInstalling} id="installConfirm" bsStyle="primary" type="submit" className="btn-block">
                                    <FormattedMessage id="install.confirm" defaultMessage="Install" />
                                </Button>
                            </div>
                        </Validation.components.ValidatedForm>
                    </StyledInstallForm>
                </General>
            </LocalizedDocumentTitle>
        );
    }
}

export default injectIntl(InstallForm, {
    intlPropName: 'intl'
});