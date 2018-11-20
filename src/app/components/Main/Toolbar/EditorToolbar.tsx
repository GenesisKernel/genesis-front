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

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TEditorTab } from 'genesis/editor';

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