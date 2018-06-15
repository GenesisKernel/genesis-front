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
import { TEditorTab } from 'genesis/editor';

import CodeEditor from 'components/Editor';
import EditorTabs from './EditorTabs';
import Page from 'components/Main/Page';
import ConstructorTabbed from 'containers/Main/Editor/ConstructorTabbed';

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
                    <div style={{ overflowY: 'auto' }}>
                        <Page
                            name="preview"
                            content={tab.preview}
                            params={{}}
                        />
                    </div>
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