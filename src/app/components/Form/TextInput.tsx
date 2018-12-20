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
import { IInputProps } from 'services/forms/connectInput';

export interface ITextInputProps extends IInputProps<string> {
    className?: string;
    placeholder?: string;
    disabled?: boolean;
}

const TextInput: React.SFC<ITextInputProps> = props => (
    <div className={classNames(props.className, { 'textinput-disabled': props.disabled })}>
        <input
            type="text"
            disabled={props.disabled}
            placeholder={props.placeholder}
            onBlur={() => props.onBlur && props.onBlur()}
            onFocus={() => props.onFocus && props.onFocus()}
            onChange={e => props.onChange && props.onChange(e.target.value)}
            value={props.value || ''}
        />
    </div>
);

export default themed(TextInput)`
    &&.textinput-disabled > input {
        border-color: ${props => props.theme.controlBackgroundDisabled};
        background: ${props => props.theme.controlBackgroundDisabled};
        color: ${props => props.theme.controlForegroundMuted};
    }

    > input {
        transition: border-color .2s ease-in-out;
        border: solid 1px ${props => 'VALID' === props.validationState ? props.theme.controlOutlineBright : props.theme.controlOutlineInvalid};
        background: ${props => props.theme.controlBackgroundBright};
        color: ${props => props.theme.controlForeground};
        padding: 5px 6px;
        margin-bottom: 10px;
        font-size: ${props => props.theme.controlFontSize};
        box-sizing: border-box;
        width: 100%;

        &:hover {
            border-color: ${props => 'VALID' === props.validationState ? props.theme.controlOutline : props.theme.controlOutlineInvalid};
        }
        
        &:focus {
            border-color: ${props => 'VALID' === props.validationState ? props.theme.controlBackgroundPrimary : props.theme.controlOutlineInvalid};
        }
    }
`;