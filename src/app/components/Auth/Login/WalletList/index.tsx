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

import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { IWallet } from 'genesis/auth';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import WalletButton from './WalletButton';
import Heading from 'components/Auth/Heading';
import ContextButton from '../ContextButton';

export interface IWalletListProps {
    className?: string;
    pending: boolean;
    wallet: IWallet;
    wallets: {
        wallet: IWallet;
        notifications: number;
    }[];
    onCreate: () => void;
    onRemove: (wallet: IWallet) => void;
    onLogin: (params: { wallet: IWallet, password: string }) => void;
    onSelect: (wallet: IWallet) => void;
}

class WalletList extends React.Component<IWalletListProps & InjectedIntlProps> {
    onSubmit = (values: { [key: string]: any }) => {
        this.props.onLogin({
            wallet: this.props.wallet,
            password: values.password
        });
    }

    getSortedWallets = () => {
        return this.props.wallets
            .sort((a, b) =>
                parseInt(a.wallet.id, 10) - parseInt(b.wallet.id, 10) ||
                parseInt(a.wallet.ecosystem, 10) - parseInt(b.wallet.ecosystem, 10)
            );
    }

    render() {
        return (
            <LocalizedDocumentTitle title="auth.login" defaultTitle="Login">
                <div className={classNames('desktop-flex-col desktop-flex-stretch', this.props.className)}>
                    <Heading>
                        <FormattedMessage id="auth.wallets" defaultMessage="Wallets" />
                    </Heading>
                    <div className="wallet-list form-horizontal desktop-flex-col desktop-flex-stretch">
                        <div className="text-center desktop-flex-stretch">
                            {this.getSortedWallets().map((l, index) => (
                                <WalletButton
                                    key={index}
                                    onSelect={() => this.props.onSelect(l.wallet)}
                                    onRemove={() => this.props.onRemove(l.wallet)}
                                    keyID={l.wallet.id}
                                    notifications={l.notifications}
                                    username={l.wallet.username}
                                    address={l.wallet.address}
                                    ecosystemID={l.wallet.ecosystem}
                                    ecosystemName={l.wallet.ecosystemName}
                                />
                            ))}
                        </div>
                        <div className="text-left">
                            <ContextButton icon="icon-plus" onClick={this.props.onCreate}>
                                <FormattedMessage id="wallet.createimport" defaultMessage="Create or import wallet" />
                            </ContextButton>
                        </div>
                    </div>
                </div>
            </LocalizedDocumentTitle>
        );
    }
}

export default styled(injectIntl(WalletList)) `
    .wallet-list {
        padding: 10px 10px 10px 30px;
    }
`;