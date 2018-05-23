// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
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

import * as React from 'react';
import styled from 'styled-components';
import { TEditorTab } from 'genesis/editor';
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