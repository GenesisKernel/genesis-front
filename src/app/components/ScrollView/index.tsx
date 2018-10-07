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
import styled from 'styled-components';
import classNames from 'classnames';
import ScrollBar from 'react-custom-scrollbars';

const Nop: React.SFC = () => <span />;

export interface IScrollViewProps {
    className?: string;
    disableHorizontal?: boolean;
    disableVertical?: boolean;
    hideHorizontal?: boolean;
    hideVertical?: boolean;
}

const StyledScrollBar = styled(ScrollBar)`
    &.disable-vertical > div {
        overflow-y: hidden !important;
        margin-right: 0 !important;
    }
    
    &.disable-horizontal > div {
        overflow-x: hidden !important;
        margin-bottom: 0 !important;
    }
`;

const ScrollView: React.SFC<IScrollViewProps> = props => (
    <StyledScrollBar
        className={classNames(props.className, {
            'disable-vertical': props.disableVertical,
            'disable-horizontal': props.disableHorizontal
        })}
        renderTrackHorizontal={props.disableHorizontal || props.hideHorizontal ? Nop : undefined}
        renderThumbHorizontal={props.disableHorizontal || props.hideHorizontal ? Nop : undefined}
        renderTrackVertical={props.disableVertical || props.hideVertical ? Nop : undefined}
        renderThumbVertical={props.disableVertical || props.hideVertical ? Nop : undefined}
    >
        {props.children}
    </StyledScrollBar>
);

export default ScrollView;