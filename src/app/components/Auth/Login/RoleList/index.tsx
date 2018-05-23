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
import classNames from 'classnames';
import styled from 'styled-components';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { IAccount } from 'genesis/auth';

import Heading from 'components/Auth/Heading';
import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import RoleButton from './RoleButton';
import ContextButton from '../ContextButton';

export interface IRoleListProps {
    className?: string;
    account: IAccount;
    roles: {
        id: number;
        name: string;
        notifications: number;
    }[];
    onSubmit: (role: number) => void;
    onCancel: () => void;
}

const RoleList: React.SFC<IRoleListProps & InjectedIntlProps> = props => (
    <LocalizedDocumentTitle title="auth.role.select" defaultTitle="Select role">
        <div className={classNames('desktop-flex-col desktop-flex-stretch', props.className)}>
            <Heading onReturn={props.onCancel}>
                <FormattedMessage id="auth.role.select" defaultMessage="Select role" />
            </Heading>
            <div className="role-list form-horizontal desktop-flex-col desktop-flex-stretch">
                <FormattedMessage
                    id="auth.role.disclaimer"
                    defaultMessage="Select role that you want to use to login. Data representation will change according to your selected role. You can switch it at any time"
                />
                <hr />
                <div className="text-center desktop-flex-stretch">
                    {props.roles.map(role => (
                        <RoleButton
                            key={role.id}
                            id={role.id}
                            name={role.name}
                            notifications={role.notifications}
                            onSelect={() => props.onSubmit(role.id)}
                        />
                    ))}
                </div>
                <div className="text-left">
                    <ContextButton icon="icon-close" onClick={() => props.onSubmit(null)}>
                        <FormattedMessage id="auth.role.empty" defaultMessage="Login without role" />
                    </ContextButton>
                </div>
            </div>
        </div>
    </LocalizedDocumentTitle>
);

export default styled(injectIntl(RoleList)) `
    .role-list {
        padding: 10px;
    }
`;