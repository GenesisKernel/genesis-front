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
import { Button, Col, Row } from 'react-bootstrap';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import storage, { IStoredKey } from 'lib/storage';
import keyring from 'lib/keyring';
import styled from 'styled-components';
import { navigate } from 'modules/engine/actions';
import { login } from 'modules/auth/actions';
import { alertShow } from 'modules/content/actions';

import DocumentTitle from 'components/DocumentTitle';
import General from 'components/General';
import Welcome from 'components/General/Welcome';
import Validation from 'components/Validation';
import AccountButton from 'components/AccountButton';

const StyledLogin = styled.div`
    background: rgba(0,0,0,0.3);
    height: 100%;

    .logo-holder {
        text-align: center;
        font-size: 0;

        .logo-horizontal {
            height: 45px;
            line-height: 45px;

            img {
                height: 24px;

                &.logo {
                    margin-right: 5px;
                }

                &.logo-text {
                    height: 20px;
                }
            }
        }

        .logo-vertical {
            padding: 30px;
        }

        img {
            vertical-align: middle;
        }
    }

    .auth-body {
        background: #fff;
        padding: 30px;
    }
`;

export interface ILoginProps extends InjectedIntlProps {
    alert: { id: string, success: string, error: string };
    defaultAccount: IStoredKey;
    isImportingAccount: boolean;
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
    private _pendingRemoval: { account: IStoredKey; ecosystem: string; };

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            remember: false,
            accounts: [],
            account: null,
            ecosystem: null
        };
    }

    componentDidMount() {
        this.loadAccounts(storage.accounts.loadAll(), this.props.defaultAccount);
    }

    componentWillReceiveProps(props: ILoginProps) {
        if (this._pendingRemoval && props.alert && 'C_REMOVE_ACCOUNT' === props.alert.id && props.alert.success) {
            const account = this._pendingRemoval.account;

            if (1 === Object.keys(account.ecosystems).length) {
                storage.accounts.remove(account.id);
            }
            else {
                delete account.ecosystems[this._pendingRemoval.ecosystem];
                storage.accounts.save(account);
            }

            this.loadAccounts(storage.accounts.loadAll(), props.defaultAccount);
        }

        if (this.props.isImportingAccount !== props.isImportingAccount) {
            this.loadAccounts(storage.accounts.loadAll(), props.defaultAccount);
        }
    }

    loadAccounts(accounts: IStoredKey[], defaultAccount?: IStoredKey) {
        if (defaultAccount && accounts.find(l => l.id === defaultAccount.id)) {
            const ecosystems = Object.keys(defaultAccount.ecosystems);
            this.setState({
                accounts,
                account: defaultAccount,
                ecosystem: ecosystems[0]
            });
        }
        else if (accounts.length) {
            const firstAccount = accounts[0];
            const ecosystems = Object.keys(firstAccount.ecosystems);
            this.setState({
                accounts,
                account: firstAccount,
                ecosystem: ecosystems[0]
            });
        }
        else {
            this.setState({
                accounts
            });
        }
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
            // TODO: Will be reworked in future
            values.remember = true;

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

    onRemoveAccount(account: IStoredKey, ecosystem: string) {
        this._pendingRemoval = {
            account,
            ecosystem
        };

        this.props.alertShow({
            id: 'C_REMOVE_ACCOUNT',
            title: 'Confirmation',
            type: 'warning',
            text: 'Do you really want to delete this account? THIS ACTION IS IRREVERSIBLE',
            confirmButton: this.props.intl.formatMessage({ id: 'alert.confirm', defaultMessage: 'Confirm' }),
            cancelButton: this.props.intl.formatMessage({ id: 'alert.cancel', defaultMessage: 'Cancel' }),
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
                    <General className="p0">
                        <StyledLogin className="desktop-flex-col desktop-flex-stretch">
                            <Validation.components.ValidatedForm className="auth-body form-horizontal desktop-flex-col desktop-flex-stretch" onSubmitSuccess={this.onSubmit.bind(this)}>
                                <h2 className="text-center mt0">
                                    <FormattedMessage id="auth.accounts" defaultMessage="Accounts" />
                                </h2>
                                <div className="text-center desktop-flex-stretch">
                                    {accounts.map(l => (
                                        <AccountButton
                                            active={this.state.account && this.state.account.id === l.id && this.state.ecosystem === l.ecosystem.id}
                                            onSelect={this.onSelectAccount.bind(this, l.ref, l.ecosystem.id)}
                                            onRemove={this.onRemoveAccount.bind(this, l.ref, l.ecosystem.id)}
                                            key={l.id + l.ecosystem.id}
                                            avatar={l.avatar}
                                            keyID={l.id}
                                            address={l.address}
                                            type={l.type}
                                            ecosystemID={l.ecosystem.id}
                                            ecosystemName={l.ecosystem.name}
                                        />
                                    ))}
                                </div>
                                <div className="panel-body pb0">
                                    <fieldset className="bb0">
                                        <Validation.components.ValidatedFormGroup for="password">
                                            <Row>
                                                <Col sm={3}>
                                                    <label className="control-label">
                                                        <FormattedMessage id="general.password" defaultMessage="Password" />
                                                    </label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Validation.components.ValidatedControl name="password" type="password" validators={[Validation.validators.required]} />
                                                </Col>
                                            </Row>
                                        </Validation.components.ValidatedFormGroup>
                                    </fieldset>
                                    {/*<fieldset className="mb0 bb0" style={{ paddingBottom: 12 }}>
                                        <Row>
                                            <Col sm={3} />
                                            <Col sm={9} className="text-left">
                                                <Validation.components.ValidatedCheckbox className="pt0" name="remember" checked disabled title={this.props.intl.formatMessage({ id: 'general.remember', defaultMessage: 'Remember password' })} />
                                            </Col>
                                        </Row>
                                    </fieldset>*/}
                                </div>
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
                        </StyledLogin>
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