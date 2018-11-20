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
import Transition, { TransitionStatus } from 'react-transition-group/Transition';

const animationDuration = 300;
const containerDefaultStyle: React.CSSProperties = {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 600
};

const containerAlignStyle: { [K in 'left' | 'right']: React.CSSProperties } = {
    left: { left: 0 },
    right: { right: 0 }
};

const containerAnimationDef: { [K in TransitionStatus]?: React.CSSProperties } = {
    // Negative margins are used to mitigate padding that is used to
    // show the box-shadow. After animation completes we reset overflow
    // back to visible, so we don't need those again
    entering: {
        padding: '0 50px 50px',
        margin: '0 -50px',
        overflow: 'hidden'
    },
    entered: {
        overflow: 'visible'
    },

    // Same as 'entering'. Padding is used to correctly show the box-shadow
    exiting: {
        padding: '0 50px 50px',
        margin: '0 -50px',
        overflow: 'hidden',
        zIndex: 590
    }
};

const animationDefaultStyle: React.CSSProperties = {
    transition: `transform ${animationDuration}ms cubic-bezier(0,0.5,0,1)`,
    transform: 'translateY(-100%)',
    marginTop: '0'
};

const animationDef: { [K in TransitionStatus]?: React.CSSProperties } = {
    entering: {
        transform: 'translateY(0)'
    },
    entered: {
        transform: 'translateY(0)'
    },

    // We use negative margin to make children unclickable and not to break
    // animation that will be used later
    exited: {
        transform: 'translateY(-100%)',
        marginTop: '-100000px'
    }
};

export interface IDropdownProps {
    visible: boolean;
    align?: 'left' | 'right';
    width?: number;
}

const Dropdown: React.SFC<IDropdownProps> = props => (
    <Transition in={props.visible} timeout={animationDuration}>
        {state => (
            <div style={{ ...containerDefaultStyle, ...containerAnimationDef[state], ...(props.align ? containerAlignStyle[props.align] : null) }}>
                <div style={{ ...animationDefaultStyle, ...animationDef[state], width: props.width }}>
                    {props.children}
                </div>
            </div>
        )}
    </Transition>
);

export default Dropdown;