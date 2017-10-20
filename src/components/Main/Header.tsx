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
import { FormattedMessage } from 'react-intl';
import LoadingBar, { LoadingBar as ProgressBar } from 'react-redux-loading-bar';
import onClickOutside from 'react-onclickoutside';
import { OrderedMap } from 'immutable';
import styled from 'styled-components';

import UserMenu from 'containers/Widgets/UserMenu';

const StyledNavbar = styled.ul`
    > li {
        > .dropdown-menu {
            transition: opacity .2s ease-in-out;
            opacity: 0;
            display: block;
            max-height: 0;
            overflow: hidden;
        }

        &.open {
            > .dropdown-menu {
                opacity: 1;
                max-height: none;
            }   
        }
    }
`;

const StyledLoadingBar = styled(LoadingBar) `
    position: fixed;
    right: 0;
    left: ${props => props.style.left};
`;

const StyledProgressBar = styled.div`
    background: #eee;
    margin-top: 10px;

    .bar-fill {
        position: static;
        width: auto !important;
        height: 2px;
        opacity: 1;
        background-color: #41bd41;
    }
`;

const StyledHistoryButton = styled.button`
    transition: background-color .1s ease-in-out;
    background-color: #f0f0f0;
    border: 0;
    outline: 0;
    border-radius: 0 0 2px 2px;
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0;
    margin: 0;

    &:hover {
        background-color: #f5f5f5;
    }

    &:active {
        background-color: #eee;
    }
`;

export interface IHeaderProps {
    pendingTransactions: OrderedMap<string, { uuid: string, block: string, error: string, contract: string }>;
    transactionsCount: number;
    collapseTransition?: string;
    leftOffset?: number;
    className?: string;
    toggleCollapsed: () => void;
}

interface IHeaderState {
    dropdown: string;
}

