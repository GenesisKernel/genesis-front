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

import React from 'react';
import classNames from 'classnames';

import themed from 'components/Theme/themed';

interface IResizeHandleProps {
    width: number;
    resizing: boolean;
    disabled: boolean;
    setResizing: (resizing: boolean) => void;
    navigationResize: (width: number) => void;
    navigationToggle: () => void;
}

export const styles = {
    hoverWidth: 10,
    initialWidth: 2,
    extendWidth: 2
};

const StyledResizeHandle = themed.button`
    position: absolute;
    top: 0;
    bottom: 0;
    right: ${styles.initialWidth / 2}px;
    text-align: center;
    width: ${styles.hoverWidth}px;
    outline: 0;
    border: 0;
    background: none;
    padding: 0;
    margin: 0;
    cursor: col-resize;
    margin-right: -${styles.hoverWidth / 2}px;

    &.disabled {
        cursor: default;
    }
    
    > div {
        position: absolute;
        top: 0;
        bottom: 0;
        right: ${(styles.hoverWidth / 2) - (styles.initialWidth / 2)}px;
        margin: 0;
        width: ${styles.initialWidth}px;
        background: ${props => props.theme.menuOutline};
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
        // TODO: Temporarily disabled
        if (!this.props.disabled && this._clickThresholdValue < this._clickThreshold) {
            // this.props.navigationToggle();
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