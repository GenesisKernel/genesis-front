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