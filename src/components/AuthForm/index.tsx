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
import Keyring from 'lib/keyring';

import Validation from 'components/Validation';

interface IAuthFormProps extends InjectedIntlProps {
    navigate: (url: string) => void;
    login: (keyring: Keyring, account: IStoredKey, remember: boolean) => void;
}

interface IAuthFormState {
    remember: boolean;
    accounts: IStoredKey[];
    account: IStoredKey;
}

class AuthForm extends React.Component<IAuthFormProps, IAuthFormState> {
    constructor(props: IAuthFormProps) {
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

    onActionChange(action: string) {
        this.props.navigate(`/auth/${action}`);
    }

    onSubmit(values: { [key: string]: any }) {
        const keyring = new Keyring(values.password, this.state.account.publicKey, this.state.account.encKey);
        if (keyring.verify()) {
            this.props.login(keyring, this.state.account, values.remember);
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
        return (
            <Validation.components.ValidatedForm className="form-horizontal" onSubmitSuccess={this.onSubmit.bind(this)}>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">NL_AUTHORIZATION</div>
                    </div>
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
                            <FormGroup>
                                <Col md={3}>
                                    <label className="control-label">
                                        <FormattedMessage id="general.ecosystem" defaultMessage="Ecosystem" />
                                    </label>
                                </Col>
                                <Col md={9}>
                                    <Validation.components.ValidatedSelect name="ecosystem">
                                        <option>{this.props.intl.formatMessage({ id: 'ecosystem.none', defaultMessage: 'None' })}</option>
                                    </Validation.components.ValidatedSelect>
                                </Col>
                            </FormGroup>
                        </fieldset>
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
                        <fieldset className="mb0">
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
                        <fieldset className="pb0 pt0 mb0 bb0">
                            <FormGroup>
                                <Col md={3}/>
                                <Col md={9}>
                                    <Validation.components.ValidatedCheckbox name="remember" title={this.props.intl.formatMessage({ id: 'general.remember', defaultMessage: 'Remember password' })} />
                                </Col>
                            </FormGroup>
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
                                <Button bsStyle="link" onClick={this.onActionChange.bind(this, 'create')}>
                                    <FormattedMessage id="auth.account.create" defaultMessage="Create account" />
                                </Button>
                            </Col>
                            <Col md={4} className="text-right">
                                <Button bsStyle="primary" type="submit">
                                    <FormattedMessage id="auth.login" defaultMessage="Login" />
                                </Button>
                            </Col>
                        </div>
                    </div>
                </div>
            </Validation.components.ValidatedForm>
        );
    }
}

export default injectIntl(AuthForm, {
    intlPropName: 'intl'
});