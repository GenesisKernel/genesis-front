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
import { Button } from 'react-bootstrap';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import styled from 'styled-components';
import { IStoredAccount } from 'genesis/storage';
import { INotificationsMessage } from 'genesis/socket';
import imgAvatar from 'images/avatar.svg';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import General from 'components/General';
import Welcome from 'components/General/Welcome';
import AccountButton from 'components/AccountButton';
import Validation from 'components/Validation';

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

    .avatar-holder {
        width: 100px;
        height: 100px;
        margin: 0 auto 15px auto;

        > img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 100%;
        }
    }

    .password-prompt {
        position: relative;
        padding-right: 80px;

        button {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 80px;
        }
    }

    .auth-body {
        background: #fff;
        padding: 30px;
    }
`;

export interface ILoginProps {
    isLoggingIn: boolean;
    authenticationError: string;
    account: IStoredAccount;
    accounts: IStoredAccount[];
    notifications: INotificationsMessage[];
    defaultAccount: string;
    navigate: (url: string) => void;
    onError: (text: string) => void;
    onAccountRemove: (account: IStoredAccount) => void;
    login: (params: { encKey: string, ecosystem: string, password: string }) => void;
    logout: (params: {}) => void;
    selectAccount: (account: IStoredAccount) => void;
}

class Login extends React.Component<ILoginProps & InjectedIntlProps> {
    constructor(props: ILoginProps & InjectedIntlProps) {
        super(props);
        this.state = {
            account: null
        };
    }

    componentWillReceiveProps(props: ILoginProps & InjectedIntlProps) {
        if (this.props.isLoggingIn && !props.isLoggingIn && props.authenticationError) {
            switch (props.authenticationError) {
                case 'E_DELETEDKEY':
                    props.onError(props.intl.formatMessage({ id: 'auth.key.removed', defaultMessage: 'Account has been removed' }));
                    break;

                default:
                    props.onError(props.intl.formatMessage({ id: 'auth.password.invalid', defaultMessage: 'Invalid password' }));
                    break;
            }
        }
    }

    onCreateAccount() {
        this.props.navigate('/account');
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.login({
            encKey: this.props.account.encKey,
            password: values.password,
            ecosystem: this.props.account.ecosystem,
        });
        this.props.navigate('/');
    }

    onSelectAccount(account: IStoredAccount) {
        this.props.selectAccount(account);
    }

    onRemoveAccount(account: IStoredAccount) {
        this.props.onAccountRemove(account);
    }

    getSortedAccounts() {
        return this.props.accounts
            .sort((a, b) =>
                parseInt(a.id, 10) - parseInt(b.id, 10) ||
                parseInt(a.ecosystem, 10) - parseInt(b.ecosystem, 10)
            );
    }

    getNotificationsCount(account: IStoredAccount) {
        const notifications = this.props.notifications.filter(n =>
            n.id === account.id &&
            n.ecosystem === account.ecosystem,
        ).map(n => n.count);

        return notifications.length ? notifications.reduce((a, b) => a + b) : 0;
    }

    renderAccountList() {
        return (
            <div className="auth-body form-horizontal desktop-flex-col desktop-flex-stretch">
                <h2 className="text-center mt0">
                    <FormattedMessage id="auth.accounts" defaultMessage="Accounts" />
                </h2>
                <div className="text-center desktop-flex-stretch">
                    {this.getSortedAccounts().map((l, index) => (
                        <AccountButton
                            onSelect={this.onSelectAccount.bind(this, l)}
                            onRemove={this.onRemoveAccount.bind(this, l)}
                            key={index}
                            avatar={l.avatar}
                            keyID={l.id}
                            notifications={this.getNotificationsCount(l)}
                            username={l.username}
                            address={l.address}
                            ecosystemID={l.ecosystem}
                            ecosystemName={l.ecosystemName}
                        />
                    ))}
                </div>
                <div className="text-center">
                    <Button bsStyle="link" onClick={this.onCreateAccount.bind(this)}>
                        <FormattedMessage id="auth.account.different" defaultMessage="Choose different account" />
                    </Button>
                </div>
            </div>
        );
    }

    renderPasswordPrompt() {
        return (
            <StyledLogin className="desktop-flex-col desktop-flex-stretch">
                <Validation.components.ValidatedForm className="auth-body form-horizontal desktop-flex-col desktop-flex-stretch" onSubmitSuccess={this.onSubmit.bind(this)}>
                    <div className="text-center desktop-flex-stretch">
                        <div className="avatar-holder">
                            <img src={this.props.account.avatar || imgAvatar} />
                        </div>
                        <h4 className="text-center mt0">
                            {`${this.props.account.username || this.props.account.id} (${this.props.account.ecosystemName || this.props.account.ecosystem})`}
                        </h4>
                        <p>
                            <FormattedMessage id="auth.session.expired" defaultMessage="Your session has expired. Please enter your password to sign in" />
                        </p>
                        <div className="password-prompt">
                            <Validation.components.ValidatedControl type="password" name="password" placeholder={this.props.intl.formatMessage({ id: 'auth.password', defaultMessage: 'Enter your password...' })} />
                            <Validation.components.ValidatedSubmit className="btn-block">
                                <em className="icon icon-login" />
                            </Validation.components.ValidatedSubmit>
                        </div>
                    </div>
                    <div className="text-center">
                        <Button bsStyle="link" onClick={this.props.logout}>
                            <FormattedMessage id="auth.account.different" defaultMessage="Choose different account" />
                        </Button>
                    </div>
                </Validation.components.ValidatedForm>
            </StyledLogin>
        );
    }

    render() {
        const body = this.props.account && this.props.authenticationError ? this.renderPasswordPrompt() : this.renderAccountList();
        return this.props.accounts.length ?
            (
                <LocalizedDocumentTitle title="auth.login" defaultTitle="Login">
                    <General className="p0">
                        <StyledLogin className="desktop-flex-col desktop-flex-stretch">
                            {body}
                        </StyledLogin>
                    </General>
                </LocalizedDocumentTitle>
            ) : (
                <LocalizedDocumentTitle title="auth.welcome" defaultTitle="Welcome">
                    <Welcome navigate={this.props.navigate} />
                </LocalizedDocumentTitle>
            );
    }
}

export default injectIntl(Login, {
    intlPropName: 'intl'
});