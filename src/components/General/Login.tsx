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
import styled from 'styled-components';
import { navigate } from 'modules/engine/actions';
import { login } from 'modules/auth/actions';
import { alertShow } from 'modules/content/actions';
import imgAvatar from 'images/avatar.svg';

import DocumentTitle from 'components/DocumentTitle';
import General from 'components/General';
import Welcome from 'components/General/Welcome';
import Validation from 'components/Validation';

const StyledAccountList = styled.ul`
    list-style-type: none;
    padding: 0;

    > li {
        .avatar {
            max-width: 36px;
            max-height: 36px;
        }
    }
`;

export interface ILoginProps extends InjectedIntlProps {
    navigate: typeof navigate;
    login: typeof login.started;
    alertShow: typeof alertShow;
}

interface ILoginState {
    remember: boolean;
    accounts: IStoredKey[];
    account: IStoredKey;
    ecosystem: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            remember: false,
            accounts: [],
            account: null,
            ecosystem: null
        };
    }

    componentWillMount() {
        this.setState({
            accounts: storage.accounts.loadAll(),
            account: null
        });
    }

    onCreateAccount() {
        this.props.navigate('/account');
    }

    onSubmit(values: { [key: string]: any }) {
        if (!this.state.account || !this.state.account.encKey) {
            return;
        }

        const privateKey = keyring.decryptAES(this.state.account.encKey, values.password);
        if (keyring.KEY_LENGTH === privateKey.length) {
            if (values.remember) {
                storage.settings.save('privateKey', privateKey);
                storage.settings.save('lastEcosystem', this.state.ecosystem);
            }
            else {
                storage.settings.remove('privateKey');
                storage.settings.remove('lastEcosystem');
            }
            this.props.login({
                privateKey,
                ecosystem: this.state.ecosystem,
                remember: values.remember
            });
            this.props.navigate('/');
        }
        else {
            this.props.alertShow({
                id: 'E_INVALID_PASSWORD',
                title: this.props.intl.formatMessage({ id: 'alert.error', defaultMessage: 'Error' }),
                type: 'error',
                text: this.props.intl.formatMessage({ id: 'auth.password.invalid', defaultMessage: 'Invalid password' }),
                cancelButton: this.props.intl.formatMessage({ id: 'alert.close', defaultMessage: 'Close' }),
            });
        }
    }

    onSelectAccount(account: IStoredKey, ecosystem: string) {
        this.setState({
            account,
            ecosystem
        });
    }

    render() {
        const accounts: {
            id: string;
            avatar: string;
            type: string;
            address: string;
            ecosystem: {
                id: string;
                name: string;
            },
            ref: IStoredKey;
        }[] = [];
        this.state.accounts.forEach(account => {
            for (let itr in account.ecosystems) {
                if (account.ecosystems.hasOwnProperty(itr)) {
                    accounts.push({
                        id: account.id,
                        avatar: account.ecosystems[itr].avatar,
                        type: account.ecosystems[itr].type,
                        address: account.address,
                        ecosystem: {
                            id: itr,
                            name: account.ecosystems[itr].name
                        },
                        ref: account
                    });
                }
            }
        });

        return this.state.accounts.length ?
            (
                <DocumentTitle title="auth.login" defaultTitle="Login">
                    <General>
                        <Validation.components.ValidatedForm className="form-horizontal" onSubmitSuccess={this.onSubmit.bind(this)}>
                            <h2 className="text-center">
                                <FormattedMessage id="auth.login" defaultMessage="Login" />
                            </h2>
                            <div className="text-center">
                                <StyledAccountList>
                                    {accounts.map(l => (
                                        <li key={l.id + l.ecosystem.id}>
                                            <Button block bsStyle="default" onClick={this.onSelectAccount.bind(this, l.ref, l.ecosystem.id)}>
                                                <div className="media-box text-left">
                                                    <div className="pull-left">
                                                        <img src={l.avatar || imgAvatar} className="avatar" />
                                                    </div>
                                                    <div className="pull-right">
                                                        {this.state.account && this.state.account.id === l.id && this.state.ecosystem === l.ecosystem.id && (
                                                            <i className="fa fa-check fa-1x mt text-muted" />
                                                        )}
                                                    </div>
                                                    <div className="media-box-body clearfix">
                                                        <p className="m0">
                                                            <b>{l.ecosystem.name || l.ecosystem.id}</b>
                                                            <span className="ml">({l.type || l.id})</span>
                                                        </p>
                                                        <p className="m0">
                                                            <small>{l.address}</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Button>
                                        </li>
                                    ))}
                                </StyledAccountList>
                            </div>
                            <div className="panel-body pb0">
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
                                            <Validation.components.ValidatedCheckbox className="pt0" name="remember" checked disabled title={this.props.intl.formatMessage({ id: 'general.remember', defaultMessage: 'Remember password' })} />
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
                </DocumentTitle>
            ) : (
                <DocumentTitle title="auth.welcome" defaultTitle="Welcome">
                    <Welcome navigate={this.props.navigate} />
                </DocumentTitle>
            );
    }
}

export default injectIntl(Login, {
    intlPropName: 'intl'
});