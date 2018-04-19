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
import { Route, Switch, Redirect } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import imgLogo from 'images/logo.svg';
import styled from 'styled-components';
import platform from 'lib/platform';

import Titlebar from 'components/Main/Titlebar';
import Welcome from 'containers/Auth/Welcome';
import Account from 'components/Auth/Account';
import Login from 'containers/Auth/Login';
import Offline from 'containers/Auth/Offline';

export interface IAuthProps {
    className?: string;
    firstRun: boolean;
    isOffline: boolean;
}

const Auth: React.SFC<IAuthProps> = props => (
    <div className={props.className}>
        <div className="auth-window-container">
            <div className="auth-window">
                <Panel
                    className="m0"
                    header={platform.select({ desktop: <Titlebar maximizable={false} /> })}
                >
                    <Switch>
                        {props.isOffline && (<Route path="/" component={Offline} />)}
                        <Route path="/account" component={Account} />
                        {props.firstRun && (<Route path="/" component={Welcome} />)}
                        {!props.firstRun && (<Route path="/" component={Login} />)}
                        <Redirect to="/" />
                    </Switch>
                </Panel>
                {platform.select({
                    web: (
                        <div className="clearfix p-lg text-center text-white">
                            <div className="pull-left">
                                <div>Genesis &copy; 2017 - 2018 - <a href="http://genesis.space">http://genesis.space</a></div>
                            </div>
                            <div className="pull-right">
                                <a href="#">English(US)</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
);

export default styled(Auth) `
    display: ${platform.select({ web: 'table', desktop: 'block' })};
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;

    .auth-window-container {
        display: ${platform.select({ web: 'table-cell', desktop: 'block' })};
        vertical-align: middle;
        overflow: hidden;
        height: 100%;

        .auth-window {
            text-align: center;
            max-width: ${platform.select({ web: '600px', desktop: 'none' })};
            height: ${platform.select({ web: 'auto', desktop: '100%' })};
            padding: ${platform.select({ web: '10px', desktop: '0' })};
            margin: 0 auto;
            
            .panel {
                height: ${platform.select({ web: 'auto', desktop: '100%' })};
                overflow: hidden;
                background: #fff;
                border: 0;

                > .panel-heading {
                    position: relative;
                    background: url(${imgLogo}) no-repeat 50% 50% #4c7dbd;
                    background-size: 65px;
                    height: 28px;
                    padding: 0;
                    user-select: none;
                    -webkit-app-region: drag;

                    .auth-back {
                        -webkit-app-region: no-drag;
                        position: absolute;
                        right: auto;
                        left: 30px;
                        top: 0;
                        line-height: 28px;

                        .icon {
                            position: relative;
                            vertical-align: middle;
                            font-size: 16px;
                            top: -2px;
                            margin-right: 5px;
                        }

                        &.auth-back-darwin {
                            left: auto;
                            right: 30px;
                        }
                    }
                }

                > .panel-body {
                    overflow-x: hidden;
                    overflow-y: auto;
                    max-height: 100%;
                    height: 100%;
                }
            }
        }
    }
`;