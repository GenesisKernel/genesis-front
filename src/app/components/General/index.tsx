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
import { Link } from 'react-router-dom';
import imgLogo from 'images/logo.svg';
import styled from 'styled-components';
import platform from 'lib/platform';

import Titlebar from 'components/Main/Titlebar';
import { FormattedMessage } from 'react-intl';

const StyledAuth = styled.div`
    width: 100%;
    height: 100%;
    display: table;

    .content {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        height: 100%;
        padding: ${platform.select({ web: '10px', desktop: '0' })};

        .auth-window {
            max-width: ${platform.select({ web: '600px', desktop: 'none' })};
            height: ${platform.select({ web: 'auto', desktop: '100%' })};
            margin: 0 auto;
            
            .panel {
                overflow: hidden;
                background: #fff;

                > .panel-heading {
                    position: relative;
                    background: #4c7dbd;
                    height: 40px;

                    .auth-logo {
                        margin-top: 8px;
                        height: 25px;
                    }

                    .auth-back {
                        -webkit-app-region: no-drag;
                        position: absolute;
                        left: 10px;
                        top: 5px;
                        line-height: 30px;

                        .icon {
                            position: relative;
                            vertical-align: middle;
                            font-size: 16px;
                            top: -2px;
                            margin-right: 5px;
                        }

                        &.auth-back-darwin {
                            left: auto;
                            right: 10px;
                            top: 5px;
                        }

                        &.auth-back-linux {
                            left: 30px;
                            top: 5px;
                        }
                    }
                }
            }
        }
    }
`;

const StyledBackButton = styled.em`
    font-size: 20px;
    margin-top: 4px;
`;

export interface IGeneralProps {
    className?: string;
    return?: string | (() => void);
}

const General: React.SFC<IGeneralProps> = props => (
    <StyledAuth>
        <div className="content">
            <div className="auth-window desktop-flex-col desktop-flex-stretch">
                <div className="panel panel-flat desktop-flex-col desktop-flex-stretch">
                    <div className="panel-heading text-center clearfix drag p0">
                        {platform.select({
                            desktop: (
                                <Titlebar>
                                    {props.return && (
                                        <div className={`auth-back ${platform.select({ linux: 'auth-back-linux', darwin: 'auth-back-darwin' })}`}>
                                            {typeof props.return === 'function' ?
                                                (
                                                    <a className="text-white" href="#" onClick={props.return}>
                                                        <StyledBackButton className="icon icon-arrow-left" />
                                                        <FormattedMessage id="general.back" defaultMessage="Back" />
                                                    </a>
                                                ) : (
                                                    <Link to={props.return.toString()} className="text-white">
                                                        <StyledBackButton className="icon icon-arrow-left" />
                                                        <FormattedMessage id="general.back" defaultMessage="Back" />
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    )}
                                    <img src={imgLogo} className="auth-logo" />
                                </Titlebar>
                            ),
                            web: (
                                <div>
                                    {props.return && (
                                        <div className="auth-back">
                                            {typeof props.return === 'function' ?
                                                (
                                                    <a className="text-white" href="#" onClick={props.return}>
                                                        <StyledBackButton className="icon icon-arrow-left" />
                                                        <FormattedMessage id="general.back" defaultMessage="Back" />
                                                    </a>
                                                ) : (
                                                    <Link to={props.return.toString()} className="text-white">
                                                        <StyledBackButton className="icon icon-arrow-left" />
                                                        <FormattedMessage id="general.back" defaultMessage="Back" />
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    )}
                                    <Link to="/">
                                        <img src={imgLogo} className="auth-logo block-center" style={{ height: 25 }} />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    <div className={`panel-body desktop-flex-col desktop-flex-stretch ${props.className || ''}`}>
                        {props.children}
                    </div>
                </div>
                {platform.select({
                    web: (
                        <div className="p-lg text-center text-white">
                            <div className="pull-left">
                                <div>Apla &copy; {new Date().getFullYear()} - <a href="http://apla.io">http://apla.io</a></div>
                            </div>
                            <div className="pull-right">
                                <a href="#">English(US)</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </StyledAuth>
);

export default General;