// MIT License
//
// Copyright (c) 2016-2018 AplaProject
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
import { AnimatedSwitch as NativeAnimatedSwitch } from 'react-router-transition';

export interface IAnimation {
    atEnter: { [key: string]: any };
    atLeave: { [key: string]: any };
    atActive: { [key: string]: any };
    mapStyles?: (styles: { [key: string]: any }) => { [key: string]: any };
}

const animations = {
    fade: () => ({
        atEnter: { opacity: 0 },
        atLeave: { opacity: 0 },
        atActive: { opacity: 1 }
    }),

    dropHorizontal: (offset: number = 20) => ({
        atEnter: { offsetX: offset, opacity: 0 },
        atLeave: { offsetX: -offset, opacity: 0 },
        atActive: { offsetX: 0, opacity: 1 },
        mapStyles: (styles: any) => ({
            transform: `translateX(${styles.offsetX}px)`,
            opacity: styles.opacity
        })
    }),

    dropVertical: (offset: number = 20) => ({
        atEnter: { offsetY: -offset, opacity: 0 },
        atLeave: { offsetY: offset, opacity: 0 },
        atActive: { offsetY: 0, opacity: 1 },
        mapStyles: (styles: any) => ({
            transform: `translateY(${styles.offsetY}px)`,
            opacity: styles.opacity
        })
    })
};

export interface IAnimatedSwitchProps {
    animation: IAnimation;
    className?: string;
}

export const AnimatedSwitch: React.SFC<IAnimatedSwitchProps> & { animations?: typeof animations } = (props) => (
    <NativeAnimatedSwitch className={props.className || 'switch-wrapper'} {...props.animation}>
        {props.children}
    </NativeAnimatedSwitch>
);

AnimatedSwitch.animations = animations;