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
// import { Dispatch } from 'react-redux';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { addTag } from '../actions';
import addTagEpic from './addTagEpic';
import constructorModule from 'lib/constructor';
// import * as editor from 'modules/editor';
// import { IRootState } from 'modules';
import mockStore from './mockStore';

describe('addTagEpic', () => {
    it('adds tag to tree json', () => {

        const action$ = ActionsObservable.of<Action>(addTag.started({
            tag: {
                new: true,
                element: 'div'
            }
        }));

        const expectedOutput = [
            {
                "payload": {
                    "params": {
                        "tag": {
                            "element": "div",
                            "new": true
                        }
                    },
                    "result": {
                        "jsonData": [
                            {
                                "children": [
                                    {
                                        "attr": {
                                            "class": "text-success"
                                        },
                                        "children": [
                                            {
                                                "id": "tag_76541599",
                                                "tag": "text",
                                                "text": "Paragraph"
                                            }
                                        ],
                                        "childrenText": "Paragraph",
                                        "id": "tag_33951839",
                                        "tag": "p"
                                    },
                                    {
                                        "attr": {
                                            "alt": "Image",
                                            "src": "/img/dummy.png"
                                        },
                                        "id": "tag_27766220",
                                        "tag": "image"
                                    }
                                ],
                                "childrenText": null,
                                "id": "tag_29845938",
                                "tag": "div"
                            },
                            {
                                "children": [],
                                "childrenText": "",
                                "id": "tag_37595832",
                                "tag": "div"
                            }
                        ],
                        "treeData": [
                            {
                                "canDrop": true,
                                "canMove": true,
                                "children": [
                                    {
                                        "canDrop": true,
                                        "canMove": true,
                                        "children": null,
                                        "expanded": true,
                                        "id": "tag_33951839",
                                        "logic": false,
                                        "selected": false,
                                        "tag": {
                                            "attr": {
                                                "class": "text-success"
                                            },
                                            "children": [
                                                {
                                                    "tag": "text",
                                                    "text": "Paragraph",
                                                    "id": "tag_76541599"
                                                }
                                            ],
                                            "childrenText": "Paragraph",
                                            "id": "tag_33951839",
                                            "tag": "p"
                                        },
                                        "title": "p: Paragraph"
                                    },
                                    {
                                        "canDrop": false,
                                        "canMove": true,
                                        "children": null,
                                        "expanded": true,
                                        "id": "tag_27766220",
                                        "logic": false,
                                        "selected": false,
                                        "tag": {
                                            "attr": {
                                                "alt": "Image",
                                                "src": "/img/dummy.png"
                                            },
                                            "id": "tag_27766220",
                                            "tag": "image"
                                        },
                                        "title": "image"
                                    }
                                ],
                                "expanded": true,
                                "id": "tag_29845938",
                                "logic": false,
                                "selected": false,
                                "tag": {
                                    "children": [
                                        {
                                            "attr": {
                                                "class": "text-success"
                                            },
                                            "children": [
                                                {
                                                    "tag": "text",
                                                    "text": "Paragraph",
                                                    "id": "tag_76541599"
                                                }
                                            ],
                                            "childrenText": "Paragraph",
                                            "id": "tag_33951839",
                                            "tag": "p"
                                        },
                                        {
                                            "attr": {
                                                "alt": "Image",
                                                "src": "/img/dummy.png"
                                            },
                                            "id": "tag_27766220",
                                            "tag": "image"
                                        }
                                    ],
                                    "childrenText": null,
                                    "id": "tag_29845938",
                                    "tag": "div"
                                },
                                "title": "div"
                            },
                            {
                                "canDrop": true,
                                "canMove": true,
                                "children": [],
                                "expanded": true,
                                "id": "tag_37595832",
                                "logic": false,
                                "selected": false,
                                "tag": {
                                    "children": [],
                                    "childrenText": "",
                                    "id": "tag_37595832",
                                    "tag": "div"
                                },
                                "title": "div"
                            }
                        ]
                    }
                },
                "type": "editor/ADD_TAG_DONE"
            }
        ];

        addTagEpic(action$, mockStore, { constructorModule })
            .toArray()
            .subscribe(actualOutput => {
                expect(actualOutput).toEqual([expectedOutput]);
            });
    });
});