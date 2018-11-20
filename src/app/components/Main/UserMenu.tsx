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
import { FormattedMessage } from 'react-intl';
import { IKeyInfo } from 'genesis/api';

import { CloseDropdownButton } from 'components/DropdownButton';
import SystemButton from './SystemButton';
import Avatar from 'containers/Avatar';
import PageLink from 'components/Routing/PageLink';

const StyledUserMenu = styled.div`
    -webkit-app-region: no-drag;
    line-height: 0;
    display: inline-block;
    vertical-align: top;
    height: 40px;   
    padding: 0 0 0 10px !important;
    line-height: 18px;
    color: #fff;

    > .user-info {
        text-align: right;
        float: left;
        margin-right: 5px;
        white-space: nowrap;
        max-width: 170px;

        > .user-title {
            margin-top: 4px;
            font-size: 14px;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        > .user-subtitle {
            text-transform: uppercase;
            font-size: 13px;
            font-weight: 300;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    > .user-avatar {
        float: right;
        margin: 4px;
    }

    .user-dropdown {
        background: #fff;
        box-shadow: 0 0 25px rgba(0,0,0,.15);
        border-left: solid 1px #add1ff;
        border-bottom: solid 1px #add1ff;
    }
`;

export interface IUserMenuProps {
    keyID: string;
    address: string;
    ecosystem: string;
    ecosystemName?: string;
    walletEcosystems: IKeyInfo[];
    onSwitchEcosystem: (ecosystem: string, defaultRole?: boolean) => void;
    onLogout: () => void;
    onChangePassword: () => void;
}

const UserMenu: React.SFC<IUserMenuProps> = props => (
    <SystemButton
        className="p0"
        width={225}
        align="right"
        rightMost
        content={
            <div>
                <ul className="dropdown-group">
                    <li>
                        <CloseDropdownButton onClick={props.onChangePassword}>
                            <em className="icon icon-key text-muted" />
                            <span>
                                <FormattedMessage id="general.wallet.changepassword" defaultMessage="Change password" />
                            </span>
                        </CloseDropdownButton>
                    </li>
                    <li>
                        <PageLink section="NOT_WORKING" page="backup">
                            <CloseDropdownButton>
                                <em className="icon icon-shield text-muted" />
                                <span>
                                    <FormattedMessage id="general.wallet.backup" defaultMessage="Backup wallet" />
                                </span>
                            </CloseDropdownButton>
                        </PageLink>
                    </li>
                    <li>
                        <CloseDropdownButton onClick={props.onLogout}>
                            <em className="icon icon-logout text-danger" />
                            <span>
                                <FormattedMessage id="general.wallet.signout" defaultMessage="Sign out" />
                            </span>
                        </CloseDropdownButton>
                    </li>
                </ul>
                <div className="dropdown-heading">
                    <FormattedMessage id="general.ecosystems" defaultMessage="Ecosystems" />
                </div>
                <ul className="dropdown-group">
                    {props.walletEcosystems.map(value => (
                        <li key={value.ecosystem}>
                            <CloseDropdownButton onClick={() => props.onSwitchEcosystem(value.ecosystem, !value.roles.length)}>
                                {value.name ?
                                    (
                                        value.name
                                    ) :
                                    (
                                        <FormattedMessage id="general.wallet.ecosystemNo" defaultMessage="Ecosystem #{ecosystem}" values={{ ecosystem: value.ecosystem }} />
                                    )
                                }
                            </CloseDropdownButton>
                        </li>
                    ))}
                </ul>
            </div>
        }
    >
        <StyledUserMenu>
            <div className="user-info">
                <div className="user-title">
                    {props.address}
                </div>
                <div className="user-subtitle">
                    {props.ecosystemName || (
                        <FormattedMessage
                            id="general.wallet.ecosystemNo"
                            defaultMessage="Ecosystem #{ecosystem}"
                            values={{ ecosystem: props.ecosystem }}
                        />
                    )}
                </div>
            </div>
            <Avatar
                className="user-avatar"
                size={32}
                keyID={props.keyID}
                ecosystem={props.ecosystem}
            />
        </StyledUserMenu>
    </SystemButton>
);

export default UserMenu;