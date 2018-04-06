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
import { TEditorTab } from 'genesis/editor';

import CodeEditor from 'components/Editor';
import EditorTabs from './EditorTabs';
import Page from 'components/Main/Page';
import ConstructorTabbed from 'containers/Main/containers/Admin/Interface/ConstructorTabbed';

export interface IEditorProps {
    tabIndex: number;
    tabs: TEditorTab[];
    onTabChange: (index: number) => void;
    onTabUpdate: (value: string) => void;
    onTabClose: (index: number) => void;
}

class Editor extends React.Component<IEditorProps> {
    renderTool(tab: TEditorTab) {
        switch (tab.tool) {
            case 'constructor':
                return (
                    <ConstructorTabbed pageID={tab.id} pageName={tab.name} />
                );

            case 'preview':
                return (
                    <Page
                        name="preview"
                        content={tab.preview}
                        params={{}}
                    />
                );

            default:
                return (
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