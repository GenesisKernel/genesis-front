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
import styled from 'styled-components';
import imgControls from './wndControls.svg';
import { remote } from 'electron';
import { ITitlebarProps } from './';

import SystemMenu from 'containers/Main/Titlebar/SystemMenu';

const StyledControls = styled.div`
    position: absolute;
    right: 1px;
    left: 0;
    top: 0;

    .window-systemmenu {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10000;
    }
    
    .window-controls {
        position: absolute;
        right: 0;
        top: 0;

        button {
            cursor: default;
            background: 0;
            border: 0;
            outline: 0;
            padding: 0;
            margin: 0;
            width: 46px;
            height: 28px;
            text-align: center;

            > i {
                background: url(${imgControls}) 0 -56px no-repeat;
                width: 14px;
                height: 14px;
                display: inline-block;
                margin-top: 6px;
            }

            &:hover { background: #aaa; }

            &.quit {
                &:hover { background: #c45f5f; }
                > i { background-position-x: 0; }
            }

            &.maximize > i { background-position-x: -14px; }

            &.restore > i { background-position-x: -42px; }

            &.minimize > i { background-position-x: -28px; }
        }
    }
`;

interface IWinTitlebarState {
    maximized: boolean;
}

class WinTitlebar extends React.Component<ITitlebarProps, IWinTitlebarState> {
    _stateListener = this.onStateChange.bind(this);

    constructor(props: {}) {
        super(props);

        remote.getCurrentWindow().on('maximize', this._stateListener);
        remote.getCurrentWindow().on('unmaximize', this._stateListener);

        this.state = {
            maximized: remote.getCurrentWindow().isMaximized()
        };
    }

    componentWillUnmount() {
        remote.getCurrentWindow().removeListener('maximize', this._stateListener);
        remote.getCurrentWindow().removeListener('unmaximize', this._stateListener);
    }

    onStateChange(e: { sender: { isMaximized: () => boolean } }) {
        this.setState({
            maximized: e.sender.isMaximized()
        });
    }

    onClose() {
        remote.getCurrentWindow().close();
    }

    onMinimize() {
        remote.getCurrentWindow().minimize();
    }

    onMaximize() {
        if (remote.getCurrentWindow().isMaximized()) {
            remote.getCurrentWindow().unmaximize();
        }
        else {
            remote.getCurrentWindow().maximize();
        }
    }

    render() {
        return (
            <StyledControls>
                <div className="window-systemmenu no-drag">
                    <SystemMenu align="left" />
                </div>
                <div className="window-controls no-drag">
                    <button className="minimize" onClick={this.onMinimize}><i /></button>
                    {false !== this.props.maximizable && (
                        <button className={this.state.maximized ? 'restore' : 'maximize'} onClick={this.onMaximize}><i /></button>
                    )}
                    <button className="quit" onClick={this.onClose}><i /></button>
                </div>
            </StyledControls>
        );
    }
}

export default WinTitlebar;