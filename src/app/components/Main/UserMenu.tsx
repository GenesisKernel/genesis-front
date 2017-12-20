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
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';
import { Link } from 'react-router-dom';
import { IStoredKey } from 'lib/storage';
import imgAvatar from 'images/avatar.svg';
import { FormattedMessage } from 'react-intl';

const StyledUserMenu = styled.div`
    -webkit-app-region: no-drag;
    line-height: 0;

    button {
        background: 0;
        border: 0;
        outline: 0;
        height: 40px;   
        padding: 0 0 0 10px !important;
        line-height: 18px;
        color: #fff;

        > .user-info {
            text-align: right;
            float: left;
            margin-right: 5px;
            width: 170px;
            white-space: nowrap;

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
            max-height: 32px;
            max-width: 32px;
            margin: 4px;
        }
    }

    > .user-dropdown {
        background: #fff;
        box-shadow: 0 0 25px rgba(0,0,0,.15);

        .dropdown-heading {
            border-top: solid 1px #ddd;
            height: 30px;
            line-height: 30px;
            padding: 0 15px;
            font-size: 11px;
            text-transform: uppercase;
            color: #999;
        }

        .dropdown-group {
            list-style: none;
            padding: 0;
            margin: 0;

            > li {
                a {
                    text-decoration: none;
                }

                button {
                    width: 100%;
                    display: block;
                    padding: 0 15px !important;
                    margin: 0;
                    height: 40px;
                    line-height: 40px;
                    font-size: 13px;
                    font-weight: 500;
                    text-decoration: none;
                    color: #666;
                    cursor: pointer;
                    display: block;
                    text-align: left;

                    > .icon {
                        float: right;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 40px;
                    }

                    &[disabled] {
                        color: #ccc;
                    }

                    &:focus {
                        outline: dashed 1px #84baff !important;
                    }
                }
            }
        }
    }
`;

export interface IUserMenuProps {
    ecosystem: string;
    account: IStoredKey;
    onSwitchEcosystem: (ecosystem: string) => void;
    onLogout: () => void;
}

interface IUserMenuState {
    collapsed: boolean;
}

class UserMenu extends React.Component<IUserMenuProps, IUserMenuState> {
    constructor(props: IUserMenuProps) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    onCollapseToggle(collapsed?: boolean) {
        this.setState({
            collapsed: 'boolean' === typeof collapsed ? collapsed : !this.state.collapsed
        });
    }

    onBackupAccount() {
        this.onCollapseToggle(true);
    }

    onSwitchEcosystem(ecosystem: string) {
        if (this.props.ecosystem === ecosystem) {
            this.onCollapseToggle(true);
        }
        else {
            this.props.onSwitchEcosystem(ecosystem);
        }
    }

    handleClickOutside(event: React.MouseEvent<HTMLElement>) {
        this.onCollapseToggle(true);
    }

    render() {
        return this.props.account ? (
            <StyledUserMenu>
                <button onClick={this.onCollapseToggle.bind(this)}>
                    <div className="user-info">
                        <div className="user-title">
                            {this.props.account.ecosystems[this.props.ecosystem].type || this.props.account.address}
                        </div>
                        <div className="user-subtitle">
                            {this.props.account.ecosystems[this.props.ecosystem].name || (
                                <FormattedMessage id="general.ecosystem.id" defaultMessage="Ecosystem {name}" values={{ name: this.props.ecosystem }} />
                            )}
                        </div>
                    </div>
                    <img className="user-avatar" src={this.props.account.ecosystems[this.props.ecosystem].avatar || imgAvatar} />
                </button>
                {!this.state.collapsed && (
                    <div className="user-dropdown">
                        <ul className="dropdown-group">
                            <li>
                                <button disabled>
                                    <em className="icon icon-key text-muted" />
                                    <span>
                                        <FormattedMessage id="general.account.changepassword" defaultMessage="Change password" />
                                    </span>
                                </button>
                            </li>
                            <li>
                                <Link to="/backup">
                                    <button onClick={this.onCollapseToggle.bind(this, true)}>
                                        <em className="icon icon-shield text-muted" />
                                        <span>
                                            <FormattedMessage id="general.account.backup" defaultMessage="Backup account" />
                                        </span>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <button onClick={this.props.onLogout}>
                                    <em className="icon icon-logout text-danger" />
                                    <span>
                                        <FormattedMessage id="general.account.signout" defaultMessage="Sign out" />
                                    </span>
                                </button>
                            </li>
                        </ul>
                        <div className="dropdown-heading">Ecosystems</div>
                        <ul className="dropdown-group">
                            {_.map(this.props.account.ecosystems, ((value, key) => (
                                <li key={key}>
                                    <button onClick={this.onSwitchEcosystem.bind(this, key)}>
                                        {value.name || key}
                                    </button>
                                </li>
                            )))}
                        </ul>
                    </div>
                )}
            </StyledUserMenu>
        ) : null;
    }
}

export default onClickOutside(UserMenu as any) as typeof UserMenu;