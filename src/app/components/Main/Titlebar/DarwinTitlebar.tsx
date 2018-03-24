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
import * as classNames from 'classnames';
import styled from 'styled-components';
import { remote } from 'electron';
import imgControls from './wndControls.svg';
import { ITitlebarProps } from './';

import SystemMenu from 'containers/Main/Titlebar/SystemMenu';

const StyledControls = styled.div`
    -webkit-app-region: no-drag;

    .window-systemmenu {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 10000;
    }

    .window-controls {
        position: absolute;
        left: 6px;
        top: 5px;

        button {
            background: url(${imgControls}) 0 0 no-repeat;
            border: 0;
            outline: 0;
            padding: 0;
            margin: 3px;
            width: 14px;
            height: 14px;

            &:active {
                background-position-x: -28px;
            }

            &.quit {
                background-position-y: 0;
            }

            &.minimize {
                background-position-y: -14px;
            }

            &.zoom {
                background-position-y: -28px;
            }

            &.zoom:disabled {
                background-position: -42px 0;
            }
        }
    }

    &.window-blur .window-controls button {
        &.quit, &.minimize, &.zoom {
            background-position: -42px 0;
        }
    }

    .window-controls:hover button {
        background-position-x: -14px;
    }

    .window-controls:active button {
        background-position-x: -14px;
    }

    &.window-alt button.zoom {
        background-position-y: -42px;
    }
`;

interface ITitlebarState {
    isAltDown: boolean;
    isFocused: boolean;
}

class DarwinTitlebar extends React.Component<ITitlebarProps, ITitlebarState> {
    private _keyListener = this.onKeyEvent.bind(this);
    private _focusListener = this.onFocusEvent.bind(this);

    constructor(props: {}) {
        super(props);
        this.state = {
            isAltDown: false,
            isFocused: remote.getCurrentWindow().isFocused()
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this._keyListener);
        window.addEventListener('keyup', this._keyListener);
        remote.getCurrentWindow().on('blur', this._focusListener);
        remote.getCurrentWindow().on('focus', this._focusListener);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this._keyListener);
        window.removeEventListener('keyup', this._keyListener);
    }

    onKeyEvent(e: KeyboardEvent) {
        this.setState({
            isAltDown: e.altKey
        });
    }

    onFocusEvent(e: { sender: Electron.BrowserWindow }) {
        this.setState({
            isFocused: e.sender.isFocused()
        });
    }

    onClose() {
        remote.getCurrentWindow().close();
    }

    onMinimize() {
        remote.getCurrentWindow().minimize();
    }

    onFullscreen() {
        remote.getCurrentWindow().setFullScreen(
            !remote.getCurrentWindow().isFullScreen()
        );
    }

    onZoom() {
        if (remote.getCurrentWindow().isMaximized()) {
            remote.getCurrentWindow().unmaximize();
        }
        else {
            remote.getCurrentWindow().maximize();
        }
    }

    render() {
        const controlClasses = classNames('drag', {
            'window-alt': this.state.isAltDown,
            'window-blur': !this.state.isFocused
        });

        return (
            <StyledControls className={controlClasses}>
                <div className="window-systemmenu">
                    <SystemMenu align="right" />
                </div>
                <div className="window-controls no-drag">
                    <button className="quit" onClick={this.onClose} />
                    <button className="minimize" onClick={this.onMinimize} />
                    <button className="zoom" disabled={false === this.props.maximizable} onClick={this.state.isAltDown ? this.onZoom : this.onFullscreen} />
                </div>
            </StyledControls>
        );
    }
}

export default DarwinTitlebar;