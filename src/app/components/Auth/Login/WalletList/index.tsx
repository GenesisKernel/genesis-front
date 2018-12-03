// MIT License
//
// Copyright (c) 2016-2018 AplaProject
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
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { IWallet, IAccountContext } from 'apla/auth';
import { IAccount } from 'apla/api';
import { INotificationsMessage } from 'apla/socket';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Heading from 'components/Auth/Heading';
import ContextButton from '../ContextButton';
import WalletButton from './WalletButton';
import Welcome from 'components/Auth/Welcome';

export interface IWalletListProps {
    className?: string;
    pending: boolean;
    wallets: IAccount[];
    notifications: INotificationsMessage[];
    activationEnabled: boolean;
    onCreate: () => any;
    onRemove: (wallet: IWallet) => any;
    onLogin: (params: { wallet: IWallet, password: string }) => any;
    onCopy: (wallet: IWallet) => any;
    onRegister: (wallet: IWallet) => any;
    onSelect: (params: IAccountContext) => any;
    onGuestLogin: () => any;
}

const WalletList: React.SFC<IWalletListProps> = props => (
    <LocalizedDocumentTitle title="auth.login" defaultTitle="Login">
        <div className={classNames('desktop-flex-col desktop-flex-stretch', props.className)}>
            <Heading>
                <FormattedMessage id="auth.wallets" defaultMessage="Wallets" />
            </Heading>
            <div className="form-horizontal desktop-flex-col desktop-flex-stretch" style={{ padding: 10 }}>
                <div className="text-center desktop-flex-stretch">
                    {0 === props.wallets.length ?
                        (
                            <Welcome />
                        )
                        : props.wallets.map((wallet, index) =>
                            <WalletButton
                                key={wallet.id}
                                wallet={wallet}
                                notifications={props.notifications.filter(l => l.id === wallet.id)}
                                onRemove={() => props.onRemove(wallet)}
                                onCopy={() => props.onCopy(wallet)}
                                onRegister={props.activationEnabled ? () => props.onRegister(wallet) : null}
                                onSelect={params => props.onSelect({ ...params, wallet })}
                            />
                        )
                    }
                </div>
                <div className="text-left">
                    <ContextButton icon="icon-plus" onClick={props.onCreate} description={<FormattedMessage id="wallet.createimport.desc" defaultMessage="Restore your existing wallet or enroll a new one" />}>
                        <FormattedMessage id="wallet.createimport" defaultMessage="Create or import wallet" />
                    </ContextButton>
                    <ContextButton icon="icon-login" onClick={props.onGuestLogin} description={<FormattedMessage id="auth.login.guest.desc" defaultMessage="Proceed with this option if you want to try Apla in test mode" />}>
                        <FormattedMessage id="auth.login.guest" defaultMessage="Login using guest key" />
                    </ContextButton>
                </div>
            </div>
        </div>
    </LocalizedDocumentTitle>
);

export default WalletList;