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
import * as classNames from 'classnames';
import styled from 'styled-components';
import imgControls from './wndControls.svg';
import { remote } from 'electron';

const StyledControls = styled.div`
    -webkit-app-region: no-drag;
    position: absolute;
    left: 6px;
    top: 4px;

    &.window-blur button {
        &.quit, &.minimize, &.zoom {
            background-position: -42px 0;
        }
    }

    &:hover button {
        background-position-x: -14px;
    }

    &:active button {
        background-position-x: -14px;
    }

    &.window-alt button.zoom {
        background-position-y: -42px;
    }

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
    }
`;

interface ITitlebarState {
    isAltDown: boolean;
    isFocused: boolean;
}

class DarwinTitlebar extends React.Component<{}, ITitlebarState> {
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
        const controlClasses = classNames({
            'window-alt': this.state.isAltDown,
            'window-blur': !this.state.isFocused
        });

        return (
            <StyledControls className={controlClasses}>
                <div className="window-controls">
                    <button className="quit" onClick={this.onClose} />
                    <button className="minimize" onClick={this.onMinimize} />
                    <button className="zoom" onClick={this.state.isAltDown ? this.onZoom : this.onFullscreen} />
                </div>
            </StyledControls>
        );
    }
}

export default DarwinTitlebar;