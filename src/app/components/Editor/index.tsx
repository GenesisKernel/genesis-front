/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import styled from 'styled-components';
import MonacoEditor from 'react-monaco-editor';
import registerProtypo from './protypo';
import registerSimvolio from './simvolio';

import { editor } from 'monaco-editor';
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/caretOperations.js';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/transpose.js';
import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggest.js';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

registerProtypo(monacoEditor);
registerSimvolio(monacoEditor);

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
    options?: editor.IEditorOptions;
    onChange?: (code: string) => void;
}

export default class Editor extends React.Component<IEditorProps> {
    render() {
        return (
            <StyledEditor className={this.props.height ? null : 'editor-flex'}>
                <MonacoEditor
                    language={this.props.language}
                    value={this.props.value}
                    onChange={this.props.onChange && this.props.onChange.bind(this)}
                    options={{
                        automaticLayout: true,
                        contextmenu: false,
                        scrollBeyondLastLine: false,
                        ...this.props.options
                    }}
                    height={this.props.height}
                />
            </StyledEditor>
        );
    }
}