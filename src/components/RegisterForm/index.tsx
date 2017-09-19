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
import { FormattedMessage } from 'react-intl';
import Keyring from 'lib/keyring';
import { sendAttachment } from 'lib/fs';
import './registerForm.css';

import Validation from 'components/Validation';

interface IRegisterFormProps {
    loadedSeed: string;
    navigate: (url: string) => void;
    importSeed: (file: Blob) => void;
}

interface IRegisterFormState {
    seed?: string;
    seedConfirmation?: string;
    password?: string;
    isConfirming?: boolean;
}

export default class extends React.Component<IRegisterFormProps, IRegisterFormState> {
    inputFile: HTMLInputElement;

    constructor(props: IRegisterFormProps) {
        super(props);
        this.state = {
            seed: '',
            seedConfirmation: '',
            password: '',
            isConfirming: false
        };
    }

    componentWillReceiveProps(props: IRegisterFormProps) {
        if (props.loadedSeed) {
            if (this.state.isConfirming) {
                this.setState({
                    seedConfirmation: props.loadedSeed
                });
            }
            else {
                this.setState({
                    seed: props.loadedSeed
                });
            }
        }
    }

    onActionChange(action: string) {
        this.props.navigate(`/auth/${action}`);
    }

    onSubmit(values: { [key: string]: any }) {
        if (this.state.isConfirming) {
            console.log(values);
        }
        else {
            this.setState({
                isConfirming: true,
                seed: values.seed,
                password: values.password,
                seedConfirmation: ''
            });
        }
    }

    onGenerate() {
        this.setState({
            seed: Keyring.generateSeed()
        });
    }

    onSeedChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            seed: e.target.value
        });
    }

    onSeedConfirmationChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            seedConfirmation: e.target.value
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
            this.props.importSeed(e.target.files[0]);
        }
    }

    onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: e.target.value
        });
    }

    onBack() {
        this.setState({
            isConfirming: false
        });
    }

    renderFirst() {
        return (
            <div key="firstStep">
                <fieldset>
                    <Validation.components.ValidatedFormGroup for="seed">
                        <Col md={3}>
                            <label className="control-label">
                                <FormattedMessage id="auth.seed" defaultMessage="Account seed" />
                            </label>
                        </Col>
                        <Col md={9}>
                            <div>
                                <Validation.components.ValidatedTextarea className="input-seed" onChange={this.onSeedChange.bind(this)} value={this.state.seed} name="seed" validators={[Validation.validators.required]} />
                            </div>
                            <Col md={4} className="pl0 pr0">
                                <Button className="btn-block" onClick={this.onGenerate.bind(this)}>
                                    <FormattedMessage id="auth.seed.generate" defaultMessage="Generate" />
                                </Button>
                            </Col>
                            <Col md={4} className="pl0 pr0">
                                <Button className="btn-block" disabled={!this.state.seed} onClick={this.onSave.bind(this)}>
                                    <FormattedMessage id="auth.seed.save" defaultMessage="Save" />
                                </Button>
                            </Col>
                            <Col md={4} className="pl0 pr0">
                                <Button className="btn-block" onClick={this.onLoad.bind(this)}>
                                    <FormattedMessage id="auth.seed.load" defaultMessage="Load" />
                                </Button>
                            </Col>
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
                            <Validation.components.ValidatedControl onChange={this.onPasswordChange.bind(this)} value={this.state.password} name="password" type="password" validators={[Validation.validators.required, Validation.validators.minLength(6)]} />
                        </Col>
                    </Validation.components.ValidatedFormGroup>
                </fieldset>
                <fieldset className="mb0">
                    <p className="text-center">
                        <FormattedMessage id="auth.remember.disclaimer.confirm" defaultMessage="Please make sure that you keep your passphrase (account seed) safe and remember the password. You will be asked to re-type them for confirmation" />
                    </p>
                </fieldset>
            </div>
        );
    }

    renderSecond() {
        return (
            <div key="secondStep">
                <fieldset>
                    <Validation.components.ValidatedFormGroup for="seedConfirm">
                        <Col md={3}>
                            <label className="control-label">
                                <FormattedMessage id="auth.seed.repeat" defaultMessage="Repeat seed" />
                            </label>
                        </Col>
                        <Col md={9}>
                            <div>
                                <Validation.components.ValidatedTextarea className="input-seed" onChange={this.onSeedConfirmationChange.bind(this)} value={this.state.seedConfirmation} name="seedConfirm" validators={[Validation.validators.required, Validation.validators.compare(this.state.seed)]} />
                            </div>
                            <Button className="btn-block" onClick={this.onLoad.bind(this)}>
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
                            <Validation.components.ValidatedControl name="passwordConfirm" type="password" validators={[Validation.validators.compare(this.state.password)]} />
                        </Col>
                    </Validation.components.ValidatedFormGroup>
                </fieldset>
                <fieldset className="mb0">
                    <p className="text-center">
                        <FormattedMessage id="auth.remember.disclaimer.confirm" defaultMessage="Please repeat your registraion values. This step is required to ensure that your passphrase and password are stored correctly" />
                    </p>
                </fieldset>
            </div>
        );
    }

    render() {
        return (
            <Validation.components.ValidatedForm className="form-horizontal component-register-form" onSubmitSuccess={this.onSubmit.bind(this)}>
                <input type="file" className="hidden" onChange={this.onLoadSuccess.bind(this)} ref={l => this.inputFile = l} />
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">NL_REGISTER</div>
                    </div>
                    <div className="panel-body pt0 pb0">
                        <div className="h2">
                            <Button onClick={this.onBack.bind(this)} className="pull-left" bsStyle="link">&lt;- Back</Button>
                            <div>
                                <FormattedMessage id="auth.registration" defaultMessage="Registration" />
                            </div>
                        </div>
                        {this.state.isConfirming ? this.renderSecond() : this.renderFirst()}
                    </div>
                    <div className="panel-footer">
                        <div className="clearfix">
                            <Col md={4} className="text-left">
                                <Button bsStyle="link" onClick={this.onActionChange.bind(this, 'import')}>
                                    <FormattedMessage id="auth.account.import" defaultMessage="Import account" />
                                </Button>
                            </Col>
                            <Col md={4} className="text-center">
                                <Button bsStyle="link" onClick={this.onActionChange.bind(this, '')}>
                                    <FormattedMessage id="auth.account.login" defaultMessage="Login" />
                                </Button>
                            </Col>
                            <Col md={4} className="text-right">
                                <Button bsStyle="primary" type="submit">
                                    <FormattedMessage id="auth.create" defaultMessage="Create account" />
                                </Button>
                            </Col>
                        </div>
                    </div>
                </div>
            </Validation.components.ValidatedForm >
        );
    }
}