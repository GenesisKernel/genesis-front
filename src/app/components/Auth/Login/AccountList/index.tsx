// MIT License
//
// Copyright (c) 2016-2018 GenesisKernel
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { IAccount } from 'genesis/auth';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import AccountButton from './AccountButton';
import Heading from 'components/Auth/Heading';
import ContextButton from '../ContextButton';

export interface IAccountListProps {
    className?: string;
    pending: boolean;
    account: IAccount;
    accounts: {
        account: IAccount;
        notifications: number;
    }[];
    onCreate: () => void;
    onRemove: (account: IAccount) => void;
    onLogin: (params: { account: IAccount, password: string }) => void;
    onSelect: (account: IAccount) => void;
}

class AccountList extends React.Component<IAccountListProps & InjectedIntlProps> {
    onSubmit = (values: { [key: string]: any }) => {
        this.props.onLogin({
            account: this.props.account,
            password: values.password
        });
    }

    getSortedAccounts = () => {
        return this.props.accounts
            .sort((a, b) =>
                parseInt(a.account.id, 10) - parseInt(b.account.id, 10) ||
                parseInt(a.account.ecosystem, 10) - parseInt(b.account.ecosystem, 10)
            );
    }

    render() {
        return (
            <LocalizedDocumentTitle title="auth.login" defaultTitle="Login">
                <div className={classNames('desktop-flex-col desktop-flex-stretch', this.props.className)}>
                    <Heading>
                        <FormattedMessage id="auth.accounts" defaultMessage="Accounts" />
                    </Heading>
                    <div className="account-list form-horizontal desktop-flex-col desktop-flex-stretch">
                        <div className="text-center desktop-flex-stretch">
                            {this.getSortedAccounts().map((l, index) => (
                                <AccountButton
                                    key={index}
                                    onSelect={() => this.props.onSelect(l.account)}
                                    onRemove={() => this.props.onRemove(l.account)}
                                    keyID={l.account.id}
                                    notifications={l.notifications}
                                    username={l.account.username}
                                    address={l.account.address}
                                    ecosystemID={l.account.ecosystem}
                                    ecosystemName={l.account.ecosystemName}
                                />
                            ))}
                        </div>
                        <div className="text-left">
                            <ContextButton icon="icon-plus" onClick={this.props.onCreate}>
                                <FormattedMessage id="account.createimport" defaultMessage="Create or import account" />
                            </ContextButton>
                        </div>
                    </div>
                </div>
            </LocalizedDocumentTitle>
        );
    }
}

export default styled(injectIntl(AccountList)) `
    .account-list {
        padding: 10px 10px 10px 30px;
    }
`;