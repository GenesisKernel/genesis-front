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

export interface IResizeHandleProps {
    width: number;
    offsetX?: number;
    onResize: (width: number) => void;
}

interface IResizeHandleState {
    active: boolean;
}

export const styles = {
    hoverWidth: 10,
    initialWidth: 1,
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
        transition: all .16s;
        background: ${props => props.theme.menuOutline};
    }

    &:hover > div, &.active > div {
        background: ${props => props.theme.menuOutlineActive};
    }
`;

class ResizeHandle extends React.Component<IResizeHandleProps, IResizeHandleState> {
    state: IResizeHandleState = {
        active: false
    };

    componentDidMount() {
        document.body.addEventListener('mousemove', this.onMouseMove);
        document.body.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {
        document.body.removeEventListener('mousemove', this.onMouseMove);
        document.body.removeEventListener('mouseup', this.onMouseUp);
    }

    onMouseMove = (e: MouseEvent) => {
        const newX = e.clientX - (this.props.offsetX || 0);
        if (this.state.active && newX !== this.props.width) {
            this.props.onResize(newX);
        }
    }

    onMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!this.state.active && 0 === e.button) {
            this.setState({ active: true });
        }
    }

    onMouseUp = (e: MouseEvent) => {
        if (this.state.active && 0 === e.button) {
            this.setState({ active: false });
        }
    }

    render() {
        const classes = classNames({
            active: this.state.active
        });

        return (
            <StyledResizeHandle onMouseDown={this.onMouseDown} className={classes}>
                <div />
            </StyledResizeHandle>
        );
    }
}

export default ResizeHandle;