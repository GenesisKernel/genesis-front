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
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { ILoginCall, IAccountContext } from 'genesis/auth';

import Avatar from 'containers/Avatar';
import Validation from 'components/Validation';
import Heading from 'components/Auth/Heading';

export interface IPasswordPromptProps {
    className?: string;
    wallet: IAccountContext;
    onSubmit: (params: ILoginCall) => void;
    onCancel: () => void;
}

const PasswordPrompt: React.SFC<IPasswordPromptProps & InjectedIntlProps> = props => {
    const onSubmit = (values: { [key: string]: any }) =>
        props.onSubmit({
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
                        <Avatar
                            size={100}
                            keyID={props.wallet.wallet.id}
                            ecosystem={props.wallet.access.ecosystem}
                        />
                    </div>
                    <h4 className="text-center mt0">
                        {`${props.wallet.wallet.address} (${props.wallet.access.name || props.wallet.access.ecosystem})`}
                    </h4>
                    <p>
                        <FormattedMessage id="auth.session.prompt" defaultMessage="Please enter your password to sign in" />
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

export default styled(injectIntl(PasswordPrompt))`
    .avatar-holder {
        width: 100px;
        height: 100px;
        margin: 0 auto 15px auto;
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