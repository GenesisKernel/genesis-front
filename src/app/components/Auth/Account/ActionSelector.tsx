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
import { FormattedMessage } from 'react-intl';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Heading from 'components/Auth/Heading';
import Action from './Action';

export interface IActionSelectorProps {
    onImport: () => void;
    onCreate: () => void;
}

const ActionSelector: React.SFC<IActionSelectorProps> = (props) => (
    <LocalizedDocumentTitle title="auth.account" defaultTitle="Account">
        <div>
            <Heading returnUrl="/">
                <FormattedMessage id="auth.account.actions" defaultMessage="Account actions" />
            </Heading>
            <div className="text-left">
                <Action
                    icon="icon-wallet"
                    title={<FormattedMessage id="auth.havekey" defaultMessage="I have a key" />}
                    description={<FormattedMessage id="auth.havekey.desc" defaultMessage="If you are already familiar with Genesis and have a backup of your private key - choose this option to guide you through the process of restoring of your account data" />}
                    action={<FormattedMessage id="auth.import.existing" defaultMessage="Import existing key" />}
                    onClick={props.onImport}
                />
                <hr />
                <Action
                    icon="icon-lock"
                    title={<FormattedMessage id="auth.nokey" defaultMessage="I don't have a key" />}
                    description={<FormattedMessage id="auth.nokey.desc" defaultMessage="If you are new to the system or just want to create a new account - proceed with this option to generate new private key and protect it with your password" />}
                    action={<FormattedMessage id="auth.generate.new" defaultMessage="Generate new key" />}
                    onClick={props.onCreate}
                />
            </div>
        </div>
    </LocalizedDocumentTitle>
);

export default ActionSelector;