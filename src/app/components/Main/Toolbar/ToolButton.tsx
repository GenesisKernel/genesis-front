/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import classNames from 'classnames';

import themed from 'components/Theme/themed';

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

const StyledToolButton = themed(ToolButton) `
    display: inline-block;
    vertical-align: top;

    &.disabled {
        button {
            > em.icon, > span.button-label {
                color: ${props => props.theme.toolbarDisabled};
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
            color: ${props => props.theme.toolbarIconColor};
            vertical-align: middle;
            height: 18px;
            display: inline-block;
        }

        > span.button-label {
            margin-left: 8px;
            color: ${props => props.theme.toolbarForeground};
        }

        &:hover {
            background: rgba(0,0,0,0.03);
        }
    }
`;

export default StyledToolButton;