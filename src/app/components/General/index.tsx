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
                    background: #4c7dbd;
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
    headless?: boolean;
    className?: string;
    return?: string | (() => void);
}

class General extends React.Component<IGeneralProps> {
    componentDidMount() {
        platform.on('desktop', () => {
            const { remote } = require('electron');
            const window = remote.getCurrentWindow();
            window.setResizable(false);
            window.setSize(640, 524);
            window.setMinimumSize(640, 524);
        });
    }

    render() {
        return (
            <StyledAuth>
                <div className="content">
                    <div className="auth-window desktop-flex-col desktop-flex-stretch">
                        <div className="panel panel-flat desktop-flex-col desktop-flex-stretch">
                            {!this.props.headless && (
                                <div className="panel-heading text-center clearfix drag">
                                    {this.props.return && (
                                        <div style={{ position: 'absolute' }}>
                                            {typeof this.props.return === 'function' ?
                                                (
                                                    <a className="text-muted" href="#" onClick={this.props.return}>
                                                        <StyledBackButton className="fa fa-chevron-left" />
                                                    </a>
                                                ) : (
                                                    <Link to={this.props.return.toString()} className="text-muted">
                                                        <StyledBackButton className="fa fa-chevron-left" />
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    )}
                                    <Link to="/">
                                        <img src={imgLogo} className="block-center" style={{ height: 25 }} />
                                    </Link>
                                </div>
                            )}
                            <div className={`panel-body desktop-flex-col desktop-flex-stretch ${this.props.className || ''}`}>
                                {this.props.children}
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
    }
}

export default General;