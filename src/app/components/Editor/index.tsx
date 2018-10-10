// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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

/// <reference types="monaco-editor" />

import * as React from 'react';
import styled from 'styled-components';
import MonacoEditor from 'react-monaco-editor';
import registerProtypo from './protypo';
import registerSimvolio from './simvolio';
import platform from 'lib/platform';

const StyledEditor = styled.div`
    &.editor-flex {
        display: flex;
        flex-direction: column;
        flex: 1;

        > .react-monaco-editor-container {
            flex: 1;
        }
    }
`;

interface IEditorProps {
    language?: string;
    value?: string;
    width?: number;
    height?: number;
    options?: monaco.editor.IEditorOptions;
    onChange?: (code: string) => void;
}

export default class Editor extends React.Component<IEditorProps> {
    public editor: monaco.editor.ICodeEditor;

    editorWillMount(editor: typeof monaco) {
        registerProtypo(editor);
        registerSimvolio(editor);
    }

    render() {
        return (
            <StyledEditor className={this.props.height ? null : 'editor-flex'}>
                <MonacoEditor
                    ref={l => this.editor = l && l.editor}
                    language={this.props.language}
                    value={this.props.value}
                    onChange={this.props.onChange && this.props.onChange.bind(this)}
                    editorWillMount={this.editorWillMount.bind(this)}
                    options={{
                        automaticLayout: true,
                        contextmenu: false,
                        scrollBeyondLastLine: false,
                        ...this.props.options
                    }}
                    height={this.props.height}
                    requireConfig={{
                        url: platform.select({
                            desktop: './vs/loader.js',
                            web: '/vs/loader.js'
                        }),
                        baseUrl: platform.select({
                            desktop: './',
                            web: '/'
                        }),
                        paths: {
                            'vs': './vs'
                        }
                    }}
                />
            </StyledEditor>
        );
    }
}