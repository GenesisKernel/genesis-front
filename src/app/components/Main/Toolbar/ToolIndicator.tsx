/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';

import Tooltip from 'components/Tooltip';

export interface IToolIndicatorProps {
    icon: string;
    className?: string;
    right?: boolean;
    title: JSX.Element | string;
    titleDesc: JSX.Element | string;
}

const ToolIndicator: React.SFC<IToolIndicatorProps> = props => (
    <li className={props.className} style={{ float: props.right ? 'right' : null }}>
        <Tooltip title={props.title} body={props.titleDesc}>
            <div className="tool-body">
                <em className={`tool-icon ${props.icon}`} />
                {props.children && (<span className="button-label">{props.children}</span>)}
            </div>
        </Tooltip>
    </li>
);

const StyledToolButton = themed(ToolIndicator)`
    display: inline-block;
    vertical-align: top;
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    line-height: 40px;

    .tool-body {
        min-width: 40px;
        height: 40px;
        padding: 0 12px;
        font-weight: 300;

        em.tool-icon {
            color: ${props => props.theme.toolbarIconColor};
            transition: color .15s;
            vertical-align: middle;
            height: 18px;
            display: inline-block;
        }

        > span.button-label {
            margin-left: 8px;
            color: ${props => props.theme.toolbarForeground};
        }

        &:hover {
            em.tool-icon {
                color: ${props => props.theme.toolbarIconHighlight};
            }
        }
    }
`;

export default StyledToolButton;