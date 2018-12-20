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
import { IInputProps } from 'services/forms/connectInput';
import themed from 'components/Theme/themed';
import classNames from 'classnames';

export interface ICheckboxProps extends IInputProps<boolean> {
    className?: string;
    disabled?: boolean;
}

const Checkbox: React.SFC<ICheckboxProps> = props => (
    <div
        className={classNames(props.className, {
            'checkbox-active': props.value,
            'checkbox-disabled': props.disabled
        })}
        onClick={() => !props.disabled && props.onChange && props.onChange(!props.value)}
    >
        <label>
            <div className="checkbox-control">
                <em className="icon" />
            </div>
            <div className="checkbox-label">
                {props.children}
            </div>
        </label>
    </div>
);

export default themed(Checkbox)`
    user-select: none;
    margin-bottom: ${props => props.theme.controlSpacing};

    label {
        margin: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    &&&.checkbox-disabled {
        &.checkbox-active .checkbox-control .icon {
            display: inline-block;
        }

        .checkbox-control .icon {
            display: none;
        }

        .checkbox-control {
            border-color: ${props => props.theme.controlBackgroundDisabled};    
            background: ${props => props.theme.controlBackgroundDisabled};

            .icon {
                border-color: ${props => props.theme.controlForegroundMuted};
            }
        }

        .checkbox-label {
            color: ${props => props.theme.controlForegroundMuted};
        }
    }

    &&.checkbox-active {
        .checkbox-control {
            background: ${props => props.theme.controlBackgroundPrimary};
            border-color: ${props => props.theme.controlBackgroundPrimary};
            
            > .icon {
                border-color: ${props => props.theme.controlForegroundPrimary};
                display: inline-block;
            }
        }
    }

    &:hover .checkbox-control {
        border-color: ${props => props.theme.controlOutline};

        > .icon {
            display: inline-block;
        }
    }

    &.checkbox-active:hover .checkbox-control {
        border-color: ${props => props.theme.controlBackgroundPrimaryActive};
        background: ${props => props.theme.controlBackgroundPrimaryActive};
    }

    &.checkbox-active:active .checkbox-control, &:active .checkbox-control {
        border-color: ${props => props.theme.controlBackgroundActive};
        background: ${props => props.theme.controlBackgroundActive};
    }

    .checkbox-control {
        transition: border-color .1s ease-in-out, background .1s ease-in-out;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        background: ${props => props.theme.controlBackgroundBright};
        border: solid 1px ${props => props.theme.controlOutlineBright};
        display: inline-block;
        text-align: center;

        > .icon {
            vertical-align: middle;
            transform: rotate(-45deg);
            border-left: solid 1px;
            border-bottom: solid 1px;
            border-color: ${props => props.theme.controlForegroundMuted};
            height: 5px;
            width: 10px;
            margin-top: -6px;
            display: none;
        }
    }

    .checkbox-label {
        vertical-align: middle;
        padding-left: 5px;
        color: ${props => props.theme.controlForeground};
        font-size: 15px;
        font-weight: 500;
        display: inline-block;
    }
`;