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
import styled from 'styled-components';
import imgControls from './wndControls.svg';
import { remote } from 'electron';

const StyledControls = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    text-align: right;

    button {
        -webkit-app-region: no-drag;
        cursor: default;
        background: 0;
        border: 0;
        outline: 0;
        padding: 0;
        margin: 0;
        width: 28px;
        height: 28px;
        text-align: center;
        opacity: 0.5;

        > i {
            background: url(${imgControls}) 0 -70px no-repeat;
            width: 14px;
            height: 14px;
            display: inline-block;
            margin-top: 6px;
        }

        &:hover { opacity: 0.8; }

        &.quit {
            position: absolute;
            left: 0;
            > i { background-position-x: 0; }
        }

        &.maximize > i { background-position-x: -14px; }

        &.restore > i { background-position-x: -42px; }

        &.minimize > i { background-position-x: -28px; }
    }
`;

interface ILinuxTitlebarState {
    maximized: boolean;
}

class LinuxTitlebar extends React.Component<{}, ILinuxTitlebarState> {
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
                <div className="window-controls">
                    <button className="minimize" onClick={this.onMinimize}><i /></button>
                    <button className={this.state.maximized ? 'restore' : 'maximize'} onClick={this.onMaximize}><i /></button>
                    <button className="quit" onClick={this.onClose}><i /></button>
                </div>
            </StyledControls>
        );
    }
}

export default LinuxTitlebar;