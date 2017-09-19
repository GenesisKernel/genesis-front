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
    seed: string;
}

export default class extends React.Component<IRegisterFormProps, IRegisterFormState> {
    inputFile: HTMLInputElement;

    constructor(props: IRegisterFormProps) {
        super(props);
        this.state = {
            seed: ''
        };
    }

    componentWillReceiveProps(props: IRegisterFormProps) {
        if (props.loadedSeed) {
            this.setState({
                seed: props.loadedSeed
            });
        }
    }

    onActionChange(action: string) {
        this.props.navigate(`/auth/${action}`);
    }

    onSubmit(values: { [key: string]: any }) {
        console.log('Submit::', values);
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

    render() {
        return (
            <Validation.components.ValidatedForm className="form-horizontal component-register-form" onSubmit={this.onSubmit.bind(this)}>
                <input type="file" className="hidden" onChange={this.onLoadSuccess.bind(this)} ref={l => this.inputFile = l} />
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">NL_REGISTER</div>
                    </div>
                    <h2 className="text-center">
                        <FormattedMessage id="auth.registration" defaultMessage="Registration" />
                    </h2>
                    <div className="panel-body pb0">
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
                                    <Validation.components.ValidatedControl name="password" type="password" validators={[Validation.validators.required, Validation.validators.minLength(6)]} />
                                </Col>
                            </Validation.components.ValidatedFormGroup>
                        </fieldset>
                        <fieldset className="mb0">
                            <p className="text-center">
                                <FormattedMessage id="auth.remember.disclaimer" defaultMessage="Pleasem ake sure that you keep your passphrase (account seed) safe and remember the password. You will be asked to re-type them for confirmation" />
                            </p>
                        </fieldset>
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
            </Validation.components.ValidatedForm>
        );
    }
}