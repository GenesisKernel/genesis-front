// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import * as _ from 'lodash';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import storage, { IStoredKey } from 'lib/storage';

export interface IUserMenuProps {
    collapsed: boolean;
    ecosystem: string;
    account: IStoredKey;
    onToggleCollapsed: () => void;
    onSwitchEcosystem: (ecosystem: string) => void;
    onLogout: () => void;
}

const UserMenu: React.SFC<IUserMenuProps> = (props) => props.account ? (
    <li className={`dropdown-list dropdown ${props.collapsed ? '' : 'open'}`}>
        <a className="dropdown-toggle" href="#" onClick={props.onToggleCollapsed}>
            <span>
                <em className="icon-user" />
            </span>
        </a>
        <ul className="dropdown-menu">
            <ul className="list-group">
                <div className="list-group-item">
                    <div className="media-box">
                        <div className="mt0 h5 text-bold">
                            <FormattedMessage id="auth.account.current" defaultMessage="Current account" />
                        </div>
                        <div className="pull-left">
                            <em className="fa fa-credit-card fa-2x text-info" />
                        </div>
                        <div className="media-box-body clearfix">
                            <p className="m0">{props.account.address}</p>
                            <p className="m0 text-muted">
                                <small>{storage.resolveEcosystemName(props.account, props.ecosystem)}</small>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="list-group-item">
                    <div className="mt0 h5 text-bold">
                        <FormattedMessage id="ecosystem.ecosystems" defaultMessage="Ecosystems" />
                    </div>
                    <Button bsStyle="primary" block disabled={'1' === props.ecosystem} onClick={() => props.onSwitchEcosystem('1')}>
                        <span>{storage.resolveEcosystemName(props.account, '1')}</span>
                        {'1' === props.ecosystem && (
                            <span>
                                <FormattedMessage id="ecosystem.current" defaultMessage="(current)" />
                            </span>
                        )}
                    </Button>
                    {_.map(props.account.ecosystems, ((key, value) => (
                        <Button key={key} className={key} bsStyle="primary" block disabled={key === props.ecosystem} onClick={() => props.onSwitchEcosystem(key)}>
                            <span>{value || key}</span>
                            {key === props.ecosystem && (
                                <span>
                                    <FormattedMessage id="ecosystem.current" defaultMessage="(current)" />
                                </span>
                            )}
                        </Button>
                    )))}
                </div>
                <a href="javascript:void(0)" className="list-group-item" onClick={props.onLogout}>
                    <em className="pull-left icon-logout mr" style={{ lineHeight: '20px' }} />
                    <small>
                        <FormattedMessage id="auth.logout.change" defaultMessage="Sign out / change account" />
                    </small>
                </a>
            </ul>
        </ul>
    </li>
) : null;

export default UserMenu;