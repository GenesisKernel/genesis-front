/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TEditorTab } from 'apla/editor';
import imgSim from './sim.svg';
import imgTpl from './tpl.svg';

import themed from 'components/Theme/themed';
import EditorTab from './EditorTab';
import SystemButton from 'components/Main/SystemButton';
import { CloseDropdownButton } from 'components/DropdownButton';
import ScrollView from 'components/ScrollView';

export const TYPE_ICONS: { [type: string]: string } = {
    contract: imgSim,
    page: imgTpl,
    menu: imgTpl,
    block: imgTpl,
    default: null
};

const StyledTabsMenu = themed.div`
    background: ${props => props.theme.editorBackground};
    position: absolute;
    top: 0px;
    right: 0px;
    width: 40px;
    
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
    <div>
        <div className={props.className}>
            <ScrollView className="editor-scroll-area" disableVertical hideHorizontal horizontalWheel>
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
            </ScrollView>
        </div>
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
                                    <em className="icon icon-docs" />
                                    <span>
                                        <FormattedMessage id="editor.close.saved" defaultMessage="Close saved tabs" />
                                    </span>
                                </CloseDropdownButton>
                            </li>
                            <li>
                                <CloseDropdownButton onClick={props.tabs.length && props.onCloseAll} disabled={!props.tabs.length}>
                                    <em className="icon icon-docs text-danger" />
                                    <span>
                                        <FormattedMessage id="editor.close.all" defaultMessage="Close all tabs" />
                                    </span>
                                </CloseDropdownButton>
                            </li>
                        </ul>
                    </div>
                }
            >
                <em className="icon-options" />
            </SystemButton>
        </StyledTabsMenu>
    </div>
);

const StyledEditorTabs = themed(EditorTabs)`
    background: ${props => props.theme.editorBackground};
    height: 36px;
    margin-right: 40px;
    
    .editor-scroll-area {
        ul {
            height: 36px;
            list-style-type: none;
            padding: 1px 0 0;
            margin: 0;
            white-space: nowrap;
        }
    }
`;

export default StyledEditorTabs;