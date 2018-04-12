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