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

export interface IRadioButtonProps {
    className?: string;
    checked?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

const RadioButton: React.SFC<IRadioButtonProps> = props => (
    <div
        className={classNames(props.className, {
            'radiobutton-active': props.checked,
            'radiobutton-disabled': props.disabled
        })}
        onClick={props.disabled ? undefined : props.onClick}
    >
        <div className="radiobutton-control">
            <div className="icon" />
        </div>
        <div className="radiobutton-label">
            {props.children}
        </div>
    </div>
);

export default themed(RadioButton)`
    user-select: none;
    margin-bottom: ${props => props.theme.controlSpacing};
    display: flex;
    flex-direction: row;
    align-items: center;

    &&&.radiobutton-disabled {
        .radiobutton-control {
            border-color: ${props => props.theme.controlBackgroundDisabled};    
            background: ${props => props.theme.controlBackgroundDisabled};

            .icon {
                background: ${props => props.theme.controlForegroundMuted};
            }
        }

        .radiobutton-label {
            color: ${props => props.theme.controlForegroundMuted};
        }
    }

    &.radiobutton-active {
        .radiobutton-control {
            border-color: ${props => props.theme.controlBackgroundPrimary};

            > .icon {
                transform: scale(1);
            }
        }
    }

    &:hover .radiobutton-control {
        border-color: ${props => props.theme.controlOutline};
    }

    &.radiobutton-active:hover .radiobutton-control {
        border-color: ${props => props.theme.controlOutlineBright};
    }

    &.radiobutton-active:active .radiobutton-control, &:active .radiobutton-control {
        border-color: ${props => props.theme.controlBackgroundActive};
    }

    .radiobutton-control {
        transition: border-color .1s ease-in-out, background .1s ease-in-out;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background: ${props => props.theme.controlBackgroundBright};
        border: solid 1px ${props => props.theme.controlOutlineBright};
        display: inline-block;
        position: relative;

        > .icon {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -5px;
            margin-left: -5px;
            transition: transform .12s ease-in-out;
            width: 10px;
            height: 10px;
            border-radius: 100%;
            background: ${props => props.theme.controlBackgroundPrimary};
            transform: scale(0);
        }
    }

    .radiobutton-label {
        padding-left: 8px;
        color: ${props => props.theme.controlForeground};
        font-size: 15px;
        font-weight: 500;
        display: inline-block;
    }
`;