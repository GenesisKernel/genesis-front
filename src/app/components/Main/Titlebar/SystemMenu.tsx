/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { remote } from 'electron';
import { FormattedMessage } from 'react-intl';

import themed from 'components/Theme/themed';
import DropdownButton, { CloseDropdownButton } from 'components/DropdownButton';

const SystemDropdown = themed(DropdownButton)`
    background: 0;
    border: 0;
    outline: 0;
    color: #bad8ff;
    width: ${props => props.theme.headerHeight}px !important;
    height: ${props => props.theme.headerHeight}px !important;
    padding: 0 !important;
    margin: 0 !important;
    outline: 0 !important;
    min-width: 0 !important;
    line-height: ${props => props.theme.headerHeight + 2}px !important;
    transition: color ease-in-out .16s;
    cursor: pointer !important;

    &:hover {
        color: #fff;
    }
`;

const SystemButton = themed.button`
    background: 0;
    border: 0;
    outline: 0;
    color: #bad8ff;
    width: ${props => props.theme.headerHeight}px !important;
    height: ${props => props.theme.headerHeight}px !important;
    padding: 0 !important;
    margin: 0 !important;
    outline: 0 !important;
    min-width: 0 !important;
    line-height: ${props => props.theme.headerHeight + 2}px !important;
    transition: color ease-in-out .16s;
    cursor: pointer !important;

    &:hover {
        color: #fff;
    }
`;

export interface ISystemMenuProps {
    align: 'left' | 'right';
    onAbout: () => void;
    onChangeLocale: () => void;
}

const SystemMenu: React.SFC<ISystemMenuProps> = props => {
    const elements = [
        (
            <SystemDropdown
                width={180}
                align={props.align}
                leftMost={'left' === props.align}
                rightMost={'right' === props.align}
                content={
                    <div>
                        <div className="dropdown-heading">Apla</div>
                        <ul className="dropdown-group">
                            <li>
                                <CloseDropdownButton onClick={props.onAbout}>
                                    <em className="icon icon-question text-primary" />
                                    <span>
                                        <FormattedMessage id="general.about" defaultMessage="About" />
                                    </span>
                                </CloseDropdownButton>
                            </li>
                            <li>
                                <CloseDropdownButton onClick={() => remote.getCurrentWindow().webContents.openDevTools({ mode: 'detach' })}>
                                    <em className="icon icon-calculator text-danger" />
                                    <span>
                                        <FormattedMessage id="general.developer.tools" defaultMessage="Developer tools" />
                                    </span>
                                </CloseDropdownButton>
                            </li>
                        </ul>
                    </div>
                }
            >
                <em className="icon-list" />
            </SystemDropdown>
        ),
        (
            <SystemButton onClick={props.onChangeLocale}>
                <em className="icon-globe" />
            </SystemButton>
        )
    ];
    return (
        <div className="no-drag">
            {(props.align === 'left' ? elements : elements.reverse()).map((e, i) => (
                e
            ))}
        </div>
    );
};

export default SystemMenu;