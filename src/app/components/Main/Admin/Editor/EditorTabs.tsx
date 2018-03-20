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
import { TEditorTab } from 'genesis/content';
import imgSim from './sim.svg';
import imgTpl from './tpl.svg';

import EditorTab from './EditorTab';

export const TYPE_ICONS: { [type: string]: string } = {
    contract: imgSim,
    page: imgTpl,
    menu: imgTpl,
    block: imgTpl,
    default: null
};

export interface IEditorTabsProps {
    className?: string;
    tabIndex: number;
    tabs: TEditorTab[];
    onChange: (index: number) => void;
    onClose: (index: number) => void;
}

const EditorTabs: React.SFC<IEditorTabsProps> = (props) => (
    <ul className={props.className}>
        {props.tabs.map((tab, index) => (
            <EditorTab
                {...tab}
                key={index}
                active={props.tabIndex === index}
                icon={TYPE_ICONS[tab.type] || TYPE_ICONS.default}
                onClick={props.onChange.bind(null, index)}
                onClose={props.onClose.bind(null, index)}
            />
        ))}
    </ul>
);

const StyledEditorTabs = styled(EditorTabs) `
    background: #c3c7ce;
    height: 36px;
    list-style-type: none;
    padding: 1px 0 0;
    margin: 0;
`;

export default StyledEditorTabs;