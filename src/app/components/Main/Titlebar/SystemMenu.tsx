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
import { remote } from 'electron';
import { styles } from 'components/Main';

import DropdownButton, { CloseDropdownButton } from 'components/DropdownButton';
import { FormattedMessage } from 'react-intl';

const SystemButton = styled(DropdownButton) `
    background: 0;
    border: 0;
    outline: 0;
    color: #bad8ff;
    width: ${styles.headerHeight}px !important;
    height: ${styles.headerHeight}px !important;
    padding: 0 !important;
    margin: 0 !important;
    outline: 0 !important;
    min-width: 0 !important;
    line-height: ${styles.headerHeight + 2}px !important;
    transition: color ease-in-out .16s;
    cursor: pointer !important;

    &:hover {
        color: #fff;
    }
`;

export interface ISystemMenuProps {
    align: 'left' | 'right';
    onAbout: () => void;
}

const SystemMenu: React.SFC<ISystemMenuProps> = props => (
    <div className="no-drag">
        <SystemButton
            width={180}
            align={props.align}
            leftMost={'left' === props.align}
            rightMost={'right' === props.align}
            content={
                <div>
                    <div className="dropdown-heading">Genesis</div>
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
        </SystemButton>
    </div>
);

export default SystemMenu;