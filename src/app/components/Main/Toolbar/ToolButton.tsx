// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

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