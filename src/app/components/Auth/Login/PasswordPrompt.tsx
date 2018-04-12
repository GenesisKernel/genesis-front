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
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { IAccount } from 'genesis/auth';
import imgAvatar from 'images/avatar.svg';

import Validation from 'components/Validation';
import Heading from 'components/Auth/Heading';

export interface IPasswordPromptProps {
    className?: string;
    account: IAccount;
    onSubmit: (params: { account: IAccount, password: string }) => void;
    onCancel: () => void;
}

const PasswordPrompt: React.SFC<IPasswordPromptProps & InjectedIntlProps> = props => {
    const onSubmit = (values: { [key: string]: any }) =>
        props.onSubmit({
            account: props.account,
            password: values.password
        });

    return (
        <div className={props.className}>
            <Validation.components.ValidatedForm className="form-horizontal" onSubmitSuccess={onSubmit}>
                <Heading onReturn={props.onCancel}>
                    <FormattedMessage id="auth.authentication" defaultMessage="Authentication" />
                </Heading>
                <div className="text-center desktop-flex-stretch">
                    <div className="avatar-holder">
                        <img src={props.account.avatar || imgAvatar} />
                    </div>
                    <h4 className="text-center mt0">
                        {`${props.account.username || props.account.id} (${props.account.ecosystemName || props.account.ecosystem})`}
                    </h4>
                    <p>
                        <FormattedMessage id="auth.session.expired" defaultMessage="Your session has expired. Please enter your password to sign in" />
                    </p>
                    <div className="password-prompt">
                        <Validation.components.ValidatedControl
                            type="password"
                            name="password"
                            placeholder={props.intl.formatMessage({ id: 'auth.password', defaultMessage: 'Enter your password...' })}
                        />
                        <Validation.components.ValidatedSubmit className="btn-block">
                            <em className="icon icon-login" />
                        </Validation.components.ValidatedSubmit>
                    </div>
                </div>
            </Validation.components.ValidatedForm>
        </div>
    );
};

export default styled(injectIntl(PasswordPrompt)) `
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
`;