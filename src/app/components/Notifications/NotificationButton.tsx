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

export interface INotificationButtonProps {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const NotificationButton: React.SFC<INotificationButtonProps> = props => (
    <button className={props.className} onClick={props.onClick}>
        {props.children}
    </button>
);

export default styled(NotificationButton) `
    flex: 1;
    background: rgba(255, 255, 255, 0.15);
    height: 30px;
    border: 0;
    color: #fff;
    text-transform: uppercase;
    margin-right: 5px;
    font-size: 13px;
    transition: background ease-in-out .2s;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    &:active {
        background: rgba(255, 255, 255, 0.1);
    }
`;