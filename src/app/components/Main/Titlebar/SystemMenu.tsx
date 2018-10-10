// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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