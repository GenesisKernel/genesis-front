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
import { TEditorTab } from 'genesis/content';

import CodeEditor from 'components/Editor';
import EditorTabs from './EditorTabs';
import Page from 'components/Main/Page';

export interface IEditorProps {
    open?: string;
    create?: string;
    name?: string;
    vde?: boolean;

    tabIndex: number;
    tabs: TEditorTab[];
    onTabCreate: (type: string) => void;
    onTabLoad: (params: { type: string, name: string, vde?: boolean }) => void;
    onTabChange: (index: number) => void;
    onTabUpdate: (value: string) => void;
    onTabClose: (index: number) => void;
}

class Editor extends React.Component<IEditorProps> {
    constructor(props: IEditorProps) {
        super(props);
        this.loadData(props);
    }

    componentWillReceiveProps(props: IEditorProps) {
        this.loadData(props);
    }

    loadData(props: IEditorProps) {
        if (props.open && props.name) {
            props.onTabLoad({
                type: props.open,
                name: props.name,
                vde: props.vde
            });
        }

        if (props.create) {
            props.onTabCreate(props.create);
        }
    }

    renderTool(tab: TEditorTab) {
        switch (tab.tool) {
            case 'constructor':
                return (
                    <span>[WIP] Constructor</span>
                );

            case 'preview':
                return (
                    <Page
                        name="preview"
                        content={tab.preview}
                        params={{}}
                    />
                );

            default: return (
                <CodeEditor
                    language={'contract' === tab.type ? 'simvolio' : 'protypo'}
                    value={tab.value}
                    onChange={this.props.onTabUpdate}
                />
            );
        }
    }

    render() {
        const currentTab = this.props.tabs[this.props.tabIndex];
        return (
            <div className="fullscreen noscroll">
                <EditorTabs
                    tabIndex={this.props.tabIndex}
                    tabs={this.props.tabs}
                    onChange={this.props.onTabChange}
                    onClose={this.props.onTabClose}
                />
                {currentTab && this.renderTool(currentTab)}
            </div>
        );
    }
}

export default Editor;