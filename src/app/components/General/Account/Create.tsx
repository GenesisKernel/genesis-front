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
import { Button, Col } from 'react-bootstrap';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { navigate } from 'modules/engine/actions';
import { importSeed, createAccount, login } from 'modules/auth/actions';
import { alertShow } from 'modules/content/actions';
import styled from 'styled-components';
import keyring from 'lib/keyring';
import { sendAttachment } from 'lib/fs';

import DocumentTitle from 'components/DocumentTitle';
import General from 'components/General';
import Validation from 'components/Validation';

const StyledForm = styled.div`
    textarea.input-seed {
        height: 100px;
        resize: none;
    }
`;

export interface ICreateProps {
    return: string;
    loadedSeed: string;
    isCreatingAccount: boolean;
    createdAccount: {
        id: string;
        encKey: string;
        ecosystems?: {
            [id: string]: {
                name?: string;
                avatar?: string;
                type?: string;
            }
        };
    };
    navigate: typeof navigate;
    alertShow: typeof alertShow;
    login: typeof login.started;
    importSeed: typeof importSeed.started;
    createAccount: typeof createAccount.started;
}

interface ICreateState {
    seed?: string;
    seedConfirm?: string;
    password?: string;
    isConfirming?: boolean;
}

class Create extends React.Component<ICreateProps & InjectedIntlProps, ICreateState> {
    private inputFile: HTMLInputElement;

    constructor(props: ICreateProps & InjectedIntlProps) {
        super(props);
        this.state = {
            seed: '',
            seedConfirm: '',
            password: '',
            isConfirming: false
        };
    }

    componentWillReceiveProps(props: ICreateProps) {
        if (props.loadedSeed) {
            if (this.state.isConfirming) {
                this.setState({
                    seedConfirm: props.loadedSeed
                });
            }
            else {
                this.setState({
                    seed: props.loadedSeed
                });
            }
        }

        if (this.props.isCreatingAccount && !props.isCreatingAccount && props.createdAccount) {
            this.onCreateSuccess();
            props.navigate('/');
        }
    }

    onSubmit(values: { [key: string]: any }) {
        if (this.state.isConfirming) {
            this.props.createAccount({
                seed: values.seedConfirm,
                password: values.passwordConfirm
            });
        }
        else {
            this.setState({
                isConfirming: true,
                seed: values.seed,
                password: values.password,
                seedConfirm: ''
            });
        }
    }

    onCreateSuccess() {
        this.props.alertShow({
            id: 'I_ACCOUNT_CREATED',
            title: this.props.intl.formatMessage({ id: 'alert.info', defaultMessage: 'Information' }),
            type: 'info',
            text: this.props.intl.formatMessage({ id: 'auth.create.success', defaultMessage: 'Account has been successfully created' }),
            cancelButton: this.props.intl.formatMessage({ id: 'alert.close', defaultMessage: 'Close' }),
        });
    }

    onInvalidSeed() {
        this.props.alertShow({
            id: 'E_SEED_CORRUPTED',
            title: this.props.intl.formatMessage({ id: 'alert.error', defaultMessage: 'Error' }),
            type: 'error',
            text: this.props.intl.formatMessage({ id: 'auth.seed.invalid', defaultMessage: 'Provided seed is corrupted or contains invalid data' }),
            cancelButton: this.props.intl.formatMessage({ id: 'alert.close', defaultMessage: 'Close' }),
        });
    }

    onGenerate() {
        this.setState({
            seed: keyring.generateSeed()
        });
    }

    onSeedChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            seed: e.target.value
        });
    }

    onSeedConfirmationChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            seedConfirm: e.target.value
        });
    }

    onSave() {
        sendAttachment('seed.txt', this.state.seed);
    }

    onLoad() {
        this.inputFile.click();
    }

    onLoadSuccess(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            if (keyring.MAX_KEY_SIZE < e.target.files[0].size) {
                this.onInvalidSeed();
            }
            else {
                this.props.importSeed(e.target.files[0]);
            }
            e.target.value = '';
        }
    }

    onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: e.target.value
        });
    }

    onBack(e?: NavigationEvent) {
        this.setState({
            isConfirming: false
        });

        if (e) {
            e.preventDefault();
        }
    }

    renderFirst() {
        return (
            <div key="firstStep">
                <fieldset>
                    <p className="text-center">
                        <FormattedMessage id="auth.remember.disclaimer.confirm" defaultMessage="Please make sure that you keep your passphrase (account seed) safe and remember the password. You will be asked to re-type them for confirmation" />
                    </p>
                </fieldset>
                <fieldset>
                    <Validation.components.ValidatedFormGroup for="seed">
                        <Col md={3}>
                            <label className="control-label">
                                <FormattedMessage id="auth.seed" defaultMessage="Account seed" />
                            </label>
                        </Col>
                        <Col md={9}>
                            <div>
                                <Validation.components.ValidatedTextarea id="registerSeed" className="input-seed" onChange={this.onSeedChange.bind(this)} value={this.state.seed} name="seed" validators={[Validation.validators.required]} />
                            </div>
                            <Col xs={4} className="pl0 pr0">
                                <Button id="registerGenerate" className="btn-block" onClick={this.onGenerate.bind(this)}>
                                    <FormattedMessage id="auth.seed.generate" defaultMessage="Generate" />
                                </Button>
                            </Col>
                            <Col xs={4} className="pl0 pr0">
                                <Button id="registerSave" className="btn-block" disabled={!this.state.seed} onClick={this.onSave.bind(this)}>
                                    <FormattedMessage id="auth.seed.save" defaultMessage="Save" />
                                </Button>
                            </Col>
                            <Col xs={4} className="pl0 pr0">
                                <Button id="registerLoad" className="btn-block" onClick={this.onLoad.bind(this)}>
                                    <FormattedMessage id="auth.seed.load" defaultMessage="Load" />
                                </Button>
                            </Col>
                            <div className="text-left">
                                <Validation.components.ValidationMessage
                                    for="seed"
                                    messages={{
                                        required: { id: 'validation.required', defaultMessage: 'This field is required' }
                                    }}
                                />
                            </div>
                        </Col>
                    </Validation.components.ValidatedFormGroup>
                </fieldset>
                <fieldset>
                    <Validation.components.ValidatedFormGroup for="password">
                        <Col md={3}>
                            <label className="control-label">
                                <FormattedMessage id="general.password" defaultMessage="Password" />
                            </label>
                        </Col>
                        <Col md={9}>
                            <Validation.components.ValidatedControl id="registerPassword" onChange={this.onPasswordChange.bind(this)} value={this.state.password} name="password" type="password" validators={[Validation.validators.required, Validation.validators.minlength(6)]} />
                            <div className="text-left">
                                <Validation.components.ValidationMessage
                                    for="password"
                                    messages={{
                                        required: { id: 'validation.required', defaultMessage: 'This field is required' },
                                        minlength: { id: 'validation.minlength', defaultMessage: 'Password must be at least {value} characters long', values: { value: 6 } }
                                    }}
                                />
                            </div>
                        </Col>
                    </Validation.components.ValidatedFormGroup>
                </fieldset>
                <hr className="mt0" />
                <Button id="registerContinue" type="submit" bsStyle="primary" className="btn-block">
                    <FormattedMessage id="process.continue" defaultMessage="Continue" />
                </Button>
            </div>
        );
    }

    renderSecond() {
        return (
            <div key="secondStep">
                <fieldset>
                    <p className="text-center">
                        <FormattedMessage id="auth.remember.disclaimer.confirm" defaultMessage="Please repeat your registration values. This step is required to ensure that your passphrase and password are stored correctly" />
                    </p>
                </fieldset>
                <fieldset>
                    <Validation.components.ValidatedFormGroup for="seedConfirm">
                        <Col md={3}>
                            <label className="control-label">
                                <FormattedMessage id="auth.seed.repeat" defaultMessage="Repeat seed" />
                            </label>
                        </Col>
                        <Col md={9}>
                            <div>
                                <Validation.components.ValidatedTextarea id="registerSeedConfirmation" className="input-seed" onChange={this.onSeedConfirmationChange.bind(this)} value={this.state.seedConfirm} name="seedConfirm" validators={[Validation.validators.required, Validation.validators.compare(this.state.seed)]} />
                            </div>
                            <Button id="registerLoadConfirmation" className="btn-block" onClick={this.onLoad.bind(this)}>
                                <FormattedMessage id="auth.seed.load" defaultMessage="Load" />
                            </Button>
                        </Col>
                    </Validation.components.ValidatedFormGroup>
                </fieldset>
                <fieldset>
                    <Validation.components.ValidatedFormGroup for="passwordConfirm">
                        <Col md={3}>
                            <label className="control-label">
                                <FormattedMessage id="general.password.repeat" defaultMessage="Repeat password" />
                            </label>
                        </Col>
                        <Col md={9}>
                            <Validation.components.ValidatedControl id="registerPasswordRepeat" name="passwordConfirm" type="password" validators={[Validation.validators.compare(this.state.password)]} />
                        </Col>
                    </Validation.components.ValidatedFormGroup>
                </fieldset>
                <hr className="mt0" />
                <Button id="registerConfirm" type="submit" bsStyle="primary" className="btn-block">
                    <FormattedMessage id="process.confirm" defaultMessage="Confirm" />
                </Button>
            </div>
        );
    }

    render() {
        return (
            <DocumentTitle title="account.create" defaultTitle="Create account">
                <General return={this.state.isConfirming ? this.onBack.bind(this) : this.props.return}>
                    <input id="registerFileLoader" type="file" className="hidden" onChange={this.onLoadSuccess.bind(this)} ref={l => this.inputFile = l} />
                    <div className="text-center">
                        <StyledForm>
                            <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)}>
                                {this.state.isConfirming ? this.renderSecond() : this.renderFirst()}
                            </Validation.components.ValidatedForm>
                        </StyledForm>
                    </div>
                </General>
            </DocumentTitle>
        );
    }
}

export default injectIntl(Create);