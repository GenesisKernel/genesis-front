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

const simvolioSyntax = () => ({
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: 'invalid',

    keywords: [
        'action',
        'break',
        'conditions',
        'continue',
        'contract',
        'data',
        'else',
        'error',
        'false',
        'func',
        'if',
        'info',
        'nil',
        'return',
        'settings',
        'true',
        'var',
        'warning',
        'while'
    ],

    typeKeywords: [
        'bool',
        'bytes',
        'int',
        'address',
        'array',
        'map',
        'money',
        'float',
        'string'
    ],

    operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
        '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
        '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
        '%=', '<<=', '>>=', '>>>='
    ],

    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,

    // Simvolio strings
    escapes: /\\(?:[abfnrtv\\"'`]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
        root: [
            // identifiers and keywords
            [/[a-z_$][\w$]*/, {
                cases: {
                    '@typeKeywords': 'keyword',
                    '@keywords': 'keyword',
                    '@default': 'identifier'
                }
            }],
            [/[A-Z][\w\$]*/, 'type.identifier'],

            // Whitespace
            { include: '@whitespace' },

            // Delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/@symbols/, {
                cases: {
                    '@operators': 'operator',
                    '@default': ''
                }
            }],

            // Numbers
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],

            // Delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],

            // Strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
            [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

            // Grave strings
            [/`([^`\\]|\\.)*$/, 'string.grave.invalid'],  // non-teminated string
            [/`/, { token: 'string.grave.quote', bracket: '@open', next: '@graveString' }],

            // Characters
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
            [/'/, 'string.invalid']
        ],

        comment: [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'],    // nested comment
            ['\\*/', 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],

        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ],

        graveString: [
            [/[^\\`]+/, 'string.grave'],
            [/@escapes/, 'string.grave.escape'],
            [/\\./, 'string.grave.invalid'],
            [/`/, { token: 'string.grave.quote', bracket: '@close', next: '@pop' }]
        ],

        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment']
        ],
    },

    tokenPostfix: '.'
}) as monaco.languages.IMonarchLanguage;

export default simvolioSyntax;