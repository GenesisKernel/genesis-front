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
                    onChange={this.props.onChange.bind(this)}
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