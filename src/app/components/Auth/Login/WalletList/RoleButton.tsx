/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import themed from 'components/Theme/themed';

export interface IRoleButtonProps {
    className?: string;
    badge: number;
    onClick: () => void;
}

const StyledRoleButton = themed.button`
    background: transparent;
    border: solid 1px #4c7dbd;
    border-radius: 2px;
    outline: none;
    font-size: 14px;
    color: #4c7dbd;
    height: 25px;
    line-height: 23px;
    padding: 0;
    vertical-align: top;

    &:hover {
        background: #e9e9e9;
    }
    
    .button-content {
        padding: 0 6px;
        float: left;
        height: 100%;
    }

    .button-badge {
        float: right;
        font-weight: bold;
        height: 100%;
        padding: 0 5px;
        color: #ea4f4f;
    }
`;

const RoleButton: React.SFC<IRoleButtonProps> = (props) => (
    <StyledRoleButton className={props.className} onClick={props.onClick}>
        <div className="button-content">{props.children}</div>
        {0 !== props.badge && (
            <div className="button-badge">{props.badge}</div>
        )}
    </StyledRoleButton>
);

export default RoleButton;