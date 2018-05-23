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

import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

export interface IToolButtonProps {
    icon: string;
    className?: string;
    disabled?: boolean;
    right?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ToolButton: React.SFC<IToolButtonProps> = props => (
    <li className={classNames({ disabled: props.disabled }, props.className)} style={{ float: props.right ? 'right' : null }}>
        <button onClick={props.onClick} disabled={props.disabled}>
            <em className={`icon ${props.icon}`} />
            {props.children && (<span className="button-label">{props.children}</span>)}
        </button>
    </li>
);

const StyledToolButton = styled(ToolButton) `
    display: inline-block;
    vertical-align: top;

    &.disabled {
        button {
            > em.icon {
                color: #bcc8d6;
            }

            > span.button-label {
                color: #93a7bf;
            }
        }
    }

    > button {
        text-align: center;
        border-radius: 0;
        min-width: 40px;
        height: 40px;
        outline: 0;
        border: 0;
        background: 0;
        padding: 0 12px;
        font-size: 14px;
        font-weight: 300;
        line-height: 40px;
        transition: background .15s;

        > em.icon {
            color: #5b97e4;
            vertical-align: middle;
            height: 18px;
            display: inline-block;
        }

        > span.button-label {
            margin-left: 8px;
            color: #194a8a;
        }

        &:hover {
            background: rgba(0,0,0,0.03);
        }
    }
`;

export default StyledToolButton;