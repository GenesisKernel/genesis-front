// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

/// <reference types="monaco-editor" />

import * as React from 'react';
import styled from 'styled-components';
import MonacoEditor from 'react-monaco-editor';
import registerProtypo from './protypo';

const StyledEditor = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    > .react-monaco-editor-container {
        flex: 1;
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
    editorWillMount(editor: typeof monaco) {
        registerProtypo(editor);
    }

    render() {
        return (
            <StyledEditor>
                <MonacoEditor
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
                />
            </StyledEditor>
        );
    }
}