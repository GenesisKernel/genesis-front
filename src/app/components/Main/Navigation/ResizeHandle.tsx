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
import * as classNames from 'classnames';

interface IResizeHandleProps {
    width: number;
    resizing: boolean;
    disabled: boolean;
    setResizing: (resizing: boolean) => void;
    navigationResize: (width: number) => void;
    navigationToggle: () => void;
}

export const styles = {
    initialWidth: 2,
    extendWidth: 2
};

const StyledResizeHandle = styled.button`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    width: 9px;
    outline: 0;
    border: 0;
    background: none;
    padding: 0;
    margin: 0;
    cursor: col-resize;

    &.disabled {
        cursor: default;
    }
    
    > div {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: 0;
        width: ${styles.initialWidth}px;
        background: #e5e4e5;
        transition: all .16s;
    }

    &:hover > div, &.active > div {
        width: ${styles.extendWidth * 2 + styles.initialWidth}px;
        margin: 0 -${styles.extendWidth}px 0 0;
    }
`;

class ResizeHandle extends React.Component<IResizeHandleProps> {
    private _mouseUpListenerBind: (e: MouseEvent) => void;
    private _mouseMoveListenerBind: (e: MouseEvent) => void;
    private _clickThresholdValue: number;
    private _clickThreshold = 1;

    componentDidMount() {
        this._mouseMoveListenerBind = this.onMouseMove.bind(this);
        this._mouseUpListenerBind = this.onMouseUp.bind(this);
        document.body.addEventListener('mousemove', this._mouseMoveListenerBind);
        document.body.addEventListener('mouseup', this._mouseUpListenerBind);
    }

    componentWillUnmount() {
        document.body.removeEventListener('mousemove', this._mouseMoveListenerBind);
    }

    onMouseMove(e: MouseEvent) {
        if (!this.props.disabled && this.props.resizing && e.clientX !== this.props.width) {
            this.props.navigationResize(e.clientX);
            this._clickThresholdValue++;
        }
    }

    onMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
        if (!this.props.disabled && !this.props.resizing && 0 === e.button) {
            this.props.setResizing(true);
            this._clickThresholdValue = 0;
        }
    }

    onMouseUp(e: MouseEvent) {
        if (!this.props.disabled && this.props.resizing && 0 === e.button) {
            this.props.setResizing(false);
        }
    }

    onClick() {
        if (!this.props.disabled && this._clickThresholdValue < this._clickThreshold) {
            this.props.navigationToggle();
        }
    }

    render() {
        const classes = classNames({
            disabled: this.props.disabled,
            active: this.props.resizing
        });

        return (
            <StyledResizeHandle onClick={this.onClick.bind(this)} onMouseDown={e => this.onMouseDown(e)} className={classes}>
                <div />
            </StyledResizeHandle>
        );
    }
}

export default ResizeHandle;