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

import * as _ from 'lodash';
import syntax from './monarch';

const register = (editor: typeof monaco) => {
    const staticParamTypes = {
        Body: {
            label: 'Body',
            kind: monaco.languages.CompletionItemKind.Property,
            documentation: 'Contents of this element',
            insertText: 'Body: '
        },
        Class: {
            label: 'Class',
            kind: monaco.languages.CompletionItemKind.Property,
            documentation: 'HTML class value',
            insertText: 'Class: '
        }
    };

    const functionDefs = {
        Address: {
            label: 'Address',
            documentation: 'Converts wallet ID to address in readable format',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Address(',
            params: [
                {
                    label: 'Wallet',
                    documentation: 'Wallet ID to convert',
                    insertText: 'Wallet: '
                }
            ]
        },
        And: {
            label: 'And',
            documentation: 'Logical "And" operator. All parameters must be truthy',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'And('
        },
        DBFind: {
            label: 'DBFind',
            documentation: 'Database search',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'DBFind(',
            params: [
                {
                    label: 'Name',
                    documentation: 'Table name to search',
                    insertText: 'Name: '
                },
                {
                    label: 'Source',
                    documentation: 'Source identificator to bind results',
                    insertText: 'Source: '
                }
            ]
        },
        Button: {
            label: 'Button',
            documentation: 'Button element',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'Button(',
            params: [
                staticParamTypes.Body,
                staticParamTypes.Class,
                {
                    label: 'Page',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Page to redirect after successful action',
                    insertText: 'Page: '
                },
                {
                    label: 'Contract',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Contract name to execute (case-sensitive)',
                    insertText: 'Contract: '
                },
                {
                    label: 'Params',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Contract execution parameters (case-sensitive)',
                    insertText: 'Params: '
                },
                {
                    label: 'PageParams',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Parameters which will be passed to the page upon successful redirection',
                    insertText: 'PageParams: '
                }
            ]
        },
        Div: {
            label: 'Div',
            documentation: 'Generic container for the content. You can use it to group other elements and apply specific styling or classes',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'Div(',
            params: [
                staticParamTypes.Body,
                staticParamTypes.Class
            ]
        },
        Em: {
            label: 'Em',
            documentation: 'Specific element that marks the text that has stress emphasis',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'Em(',
            params: [
                staticParamTypes.Body,
                staticParamTypes.Class
            ]
        },
        Form: {
            label: 'Form',
            documentation: 'Contract form container. All input elements must be placed within a form',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'Form(',
            params: [
                staticParamTypes.Body,
                staticParamTypes.Class
            ]
        },
        GetVar: {
            label: 'GetVar',
            documentation: 'Get variable value',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'GetVar(',
            params: [
                {
                    label: 'Name',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Variable name to get the value of',
                    insertText: 'Name: '
                }
            ]
        },
        If: {
            label: 'If',
            documentation: 'Conditional clause. Body elements will be shown only if the condition is truthy',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'If(',
            params: [
                staticParamTypes.Body,
                {
                    label: 'Condition',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Condition to met for this function to succeed',
                    insertText: 'Condition: '
                }
            ]
        },
        Include: {
            label: 'Include',
            documentation: 'Include another page or block and output its contents',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Include(',
            params: [
                {
                    label: 'Name',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Page or block name to include',
                    insertText: 'Name: '
                }
            ]
        },
        Input: {
            label: 'Input',
            documentation: 'Form input element to request user to enter some data',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'Input(',
            params: [
                staticParamTypes.Class,
                {
                    label: 'Name',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Unique input name to bind the value to',
                    insertText: 'Name: '
                },
                {
                    label: 'Placeholder',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Placeholder text to show when input is empty',
                    insertText: 'Placeholder: '
                },
                {
                    label: 'Type',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Input type such as text or password',
                    insertText: 'Type: '
                },
                {
                    label: 'Value',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Default input value',
                    insertText: 'Value: '
                }
            ]
        },
        InputErr: {
            label: 'InputErr',
            documentation: 'Validation message for the specific input',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'InputErr(',
            params: [
                staticParamTypes.Class,
                {
                    label: 'Name',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Unique input name to validate',
                    insertText: 'Name: '
                }
            ]
        },
        Label: {
            label: 'Label',
            documentation: 'Form input label. Will set focus to bound input on click',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'Label(',
            params: [
                staticParamTypes.Body,
                staticParamTypes.Class,
                {
                    label: 'For',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Unique input name to bind the label',
                    insertText: 'For: '
                }
            ]
        },
        LangRes: {
            label: 'LangRes',
            documentation: 'Get language resource by name',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'LangRes(',
            params: [
                {
                    label: 'Name',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Unique resource name to get',
                    insertText: 'Name: '
                },
                {
                    label: 'Lang',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Explicitly set language of the resource to get',
                    insertText: 'Lang: '
                }
            ]
        },
        MenuGroup: {
            label: 'MenuGroup',
            documentation: 'Menu group that will replace current menu on click',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'MenuGroup(',
            params: [
                staticParamTypes.Body,
                {
                    label: 'Title',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Title of the menu button',
                    insertText: 'Title: '
                },
                {
                    label: 'Icon',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Optional icon to show near the menu button',
                    insertText: 'Icon: '
                }
            ]
        },
        MenuItem: {
            label: 'MenuItem',
            documentation: 'Menu item button used to redirect user to another page',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'MenuItem(',
            params: [
                {
                    label: 'Title',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Title of the menu button',
                    insertText: 'Title: '
                },
                {
                    label: 'Page',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Page that will be loaded on click',
                    insertText: 'Page: '
                },
                {
                    label: 'Params',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Parameters which will be passed to the page upon redirection',
                    insertText: 'Params: '
                },
                {
                    label: 'Icon',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Optional icon to show near the button',
                    insertText: 'Icon: '
                }
            ]
        },
        Or: {
            label: 'Or',
            documentation: 'Logical "Or" operator. One of the parameters must be truthy',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Or('
        },
        P: {
            label: 'P',
            documentation: 'HTML element that represents a paragraph of text',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'P(',
            params: [
                staticParamTypes.Body,
                staticParamTypes.Class
            ]
        },
        SetVar: {
            label: 'SetVar',
            documentation: 'Set variable value by name',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'SetVar(',
            params: [
                {
                    label: 'Name',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Variable name to set the value of',
                    insertText: 'Name: '
                },
                {
                    label: 'Value',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Variable name to set the value of',
                    insertText: 'Value: '
                }
            ]
        },
        Span: {
            label: 'Span',
            documentation: 'Generic container for the content. You can use it to group other elements and apply specific styling or classes',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'Span(',
            params: [
                staticParamTypes.Body,
                staticParamTypes.Class
            ]
        },
        Strong: {
            label: 'Strong',
            documentation: 'Generic container for the content that will give text strong importance',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'Strong(',
            params: [
                staticParamTypes.Body,
                staticParamTypes.Class
            ]
        },
        Table: {
            label: 'Table',
            documentation: 'Generic container for the content that will give text strong importance',
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: 'Table(',
            params: [
                {
                    label: 'Source',
                    documentation: 'Source identificator to fetch the results',
                    insertText: 'Source: '
                },
                {
                    label: 'Columns',
                    kind: monaco.languages.CompletionItemKind.Property,
                    documentation: 'Optional filter for the coulmns to show. Format: ColumnTitle1=column1,ColumnTitl2=column2',
                    insertText: 'Columns: '
                }
            ]
        },
    };

    const functionProposals = () =>
        _.map(functionDefs, (value) => value);

    editor.languages.registerCompletionItemProvider('protypo', {
        provideCompletionItems: (model, position) => {
            const textUntilPosition = model.getValueInRange({ startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column });

            // Match function parameters. There must be an opening bracket or separating comma
            const paramsMatch = textUntilPosition.match(/ ?([A-Z][a-zA-Z]*)\(([a-zA-Z]*.*,)*[ a-zA-Z]*$/);
            if (paramsMatch && functionDefs[paramsMatch[1]]) {
                return functionDefs[paramsMatch[1]].params;
            }

            return functionProposals();
        }
    });

    /*editor.languages.registerSignatureHelpProvider('protypo', {
        provideSignatureHelp: (model, position) => {

        }
    });*/

    monaco.languages.register({
        id: 'protypo'
    });

    editor.languages.setMonarchTokensProvider('protypo', syntax(
        _.map(functionDefs, (value, key) => value.kind === monaco.languages.CompletionItemKind.Method ? key : null).filter(l => l),
        _.map(functionDefs, (value, key) => value.kind === monaco.languages.CompletionItemKind.Function ? key : null).filter(l => l)
    ));
};

export default register;