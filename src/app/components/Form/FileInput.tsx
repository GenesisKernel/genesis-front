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

export interface IFileInputProps extends IInputProps<File> {
    className?: string;
    placeholder?: string;
    disabled?: boolean;
}

// onBlur={() => props.onBlur && props.onBlur()}
// onFocus={() => props.onFocus && props.onFocus()}
class FileInput extends React.Component<IFileInputProps> {
    private _input: HTMLInputElement | null = null;

    onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        if (!this.props.onChange || !e.target.files) {
            return;
        }

        this.props.onChange(e.target.files[0]);
    }

    onClick = () => {
        if (!this._input) {
            return;
        }

        this._input.click();
    }

    render() {
        return (
            <div
                className={classNames(this.props.className, {
                    'input-selected': this.props.value,
                    'input-disabled': this.props.disabled
                })}
                onClick={this.onClick}
            >
                <input
                    ref={l => this._input = l}
                    type="file"
                    disabled={this.props.disabled}
                    onChange={this.onChange}
                />
                <div className="input-value">{this.props.value && this.props.value.name}</div>
                <div className="input-placeholder">{this.props.placeholder}</div>
                <em className="input-icon icon-folder" />
            </div>
        );
    }
}

export default themed(FileInput)`
    transition: border-color .2s ease-in-out;
    border: solid 1px ${props => 'VALID' === props.validationState ? props.theme.controlOutlineBright : props.theme.controlOutlineInvalid};
    background: ${props => props.theme.controlBackgroundBright};
    color: ${props => props.theme.controlForeground};
    padding: 5px 6px;
    margin-bottom: 10px;
    font-size: ${props => props.theme.controlFontSize};
    position: relative;

    > input {
        position: absolute;
        left: -100000px;
    }

    .input-value {
        color: ${props => props.theme.controlForeground};
        display: none;
    }

    .input-placeholder {
        color: ${props => props.theme.controlForegroundMuted};
    }

    .input-value, .input-placeholder {
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 20px;
    }

    .input-icon {
        position: absolute;
        right: 8px;
        top: 8px;
        bottom: 8px;
        font-size: 16px;
        color: ${props => props.theme.controlBackgroundPrimary};
    }

    &&.textinput-disabled {
        border-color: ${props => props.theme.controlBackgroundDisabled};
        background: ${props => props.theme.controlBackgroundDisabled};
        color: ${props => props.theme.controlForegroundMuted};
    }

    &.input-selected {
        .input-value {
            display: block;
        }
        
        .input-placeholder {
            display: none;
        }
    }

    &:hover {
        border-color: ${props => 'VALID' === props.validationState ? props.theme.controlOutline : props.theme.controlOutlineInvalid};
    }
    
    &:focus {
        border-color: ${props => 'VALID' === props.validationState ? props.theme.controlBackgroundPrimary : props.theme.controlOutlineInvalid};
    }
`;