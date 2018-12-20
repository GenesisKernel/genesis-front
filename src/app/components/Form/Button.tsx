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
import { ISubmitProps } from 'services/forms/connectSubmit';
import themed from 'components/Theme/themed';

export interface IButtonProps extends ISubmitProps {
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit';
}

const Button: React.SFC<IButtonProps> = props => (
    <button
        className={props.className}
        disabled={props.disabled}
        onClick={props.onSubmit}
        type={props.type || 'button'}
    >
        {props.children}
    </button>
);

export default themed(Button)`
    transition: border-color .1s ease-in-out,background .2s ease-in-out, transform .3s ease-in-out;
    outline: none;
    border: solid 2px ${props => props.theme.controlBackgroundPrimary};
    background: ${props => props.theme.controlBackgroundPrimary};
    color: ${props => props.theme.controlForegroundPrimary};
    font-size: ${props => props.theme.controlFontSize};
    font-weight: 600;
    padding: 3px 10px;
    margin-bottom: ${props => props.theme.controlSpacing};
    margin-right: ${props => props.theme.controlSpacing};

    &:hover {
        border-color: ${props => props.theme.controlOutlinePrimary};
    }

    &:active {
        transform: scale(0.95);
        background: ${props => props.theme.controlBackgroundActive};
        border-color: ${props => props.theme.controlBackgroundActive};
    }

    &:disabled {
        background: ${props => props.theme.controlBackgroundDisabled};
        border-color: ${props => props.theme.controlBackgroundDisabled};
        color: ${props => props.theme.controlForegroundMuted};
    }
`;