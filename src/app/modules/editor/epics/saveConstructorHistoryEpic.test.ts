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

import 'rxjs';
import 'lib/external/fsa';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { saveConstructorHistory } from '../actions';
import saveConstructorHistoryEpic from './saveConstructorHistoryEpic';
import dependencies from 'modules/dependencies';
import mockStore from 'test/mockStore';

describe('saveConstructorHistory', () => {
    it('save constructor history', () => {

        const action$ = ActionsObservable.of<Action>(saveConstructorHistory.started(null));

        const expectedOutput: any = [
            {
                payload: {
                    params: null,
                    result: {
                        data: [
                            [
                                {
                                    tag: 'image',
                                    attr: {
                                        alt: 'Image',
                                        src: '/img/dummy.png'
                                    },
                                    id: 'tag_0'
                                },
                                {
                                    tag: 'p',
                                    attr: {
                                        'class': 'text-primary'
                                    },
                                    children: [
                                        {
                                            tag: 'text',
                                            text: 'Paragraph text here',
                                            id: 'tag_2'
                                        }
                                    ],
                                    id: 'tag_1',
                                    childrenText: 'Paragraph text here'
                                },
                                {
                                    tag: 'form',
                                    children: [
                                        {
                                            tag: 'label',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Firstname:',
                                                    id: 'tag_5'
                                                }
                                            ],
                                            id: 'tag_4',
                                            childrenText: 'Firstname:'
                                        },
                                        {
                                            tag: 'input',
                                            attr: {
                                                'class': 'form-control',
                                                name: 'sample input'
                                            },
                                            id: 'tag_6'
                                        }
                                    ],
                                    id: 'tag_3',
                                    childrenText: null
                                },
                                {
                                    tag: 'form',
                                    children: [
                                        {
                                            tag: 'label',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Lastname:',
                                                    id: 'tag_9'
                                                }
                                            ],
                                            id: 'tag_8',
                                            childrenText: 'Lastname:'
                                        },
                                        {
                                            tag: 'input',
                                            attr: {
                                                'class': 'form-control',
                                                name: 'sample input'
                                            },
                                            id: 'tag_10'
                                        },
                                        {
                                            tag: 'button',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Submit',
                                                    id: 'tag_12'
                                                }
                                            ],
                                            id: 'tag_11',
                                            childrenText: 'Submit'
                                        }
                                    ],
                                    id: 'tag_7',
                                    childrenText: null
                                }
                            ],
                            [
                                {
                                    tag: 'image',
                                    attr: {
                                        alt: 'Image',
                                        src: '/img/dummy.png'
                                    },
                                    id: 'tag_0'
                                },
                                {
                                    tag: 'p',
                                    attr: {
                                        'class': 'text-primary'
                                    },
                                    children: [
                                        {
                                            tag: 'text',
                                            text: 'Paragraph text here',
                                            id: 'tag_2'
                                        }
                                    ],
                                    id: 'tag_1',
                                    childrenText: 'Paragraph text here'
                                },
                                {
                                    tag: 'form',
                                    children: [
                                        {
                                            tag: 'label',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Firstname:',
                                                    id: 'tag_5'
                                                }
                                            ],
                                            id: 'tag_4',
                                            childrenText: 'Firstname:'
                                        },
                                        {
                                            tag: 'input',
                                            attr: {
                                                'class': 'form-control',
                                                name: 'sample input'
                                            },
                                            id: 'tag_6'
                                        }
                                    ],
                                    id: 'tag_3',
                                    childrenText: null
                                },
                                {
                                    tag: 'form',
                                    children: [
                                        {
                                            tag: 'label',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Lastname:',
                                                    id: 'tag_9'
                                                }
                                            ],
                                            id: 'tag_8',
                                            childrenText: 'Lastname:'
                                        },
                                        {
                                            tag: 'input',
                                            attr: {
                                                'class': 'form-control',
                                                name: 'sample input'
                                            },
                                            id: 'tag_10'
                                        },
                                        {
                                            tag: 'button',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Submit',
                                                    id: 'tag_12'
                                                }
                                            ],
                                            id: 'tag_11',
                                            childrenText: 'Submit'
                                        }
                                    ],
                                    id: 'tag_7',
                                    childrenText: null
                                },
                                {
                                    tag: 'table',
                                    id: 'tag_13',
                                    attr: {
                                        source: 'keysStr',
                                        columns: 'KEY_ID=id,MONEY=amount'
                                    }
                                }
                            ],
                            [
                                {
                                    tag: 'image',
                                    attr: {
                                        alt: 'Image',
                                        src: '/img/dummy.png'
                                    },
                                    id: 'tag_0'
                                },
                                {
                                    tag: 'p',
                                    attr: {
                                        'class': 'text-primary'
                                    },
                                    children: [
                                        {
                                            tag: 'text',
                                            text: 'Paragraph text here',
                                            id: 'tag_2'
                                        }
                                    ],
                                    id: 'tag_1',
                                    childrenText: 'Paragraph text here'
                                },
                                {
                                    tag: 'form',
                                    children: [
                                        {
                                            tag: 'label',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Firstname:',
                                                    id: 'tag_5'
                                                }
                                            ],
                                            id: 'tag_4',
                                            childrenText: 'Firstname:'
                                        },
                                        {
                                            tag: 'input',
                                            attr: {
                                                'class': 'form-control',
                                                name: 'sample input'
                                            },
                                            id: 'tag_6'
                                        }
                                    ],
                                    id: 'tag_3',
                                    childrenText: null
                                },
                                {
                                    tag: 'form',
                                    children: [
                                        {
                                            tag: 'label',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Lastname:',
                                                    id: 'tag_9'
                                                }
                                            ],
                                            id: 'tag_8',
                                            childrenText: 'Lastname:'
                                        },
                                        {
                                            tag: 'input',
                                            attr: {
                                                'class': 'form-control',
                                                name: 'sample input'
                                            },
                                            id: 'tag_10'
                                        },
                                        {
                                            tag: 'button',
                                            children: [
                                                {
                                                    tag: 'text',
                                                    text: 'Submit',
                                                    id: 'tag_12'
                                                }
                                            ],
                                            id: 'tag_11',
                                            childrenText: 'Submit'
                                        }
                                    ],
                                    id: 'tag_7',
                                    childrenText: null
                                },
                                {
                                    tag: 'table',
                                    id: 'tag_13',
                                    attr: {
                                        source: 'keysStr',
                                        columns: 'KEY_ID=id,MONEY=amount'
                                    }
                                }
                            ]
                        ],
                        position: 3,
                        canUndo: true,
                        canRedo: false
                    }
                },
                type: 'editor/SAVE_CONSTRUCTOR_HISTORY_DONE'
            }
        ];

        saveConstructorHistoryEpic(action$, mockStore, { constructorModule: dependencies.constructorModule })
            .toArray()
            .subscribe(actualOutput => {
                expect(actualOutput).toEqual(expectedOutput);
            });
    });
});