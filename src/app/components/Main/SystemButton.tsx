/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import classNames from 'classnames';

import themed from 'components/Theme/themed';
import DropdownButton, { IDropdownButtonProps } from 'components/DropdownButton';

export interface ISystemButtonProps extends IDropdownButtonProps {
    warning?: boolean;
}

const SystemButton: React.SFC<ISystemButtonProps> = props => (
    <DropdownButton
        className={classNames(props.className, {
            _warning: props.warning
        })}
        content={props.content}
        leftMost={props.leftMost}
        rightMost={props.rightMost}
        align={props.align}
        width={props.width}
        badge={props.badge}
        disabled={props.disabled}
        onClick={props.onClick}
    >
        {props.children}
    </DropdownButton>
);

const StyledSystemButton = themed(SystemButton) `
    background: 0;
    padding: 0;
    border: 0;
    outline: 0;
    transition: background ease-in-out .17s;

    &:hover {
        background: ${props => props.theme.systemButtonActive};
    }

    &._warning {
        background: ${props => props.theme.systemButtonSecondary};
    }
`;

export default StyledSystemButton;