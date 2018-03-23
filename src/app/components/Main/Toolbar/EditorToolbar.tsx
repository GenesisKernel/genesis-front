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
import { FormattedMessage } from 'react-intl';
import { TEditorTab } from 'genesis/editor';

import ToolButton from './ToolButton';
import DropdownToolButton from './DropdownToolButton';
import SectionToolButton from './SectionToolButton';
import { CloseDropdownButton } from 'components/DropdownButton';

export interface IEditorToolbarProps {
    currentTab: TEditorTab;
    canSave: boolean;
    canRevert: boolean;
    onCreate: (type: string) => void;
    onRevert: () => void;
    onToolChange: (tool: string) => void;
    onExec: () => void;
    onSave: () => void;
}

const editorTools = [
    /*{
        type: 'constructor',
        content: (
            <FormattedMessage id="editor.tool.designer" defaultMessage="Designer" />
        )
    },*/
    {
        type: 'editor',
        content: (
            <FormattedMessage id="editor.tool.developer" defaultMessage="Developer" />
        )
    },
    {
        type: 'preview',
        content: (
            <FormattedMessage id="editor.tool.preview" defaultMessage="Preview" />
        )
    }
];

const resolveToolIndex = (tool: string) => {
    return editorTools.findIndex(l => l.type === tool);
};

const EditorToolbar: React.SFC<IEditorToolbarProps> = props => {
    const onToolChange = (toolIndex: number) => {
        const toolDef = editorTools[toolIndex];
        if (toolDef) {
            props.onToolChange(toolDef.type);
        }
    };

    return (
        <div>
            <DropdownToolButton
                leftMost
                icon="icon-doc"
                content={(
                    <div>
                        <div className="dropdown-heading">
                            <FormattedMessage id="editor.create" defaultMessage="Create" />
                        </div>
                        <ul className="dropdown-group">
                            <li>
                                <CloseDropdownButton onClick={props.onCreate.bind(null, 'contract')}>
                                    <em className="icon icon-docs text-primary" />
                                    <span>
                                        <FormattedMessage id="contract" defaultMessage="Smart contract" />
                                    </span>
                                </CloseDropdownButton>
                            </li>
                        </ul>
                        <div className="dropdown-heading">
                            <FormattedMessage id="interface" defaultMessage="Interface" />
                        </div>
                        <ul className="dropdown-group">
                            <ul className="dropdown-group">
                                <li>
                                    <CloseDropdownButton onClick={props.onCreate.bind(null, 'page')}>
                                        <em className="icon icon-notebook text-primary" />
                                        <span>
                                            <FormattedMessage id="interface.page" defaultMessage="Page" />
                                        </span>
                                    </CloseDropdownButton>
                                </li>
                                <li>
                                    <CloseDropdownButton onClick={props.onCreate.bind(null, 'menu')}>
                                        <em className="icon icon-list text-primary" />
                                        <span>
                                            <FormattedMessage id="interface.menu" defaultMessage="Menu" />
                                        </span>
                                    </CloseDropdownButton>
                                </li>
                                <li>
                                    <CloseDropdownButton onClick={props.onCreate.bind(null, 'block')}>
                                        <em className="icon icon-layers text-primary" />
                                        <span>
                                            <FormattedMessage id="interface.block" defaultMessage="Block" />
                                        </span>
                                    </CloseDropdownButton>
                                </li>
                            </ul>
                        </ul>
                    </div>
                )}
            >
                <FormattedMessage id="editor.create" defaultMessage="Create" />
            </DropdownToolButton>
            <ToolButton icon="icon-note" disabled={!props.canSave} onClick={props.onSave}>
                <FormattedMessage id="editor.save" defaultMessage="Save" />
            </ToolButton>
            <ToolButton icon="icon-action-undo" disabled={!props.canRevert} onClick={props.onRevert}>
                <FormattedMessage id="editor.revert" defaultMessage="Revert" />
            </ToolButton>
            {/*<ToolButton size={styles.toolbarHeight} icon="icon-layers">
            <FormattedMessage id="editor.save.all" defaultMessage="Save all" />
            </ToolButton>*/}
            {props.currentTab && 'contract' !== props.currentTab.type && (
                <SectionToolButton
                    activeIndex={resolveToolIndex(props.currentTab.tool)}
                    onChange={onToolChange}
                    items={editorTools.map(l => l.content)}
                />
            )}
            {props.currentTab && 'contract' === props.currentTab.type && (
                <ToolButton icon="icon-paper-plane" disabled={props.currentTab.new || props.canSave} onClick={props.onExec}>
                    <FormattedMessage id="editor.execute" defaultMessage="Execute" />
                </ToolButton>
            )}
        </div>
    );
};

export default EditorToolbar;