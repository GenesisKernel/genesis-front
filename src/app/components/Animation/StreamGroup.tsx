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