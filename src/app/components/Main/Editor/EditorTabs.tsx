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
import ScrollArea from 'react-scrollbar';
import { TEditorTab } from 'genesis/editor';
import imgSim from './sim.svg';
import imgTpl from './tpl.svg';

import themed from 'components/Theme/themed';
import EditorTab from './EditorTab';

import { FormattedMessage } from 'react-intl';
import SystemButton from 'components/Main/SystemButton';
import { CloseDropdownButton } from 'components/DropdownButton';

export const TYPE_ICONS: { [type: string]: string } = {
    contract: imgSim,
    page: imgTpl,
    menu: imgTpl,
    block: imgTpl,
    default: null
};

const StyledTabsMenu = themed.div `
    position: absolute;
    z-index: 20;
    top: 0px;
    right: 0px;
    background: #c3c7ce;
    
    & button.dropdown-toggle {
        height: 36px;
    }    
`;

export interface IEditorTabsProps {
    className?: string;
    tabIndex: number;
    tabs: TEditorTab[];
    onChange: (index: number) => void;
    onClose: (index: number) => void;
    onCloseAll: () => void;
    onCloseSaved: () => void;
}

const EditorTabs: React.SFC<IEditorTabsProps> = (props) => (
    <div style={{position: 'relative'}}>
        <ScrollArea
            className={props.className}
            horizontal={true}
            vertical={false}
            swapWheelAxes={true}
            speed={0.3}
            smoothScrolling={true}
            contentStyle={{width: props.tabs.length * 172}}
            horizontalContainerStyle={{display: 'none'}}
        >
            <ul>
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
        </ScrollArea>
        <StyledTabsMenu>

            <SystemButton
                className="p0"
                width={225}
                align="right"
                rightMost
                content={
                    <div>
                        <ul className="dropdown-group">
                            <li>
                                <CloseDropdownButton onClick={props.tabs.length && props.onCloseSaved} disabled={!props.tabs.length}>
                                    <span>
                                        <FormattedMessage id="editor.close.saved" defaultMessage="Close saved tabs" />
                                    </span>
                                </CloseDropdownButton>
                            </li>
                            <li>
                                <CloseDropdownButton onClick={props.tabs.length && props.onCloseAll} disabled={!props.tabs.length}>
                                    <span>
                                        <FormattedMessage id="editor.close.all" defaultMessage="Close all tabs" />
                                    </span>
                                </CloseDropdownButton>
                            </li>
                        </ul>
                    </div>
                }
            >
                <em className="fa fa-ellipsis-v"/>
            </SystemButton>
        </StyledTabsMenu>
    </div>
);

const StyledEditorTabs = themed(EditorTabs) `
    background: ${props => props.theme.editorBackground};
    ul {
        height: 36px;
        list-style-type: none;
        padding: 1px 0 0;
        margin: 0;
        overflow: auto;
        white-space: nowrap;
    }
`;

export default StyledEditorTabs;