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
import styled from 'styled-components';
import imgControls from './wndControls.svg';
import platform from 'lib/platform';
import { ITitlebarProps } from './';

import SystemMenu from 'containers/Main/Titlebar/SystemMenu';

const StyledControls = styled.div`
    position: absolute;
    left: 0;
    right: 0;
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

            &.quit { > i { background-position-x: 0; } }
            &.maximize > i { background-position-x: -14px; }
            &.restore > i { background-position-x: -42px; }
            &.minimize > i { background-position-x: -28px; }
        }
    }
`;

interface ILinuxTitlebarState {
    maximized: boolean;
}

class LinuxTitlebar extends React.Component<ITitlebarProps, ILinuxTitlebarState> {
    _stateListener = this.onStateChange.bind(this);

    constructor(props: {}) {
        super(props);

        const wnd = platform.getElectron().remote.getCurrentWindow();
        wnd.on('maximize', this._stateListener);
        wnd.on('unmaximize', this._stateListener);

        this.state = {
            maximized: wnd.isMaximized()
        };
    }

    componentWillUnmount() {
        const wnd = platform.getElectron().remote.getCurrentWindow();
        wnd.removeListener('maximize', this._stateListener);
        wnd.removeListener('unmaximize', this._stateListener);
    }

    onStateChange(e: { sender: { isMaximized: () => boolean } }) {
        this.setState({
            maximized: e.sender.isMaximized()
        });
    }

    onClose() {
        const wnd = platform.getElectron().remote.getCurrentWindow();
        wnd.close();
    }

    onMinimize() {
        const wnd = platform.getElectron().remote.getCurrentWindow();
        wnd.minimize();
    }

    onMaximize() {
        const wnd = platform.getElectron().remote.getCurrentWindow();

        if (wnd.isMaximized()) {
            wnd.unmaximize();
        }
        else {
            wnd.maximize();
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

export default LinuxTitlebar;