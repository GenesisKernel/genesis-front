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
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const animationDuration = 300;
const animationDef = {
    defaultStyle: {
        transform: 'translateX(0)',
        transition: `transform ${animationDuration}ms cubic-bezier(0,0,0,1),opacity ${animationDuration}ms`,
        opacity: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    entering: {
        transform: 'translateX(-50px)',
        opacity: 0,
    },
    entered: {
        transform: 'translateX(0)',
        opacity: 1,
    },
    exiting: {
        transform: 'translateX(50px)',
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

export interface IStackGroupProps {
    items: JSX.Element[];
}

const StackGroup: React.SFC<IStackGroupProps> = props => (
    <TransitionGroup>
        {props.items.map((item, index) => (
            <Fade key={index}>
                {item}
            </Fade>
        ))}
    </TransitionGroup>
);

export default StackGroup;