// TODO: Move header to a separate container
class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {
        super(props);
        this.state = {
            dropdown: null
        };
    }

    handleClickOutside(event: React.MouseEvent<HTMLElement>) {
        this.onDropdownToggle(null);
    }

    onDropdownToggle(name: string) {
        this.setState({
            dropdown: (this.state.dropdown === name) ? null : name
        });
    }

    isDropdownVisible(name: string) {
        return this.state.dropdown === name;
    }

    render() {
        const pendingTxCount = this.props.pendingTransactions.filter(l => !l.block && !l.error).count();
        const rejectedTxCount = this.props.pendingTransactions.filter(l => !!l.error).count();

        return (
            <header className={this.props.className}>
                <nav role="navigation" className="navbar topnavbar">
                    <div className="nav-wrapper">
                        <ul className="nav navbar-nav">
                            <li>
                                <a href="#" onClick={this.props.toggleCollapsed}>
                                    <em className="fa fa-navicon" />
                                </a>
                            </li>
                        </ul>
                        <StyledNavbar className="nav navbar-nav navbar-right">
                            <li className={`dropdown-list dropdown ${this.isDropdownVisible('tx') ? 'open' : ''}`}>
                                <a href="#" className="dropdown-toggle" onClick={this.onDropdownToggle.bind(this, 'tx')}>
                                    <span>
                                        <em className="icon-hourglass" />
                                        {rejectedTxCount ? (
                                            <span className="label label-danger">{rejectedTxCount}</span>
                                        ) : (
                                                pendingTxCount ? (
                                                    <span className="label label-warning">{pendingTxCount}</span>
                                                ) : null
                                            )
                                        }
                                    </span>
                                </a>
                                <div className="dropdown-menu" style={{ minWidth: '25vw' }}>
                                    {this.props.pendingTransactions.isEmpty() ?
                                        (
                                            <div className="list-group">
                                                <div className="list-group-item">
                                                    <div className="small">
                                                        <FormattedMessage id="tx.history.empty" defaultMessage="Transactions list is empty" />
                                                    </div>
                                                </div>
                                            </div>
                                        ) :
                                        (
                                            <div className="list-group">
                                                {this.props.pendingTransactions.reverse().toArray().map((t, index) => (
                                                    <div className="list-group-item" key={t.uuid}>
                                                        <div className="media-box">
                                                            <div className="pull-left" style={{ width: 20, textAlign: 'center' }}>
                                                                {t.block && (
                                                                    <em className="fa fa-check text-success" />
                                                                )}
                                                                {t.error && (
                                                                    <em className="fa fa-exclamation text-danger" />
                                                                )}
                                                                {!t.block && !t.error && (
                                                                    <em className="fa fa-refresh text-warning fa-pulse" />
                                                                )}
                                                            </div>
                                                            <div className="media-box-body clearfix">
                                                                <p className="m0">{t.contract}</p>
                                                                <p className="m0 text-muted small">
                                                                    {t.block && (
                                                                        <span>
                                                                            <FormattedMessage id="tx.imprinted" defaultMessage="Imprinted in the blockchain" />
                                                                        </span>
                                                                    )}
                                                                    {t.error && (
                                                                        <span>
                                                                            <FormattedMessage id="tx.error" defaultMessage="Error executing transaction" />
                                                                        </span>
                                                                    )}
                                                                    {!t.block && !t.error && (
                                                                        <span>
                                                                            <FormattedMessage id="tx.pending" defaultMessage="Executing transaction..." />
                                                                        </span>
                                                                    )}
                                                                </p>
                                                                <StyledProgressBar>
                                                                    <ProgressBar className="bar-fill" loading={(!t.block && !t.error) ? 1 : 0} />
                                                                </StyledProgressBar>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                                }
                                                <StyledHistoryButton>
                                                    <FormattedMessage id="tx.history.view" defaultMessage="View session history({count})" values={{ count: this.props.transactionsCount }} />
                                                </StyledHistoryButton>
                                            </div>
                                        )
                                    }
                                </div>
                            </li>
                            <li className={`dropdown-list dropdown ${this.isDropdownVisible('notifications') ? 'open' : ''}`}>
                                <a className="dropdown-toggle" href="#" onClick={this.onDropdownToggle.bind(this, 'notifications')}>
                                    <span>
                                        <em className="icon-bell" />
                                        <span className="label label-danger">11</span>
                                    </span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="basic-nav-dropdown">
                                    <ul className="list-group">
                                        <a href="javascript:void(0)" className="list-group-item">
                                            <div className="media-box">
                                                <div className="pull-left">
                                                    <em className="fa fa-twitter fa-2x text-info" />
                                                </div>
                                                <div className="media-box-body clearfix">
                                                    <p className="m0">New followers</p>
                                                    <p className="m0 text-muted">
                                                        <small>1 new follower</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="list-group-item">
                                            <div className="media-box">
                                                <div className="pull-left">
                                                    <em className="fa fa-envelope fa-2x text-warning" />
                                                </div>
                                                <div className="media-box-body clearfix">
                                                    <p className="m0">New e-mails</p>
                                                    <p className="m0 text-muted">
                                                        <small>You have 10 new emails</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="list-group-item">
                                            <div className="media-box">
                                                <div className="pull-left">
                                                    <em className="fa fa-tasks fa-2x text-success" />
                                                </div>
                                                <div className="media-box-body clearfix">
                                                    <p className="m0">Pending Tasks</p>
                                                    <p className="m0 text-muted">
                                                        <small>11 pending task</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)" className="list-group-item">
                                            <small>More notifications</small>
                                            <span className="label label-danger pull-right">14</span>
                                        </a>
                                    </ul>
                                </ul>
                            </li>
                            <UserMenu
                                collapsed={!this.isDropdownVisible('user')}
                                onToggleCollapsed={this.onDropdownToggle.bind(this, 'user')}
                            />
                        </StyledNavbar>
                    </div>
                </nav>
                <StyledLoadingBar
                    showFastActions
                    style={{
                        backgroundColor: '#2b9fe9',
                        width: 'auto',
                        height: 2,
                        left: this.props.leftOffset + 'px'
                    }}
                />
            </header>
        );
    }
}

const StyledHeader = styled(onClickOutside(Header as any) as typeof Header) `
    z-index: 1000;
    position: fixed;
    transition: left ${props => props.collapseTransition || 'none'};
    left: ${props => props.leftOffset}px;
    right: 0;
    top: 0;
`;

export default StyledHeader;