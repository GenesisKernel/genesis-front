/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

import themed from 'components/Theme/themed';

export interface IToolbarButton {
    icon: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IToolbarProps {
    className?: string;
}

const Toolbar: React.SFC<IToolbarProps> = props => (
    <ul className={props.className}>
        {props.children}
    </ul>
);

const StyledToolbar = themed(Toolbar) `
    background: ${props => props.theme.toolbarBackground};
    border-bottom: solid 2px ${props => props.theme.toolbarOutline};
    height: 40px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 0;
`;

export default StyledToolbar;