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

import 'rxjs';
import 'lib/external/fsa';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { saveConstructorHistory } from '../actions';
import saveConstructorHistoryEpic from './saveConstructorHistoryEpic';
import constructorModule from 'lib/constructor';
import mockStore from './mockStore';

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

        saveConstructorHistoryEpic(action$, mockStore, { constructorModule })
            .toArray()
            .subscribe(actualOutput => {
                expect(actualOutput).toEqual(expectedOutput);
            });
    });
});