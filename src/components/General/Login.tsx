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
import { Button, Col, FormGroup } from 'react-bootstrap';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import storage, { IStoredKey } from 'lib/storage';
import keyring from 'lib/keyring';
import { navigate } from 'modules/engine/actions';
import { login } from 'modules/auth/actions';

import General from 'components/General';
import Welcome from 'components/General/Welcome';
import Validation from 'components/Validation';

export interface ILoginProps extends InjectedIntlProps {
    navigate: typeof navigate;
    login: typeof login.started;
}

interface ILoginState {
    remember: boolean;
    accounts: IStoredKey[];
    account: IStoredKey;
}

class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            remember: false,
            accounts: [],
            account: null
        };
    }

    componentWillMount() {
        this.setState({
            accounts: storage.accounts.loadAll(),
            account: null
        });
    }

    onCreateAccount() {
        this.props.navigate(`/account`);
    }

    onSubmit(values: { [key: string]: any }) {
        //const keyring = new Keyring(values.password, this.state.account.publicKey, this.state.account.encKey);
        const privateKey = keyring.decryptAES(this.state.account.encKey, values.password);
        if (privateKey) {
            if (values.remember) {
                storage.settings.save('privateKey', privateKey);
                storage.settings.save('publicKey', this.state.account.publicKey);
            }
            else {
                storage.settings.remove('privateKey');
                storage.settings.remove('publicKey');
            }
            this.props.login({
                privateKey,
                publicKey: this.state.account.publicKey,
                remember: values.remember
            });
            this.props.navigate('/');
        }
        else {
            // TODO: Notification stub
            alert('Invalid password');
        }
    }

    onSelectAccount(account: IStoredKey) {
        this.setState({
            account
        });
    }

    render() {
        return this.state.accounts.length ?
            (
                <General>
                    <Validation.components.ValidatedForm className="form-horizontal" onSubmitSuccess={this.onSubmit.bind(this)}>
                        <h2 className="text-center">
                            <FormattedMessage id="auth.login" defaultMessage="Login" />
                        </h2>
                        <div className="text-center">
                            <ul>
                                {this.state.accounts.map(l => (
                                    <li key={l.id}>
                                        <Button bsStyle="link" onClick={this.onSelectAccount.bind(this, l)}>{l.address}</Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="panel-body pb0">
                            <fieldset>
                                <Validation.components.ValidatedFormGroup for="address">
                                    <Col md={3}>
                                        <label className="control-label">
                                            <FormattedMessage id="general.address" defaultMessage="Address" />
                                        </label>
                                    </Col>
                                    <Col md={9}>
                                        <Validation.components.ValidatedControl name="address" type="text" readOnly value={this.state.account ? this.state.account.address : ''} validators={[Validation.validators.required]} />
                                    </Col>
                                </Validation.components.ValidatedFormGroup>
                            </fieldset>
                            <fieldset>
                                <FormGroup>
                                    <Col md={3}>
                                        <label className="control-label">
                                            <FormattedMessage id="general.ecosystem" defaultMessage="Ecosystem" />
                                        </label>
                                    </Col>
                                    <Col md={9}>
                                        <Validation.components.ValidatedSelect name="ecosystem" disabled={!this.state.account}>
                                            <option>{this.props.intl.formatMessage({ id: 'ecosystem.none', defaultMessage: 'None' })}</option>
                                        </Validation.components.ValidatedSelect>
                                    </Col>
                                </FormGroup>
                            </fieldset>
                            <fieldset>
                                <Validation.components.ValidatedFormGroup for="password">
                                    <Col md={3}>
                                        <label className="control-label">
                                            <FormattedMessage id="general.password" defaultMessage="Password" />
                                        </label>
                                    </Col>
                                    <Col md={9}>
                                        <Validation.components.ValidatedControl name="password" type="password" validators={[Validation.validators.required]} />
                                    </Col>
                                </Validation.components.ValidatedFormGroup>
                            </fieldset>
                            <fieldset className="mb0 bb0" style={{ paddingBottom: 12 }}>
                                <FormGroup>
                                    <Col md={3} />
                                    <Col md={9}>
                                        <Validation.components.ValidatedCheckbox className="pt0" name="remember" title={this.props.intl.formatMessage({ id: 'general.remember', defaultMessage: 'Remember password' })} />
                                    </Col>
                                </FormGroup>
                            </fieldset>
                        </div>
                        <hr className="mt0" />
                        <div className="clearfix">
                            <div className="pull-left">
                                <Button bsStyle="link" onClick={this.onCreateAccount.bind(this)}>
                                    <FormattedMessage id="auth.account.create" defaultMessage="Create account" />
                                </Button>
                            </div>
                            <div className="pull-right">
                                <Button bsStyle="primary" type="submit">
                                    <FormattedMessage id="auth.login" defaultMessage="Login" />
                                </Button>
                            </div>
                        </div>
                    </Validation.components.ValidatedForm>
                </General>
            ) : (
                <Welcome navigate={this.props.navigate} />
            );
    }
}

export default injectIntl(Login, {
    intlPropName: 'intl'
});