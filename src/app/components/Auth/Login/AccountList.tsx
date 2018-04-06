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
import styled from 'styled-components';
import classNames from 'classnames';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { IAccount } from 'genesis/auth';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import AccountButton from './AccountButton';
import Heading from 'components/Auth/Heading';
import AddAccountButton from './AddAccountButton';

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
                                    avatar={l.account.avatar}
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
                            <AddAccountButton onClick={this.props.onCreate} />
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