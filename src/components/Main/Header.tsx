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

import UserMenu from 'components/Main/UserMenu';

interface IHeaderProps {
    toggleCollapsed: () => void;
}

const Header: React.SFC<IHeaderProps> = (props) => (
    <header className="topnavbar-wrapper">
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
                        <a id="basic-nav-dropdown" role="button" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false" href="#">
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
            <form role="search" action="search.html" className="navbar-form">
                <div className="form-group has-feedback">
                    <input type="text" placeholder="Type and hit enter ..." className="form-control" />
                    <div data-search-dismiss="" className="fa fa-times form-control-feedback" />
                </div>
                <button type="submit" className="hidden btn btn-default">Submit</button>
            </form>
        </nav>
    </header>
);

export default Header;