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
import { IKeyInfo, IRoleInfo, IWalletData } from 'genesis/api';
import { INotificationsMessage } from 'genesis/socket';
import { FormattedMessage } from 'react-intl';
import { Button, Clearfix } from 'react-bootstrap';

import Avatar from 'containers/Avatar';
import RoleButton from './RoleButton';

export interface IWalletButtonProps {
    className?: string;
    wallet: IWalletData;
    notifications: INotificationsMessage[];
    onCopy: () => void;
    onRemove: () => void;
    onSelect: (params: { access: IKeyInfo, role?: IRoleInfo }) => void;
    onRegister?: () => void;
}

const getNotificationsCount = (notifications: INotificationsMessage[], role: number, ecosystem: string) => {
    const value = notifications.find(l => l.role === role && ecosystem === l.ecosystem);
    return value ? value.count : 0;
};

const WalletButton: React.SFC<IWalletButtonProps> = (props) => (
    <Clearfix componentClass="div" className={props.className}>
        <div className="wallet-icon">
            <em className="text-primary icon-wallet" />
        </div>
        <div className="wallet-head">
            <h4 className="wallet-name">
                {props.wallet.address}
            </h4>
            {0 === props.wallet.access.length && props.onRegister && (
                <div className="text-danger">
                    <FormattedMessage id="auth.wallet.register.desc" defaultMessage="This wallet is pending registration. Click register to begin the process" />
                </div>
            )}
            <div>
                {0 === props.wallet.access.length && props.onRegister && (
                    <Button className="btn-action" bsStyle="link" onClick={props.onRegister}>
                        <FormattedMessage id="auth.wallet.register" defaultMessage="Register" />
                    </Button>
                )}
                <Button className="btn-action" bsStyle="link" onClick={props.onCopy}>
                    <FormattedMessage id="auth.wallet.share" defaultMessage="Share" />
                </Button>
                <Button className="btn-action" bsStyle="link" onClick={props.onRemove}>
                    <FormattedMessage id="auth.wallet.remove" defaultMessage="Remove" />
                </Button>
            </div>
        </div>
        <div>
            {props.wallet.access.map(access => (
                <div key={access.ecosystem} className="wallet-access">
                    <div className="wallet-child media-box" key={access.ecosystem}>
                        <div className="pull-left">
                            <Avatar
                                size={44}
                                keyID={props.wallet.id}
                                ecosystem={access.ecosystem}
                            />
                        </div>
                        <div className="wallet-child-content media-box-body clearfix">
                            <div>
                                <div><b>({access.ecosystem}) {access.name && access.name}</b></div>
                                <div>
                                    <span>
                                        <FormattedMessage id="auth.login.as" defaultMessage="Login with role" />:
                                    </span>
                                    <RoleButton className="wallet-btn" badge={getNotificationsCount(props.notifications, 0, access.ecosystem)} onClick={() => props.onSelect({ access })}>
                                        <FormattedMessage id="auth.role.guest" defaultMessage="Guest" />
                                    </RoleButton>
                                    {access.roles.map(role => (
                                        <RoleButton key={role.id} className="wallet-btn" badge={getNotificationsCount(props.notifications, Number(role.id), access.ecosystem)} onClick={() => props.onSelect({ access, role })}>
                                            {role.name}
                                        </RoleButton>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Clearfix>
);

export default styled(WalletButton)`
    text-align: initial;
    border-bottom: 1px solid #e4eaec;
    padding: 0 0 10px;
    position: relative;
    margin: 0 20px 0 20px;

    .wallet-head {
        margin-left: 60px;
    }
    
    .wallet-name {
        margin-bottom: 5px;
    }

    .wallet-icon {
        position: absolute;
        top: 5px;
        left: 0;
        height: 80px;
        font-size: 40px;
        vertical-align: top;
        text-align: center;
        margin-right: 20px;
    }

    .wallet-access {
        position: relative;
        margin-top: 10px;

        .wallet-child {
            margin-top: 0;
        }

        .wallet-child-content {
            padding-left: 5px;
        }
    }

    .wallet-btn {
        margin-left: 5px;
    }

    .btn-action {
        padding: 0;
        margin-right: 10px;
    }
`;