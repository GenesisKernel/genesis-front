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
import TransitionGroup from 'react-transition-group/TransitionGroup';

const animationDuration = 400;
const animationDefaultStyle: React.CSSProperties = {
    transform: 'translateX(0)',
    transition: `transform ${animationDuration}ms cubic-bezier(0,0,0,1),opacity ${animationDuration}ms`,
    opacity: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden'
};

const animationDef: { [K in TransitionStatus]?: React.CSSProperties } = {
    entering: {
        transform: 'translateX(50px)',
        opacity: 0,
    },
    entered: {
        transform: 'translateX(0)',
        opacity: 1,
    },
    exiting: {
        transform: 'scale(0.9)',
        opacity: 0,
    },
    exited: {
        display: 'none'
    }
};

const Fade: React.SFC<{ in?: boolean }> = props => (
    <Transition in={props.in} timeout={{ enter: 0, exit: animationDuration }}>
        {state => (
            <div style={{ ...animationDefaultStyle, ...animationDef[state] }}>
                {props.children}
            </div>
        )}
    </Transition>
);

export interface IStackGroupProps {
    items: JSX.Element[];
}

const Stack: React.SFC<IStackGroupProps> = props => (
    <TransitionGroup>
        {props.items.map((item, index) => (
            <Fade key={index}>
                {item}
            </Fade>
        ))}
    </TransitionGroup>
);

export default Stack;