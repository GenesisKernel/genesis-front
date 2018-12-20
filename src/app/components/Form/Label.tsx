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
import themed from 'components/Theme/themed';
import classNames from 'classnames';

export interface ILabelProps {
    className?: string;
    disabled?: boolean;
    required?: boolean;
}

const Label: React.SFC<ILabelProps> = props => (
    <div
        className={classNames(props.className, {
            'label-disabled': props.disabled,
            'label-required': props.required
        })}
    >
        {props.children}
        {props.required && (
            <span className="label-required"> *</span>
        )}
    </div>
);

export default themed(Label)`
    user-select: none;
    margin-top: ${props => props.theme.controlSpacing};
    margin-bottom: ${props => props.theme.controlSpacingGroup};
    font-size: ${props => props.theme.controlFontSize};
    font-weight: 300;
    color: ${props => props.disabled ? props.theme.controlForegroundMuted : props.theme.controlForeground};
    
    .label-required {
        color: ${props => props.theme.controlForegroundRequired};
    }
`;