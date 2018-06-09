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
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const animationDuration = 300;
const animationDef = {
    defaultStyle: {
        transform: 'translateX(0)',
        transition: `transform ${animationDuration}ms cubic-bezier(0,0.5,0.5,1),opacity ${animationDuration}ms`,
        opacity: 1
    },
    entering: {
        transform: 'translateX(50px)',
        opacity: 0,
    },
    entered: {
        transform: 'translateX(0)',
        opacity: 1,
    },
    exiting: {
        transform: 'translateX(50px)',
        transition: `transform ${animationDuration}ms cubic-bezier(1,0.4,0.2,1),opacity ${animationDuration}ms`,        
        opacity: 0,
    },
    exited: {
        display: 'none'
    }
};

const Fade: React.SFC<{ in?: boolean }> = props => (
    <Transition in={props.in} timeout={{ enter: 0, exit: animationDuration }}>
        {(state: string) => (
            <div style={{ ...animationDef.defaultStyle, ...animationDef[state] }}>
                {props.children}
            </div>
        )}
    </Transition>
);

export interface IStreamGroupProps {
    items: {
        key: string;
        content: JSX.Element;
    }[];
}

const StreamGroup: React.SFC<IStreamGroupProps> = props => (
    <TransitionGroup>
        {props.items.map(item => (
            <Fade key={item.key}>
                {item.content}
            </Fade>
        ))}
    </TransitionGroup>
);

export default StreamGroup;