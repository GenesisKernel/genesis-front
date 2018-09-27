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
import { FormattedMessage } from 'react-intl';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Heading from 'components/Auth/Heading';
import Action from './Action';

export interface IActionSelectorProps {
    onImport: () => void;
    onCreate: () => void;
}

const ActionSelector: React.SFC<IActionSelectorProps> = (props) => (
    <LocalizedDocumentTitle title="auth.wallet" defaultTitle="Wallet">
        <div>
            <Heading returnUrl="/">
                <FormattedMessage id="auth.wallet.actions" defaultMessage="Wallet actions" />
            </Heading>
            <div className="text-left">
                <Action
                    icon="icon-wallet"
                    title={<FormattedMessage id="auth.havekey" defaultMessage="I have a key" />}
                    description={<FormattedMessage id="auth.havekey.desc" defaultMessage="If you are already familiar with Genesis and have a backup of your private key, choose this option to guide you through the process of restoring your wallet data" />}
                    action={<FormattedMessage id="auth.import.existing" defaultMessage="Import existing key" />}
                    onClick={props.onImport}
                />
                <hr />
                <Action
                    icon="icon-lock"
                    title={<FormattedMessage id="auth.nokey" defaultMessage="I don't have a key" />}
                    description={<FormattedMessage id="auth.nokey.desc" defaultMessage="If you are new to the system or just want to create a new wallet, choose this option to generate a new private key and protect it with your password" />}
                    action={<FormattedMessage id="auth.generate.new" defaultMessage="Generate new key" />}
                    onClick={props.onCreate}
                />
            </div>
        </div>
    </LocalizedDocumentTitle>
);

export default ActionSelector;