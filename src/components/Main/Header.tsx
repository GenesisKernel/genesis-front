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
import LoadingBar from 'react-redux-loading-bar';
import styled from 'styled-components';

import UserMenu from 'components/Main/UserMenu';

const StyledLoadingBar = styled(LoadingBar) `
    position: fixed;
    right: 0;
    left: ${props => props.style.left};
`;

export interface IHeaderProps {
    collapseTransition?: string;
    leftOffset?: number;
    className?: string;
    toggleCollapsed: () => void;
}

const Header: React.SFC<IHeaderProps> = (props) => (
    <header className={props.className}>
        <nav role="navigation" className="navbar topnavbar">
            <div className="nav-wrapper">
                <ul className="nav navbar-nav">
                    <li>
                        <a href="#" onClick={props.toggleCollapsed}>
                            <em className="fa fa-navicon" />
                        </a>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown-list dropdown">
                        <a href="#" className="dropdown-toggle">
                            <span>
                                <em className="icon-hourglass" />
                                <span className="label label-warning">1</span>
                            </span>
                        </a>
                        <ul className="dropdown-menu animated flipInX">
                            <li>
                                <div className="list-group">
                                    <div className="list-group-item">
                                        <small>No notifications</small>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown-list dropdown">
                        <a role="button" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false" href="#">
                            <span>
                                <em className="icon-bell" />
                                <span className="label label-danger">11</span>
                            </span>
                        </a>
                        <ul role="menu" className="dropdown-menu" aria-labelledby="basic-nav-dropdown">
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
                    <li>
                        <UserMenu />
                    </li>
                </ul>
            </div>
        </nav>
        {/*loading={props.loading*/}
        <StyledLoadingBar
            showFastActions
            style={{
                backgroundColor: '#2b9fe9',
                width: 'auto',
                height: 2,
                left: props.leftOffset + 'px'
            }}
        />
    </header>
);

const StyledHeader = styled(Header) `
    z-index: 1000;
    position: fixed;
    transition: left ${props => props.collapseTransition || 'none'};
    left: ${props => props.leftOffset}px;
    right: 0;
    top: 0;
`;

export default StyledHeader;