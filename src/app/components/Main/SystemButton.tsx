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

import React from 'react';
import classNames from 'classnames';

import themed from 'components/Theme/themed';
import DropdownButton, { IDropdownButtonProps } from 'components/DropdownButton';

export interface ISystemButtonProps extends IDropdownButtonProps {
    warning?: boolean;
}

const SystemButton: React.SFC<ISystemButtonProps> = props => (
    <DropdownButton
        className={classNames(props.className, {
            _warning: props.warning
        })}
        content={props.content}
        leftMost={props.leftMost}
        rightMost={props.rightMost}
        align={props.align}
        width={props.width}
        badge={props.badge}
        disabled={props.disabled}
        onClick={props.onClick}
    >
        {props.children}
    </DropdownButton>
);

const StyledSystemButton = themed(SystemButton) `
    background: 0;
    padding: 0;
    border: 0;
    outline: 0;
    transition: background ease-in-out .17s;

    &:hover {
        background: ${props => props.theme.systemButtonActive};
    }

    &._warning {
        background: ${props => props.theme.systemButtonSecondary};
    }
`;

export default StyledSystemButton;