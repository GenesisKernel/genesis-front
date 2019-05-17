/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { TEditorTab } from 'apla/editor';

import ToolButton from './ToolButton';
import SectionToolButton from './SectionToolButton';

export interface IEditorToolbarProps {
    currentTab: TEditorTab;
    canSave: boolean;
    canRevert: boolean;
    onRevert: () => void;
    onToolChange: (tool: string) => void;
    onExec: () => void;
    onSave: () => void;
}

const editorTools = [
    {
        type: 'constructor',
        content: (
            <FormattedMessage id="editor.tool.designer" defaultMessage="Designer" />
        )
    },
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
                <li style={{ margin: '8px', float: 'right' }}>
                    <SectionToolButton
                        activeIndex={resolveToolIndex(props.currentTab.tool)}
                        onChange={onToolChange}
                        items={editorTools.map(l => l.content)}
                    />
                </li>
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