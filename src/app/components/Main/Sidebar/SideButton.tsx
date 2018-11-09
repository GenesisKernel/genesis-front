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

const StyledSideButton = themed.button`
    width: ${props => props.theme.menuHeight}px;
    height: ${props => props.theme.menuHeight}px;
    line-height: ${props => props.theme.menuHeight}px;
    text-align: center;
    background: none;
    color: #fff;
    font-size: 14px;

    &,&:hover,&:active,&:focus{
        outline: none;
        border: none;
        border-bottom: solid 1px rgba(255, 255, 255, 0.2);
    }

    &:hover {
        background: rgba(255,255,255,0.11);
    }

    &.button-active {
        border-left: solid 4px #c0d1e7;
        background-color: rgba(255,255,255,0.12);
    }
`;

export interface ISideButtonProps {
    active?: boolean;
}

const SideButton: React.SFC<ISideButtonProps> = props => (
    <StyledSideButton className={classNames({ 'button-active': props.active })}>
        {props.children}
    </StyledSideButton>
);

export default SideButton;