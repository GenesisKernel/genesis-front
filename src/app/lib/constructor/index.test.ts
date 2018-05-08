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

import constructorModule from 'lib/constructor';
import { TProtypoElement } from 'genesis/protypo';
import { TConstructorTreeElement, IFindTagResult } from 'genesis/editor';

test('Constructor module', () => {

    const jsonData: TProtypoElement[] = [
        {
            tag: 'p',
            attr: {
                'class': 'text-danger text-center'
            },
            children: [
                {
                    tag: 'strong',
                    id: 'tag_34954216',
                    attr: {
                        className: null
                    },
                    children: [
                        {
                            tag: 'text',
                            text: 'Bold text',
                            id: 'tag_88634399'
                        }
                    ],
                    childrenText: 'Bold text'
                },
                {
                    tag: 'span',
                    id: 'tag_65961696',
                    attr: {
                        className: null
                    },
                    children: [
                        {
                            tag: 'text',
                            text: ' and ',
                            id: 'tag_19360500'
                        }
                    ],
                    childrenText: ' and '
                },
                {
                    tag: 'em',
                    id: 'tag_34004593',
                    attr: {
                        className: null
                    },
                    children: [
                        {
                            tag: 'text',
                            text: 'italic',
                            id: 'tag_77362545'
                        }
                    ],
                    childrenText: 'italic'
                }
            ],
            id: 'tag_88596132',
            childrenText: '<b>Bold text</b><span> and </span><i>italic</i>'
        },
        {
            tag: 'div',
            attr: {
                'class': 'classname'
            },
            sysAttr: {
                canDropPosition: 'inside'
            },
            children: [
                {
                    tag: 'input',
                    id: 'tag_27384336',
                    attr: {
                        name: 'sample input',
                        'class': 'form-control'
                    }
                },
                {
                    tag: 'button',
                    id: 'tag_14345510',
                    children: [
                        {
                            tag: 'text',
                            text: 'Button',
                            id: 'tag_66000647'
                        }
                    ],
                    childrenText: 'Button'
                }
            ],
            id: 'tag_42524123',
            childrenText: null
        }
    ];

    const jsonDataNoChildrenText: TProtypoElement[] = [
        {
            tag: 'p',
            attr: {
                'class': 'text-danger text-center'
            },
            children: [
                {
                    tag: 'strong',
                    id: 'tag_34954216',
                    attr: {
                        className: null
                    },
                    children: [
                        {
                            tag: 'text',
                            text: 'Bold text',
                            id: 'tag_88634399'
                        }
                    ]
                },
                {
                    tag: 'span',
                    id: 'tag_65961696',
                    attr: {
                        className: null
                    },
                    children: [
                        {
                            tag: 'text',
                            text: ' and ',
                            id: 'tag_19360500'
                        }
                    ]
                },
                {
                    tag: 'em',
                    id: 'tag_34004593',
                    attr: {
                        className: null
                    },
                    children: [
                        {
                            tag: 'text',
                            text: 'italic',
                            id: 'tag_77362545'
                        }
                    ]
                }
            ],
            id: 'tag_88596132'
        },
        {
            tag: 'div',
            attr: {
                'class': 'classname'
            },
            sysAttr: {
                canDropPosition: 'inside'
            },
            children: [
                {
                    tag: 'input',
                    id: 'tag_27384336',
                    attr: {
                        name: 'sample input',
                        'class': 'form-control'
                    }
                },
                {
                    tag: 'button',
                    id: 'tag_14345510',
                    children: [
                        {
                            tag: 'text',
                            text: 'Button',
                            id: 'tag_66000647'
                        }
                    ]
                }
            ],
            id: 'tag_42524123'
        }
    ];

    const selectedTag: TProtypoElement = {
        tag: 'input',
        id: 'tag_27384336',
        attr: {
            name: 'sample input',
            'class': 'form-control'
        }
    };

    const foundTag: IFindTagResult = {
        el: {
            attr: {
                class: 'form-control',
                name: 'sample input'
            },
            id: 'tag_27384336',
            tag: 'input'
        },
        parent: {
            attr: {
                class: 'classname'
            },
            sysAttr: {
                canDropPosition: 'inside'
            },
            children: [
                {
                    attr: {
                        class: 'form-control',
                        name: 'sample input'
                    },
                    id: 'tag_27384336',
                    tag: 'input'
                },
                {
                    children: [
                        {
                            id: 'tag_66000647',
                            tag: 'text',
                            text: 'Button'
                        }
                    ],
                    childrenText: 'Button',
                    id: 'tag_14345510',
                    tag: 'button'
                },
            ],
            childrenText: null,
            id: 'tag_42524123',
            tag: 'div'
        },
        parentPosition: 0,
        tail: false
    };

    const treeData: TConstructorTreeElement[] = [
        {
            title: 'p',
            children: [
                {
                    title: 'strong: Bold text',
                    children: null,
                    expanded: true,
                    id: 'tag_34954216',
                    selected: false,
                    logic: false,
                    canMove: true,
                    canDrop: true,
                    tag: {
                        tag: 'strong',
                        id: 'tag_34954216',
                        attr: {
                            className: null
                        },
                        children: [
                            {
                                tag: 'text',
                                text: 'Bold text',
                                id: 'tag_88634399'
                            }
                        ],
                        childrenText: 'Bold text'
                    }
                },
                {
                    title: 'span:  and ',
                    children: null,
                    expanded: true,
                    id: 'tag_65961696',
                    selected: false,
                    logic: false,
                    canMove: true,
                    canDrop: true,
                    tag: {
                        tag: 'span',
                        id: 'tag_65961696',
                        attr: {
                            className: null
                        },
                        children: [
                            {
                                tag: 'text',
                                text: ' and ',
                                id: 'tag_19360500'
                            }
                        ],
                        childrenText: ' and '
                    }
                },
                {
                    title: 'em: italic',
                    children: null,
                    expanded: true,
                    id: 'tag_34004593',
                    selected: false,
                    logic: false,
                    canMove: true,
                    canDrop: true,
                    tag: {
                        tag: 'em',
                        id: 'tag_34004593',
                        attr: {
                            className: null
                        },
                        children: [
                            {
                                tag: 'text',
                                text: 'italic',
                                id: 'tag_77362545'
                            }
                        ],
                        childrenText: 'italic'
                    }
                }
            ],
            expanded: true,
            id: 'tag_88596132',
            selected: false,
            logic: false,
            canMove: true,
            canDrop: true,
            tag: {
                tag: 'p',
                attr: {
                    'class': 'text-danger text-center'
                },
                children: [
                    {
                        tag: 'strong',
                        id: 'tag_34954216',
                        attr: {
                            className: null
                        },
                        children: [
                            {
                                tag: 'text',
                                text: 'Bold text',
                                id: 'tag_88634399'
                            }
                        ],
                        childrenText: 'Bold text'
                    },
                    {
                        tag: 'span',
                        id: 'tag_65961696',
                        attr: {
                            className: null
                        },
                        children: [
                            {
                                tag: 'text',
                                text: ' and ',
                                id: 'tag_19360500'
                            }
                        ],
                        childrenText: ' and '
                    },
                    {
                        tag: 'em',
                        id: 'tag_34004593',
                        attr: {
                            className: null
                        },
                        children: [
                            {
                                tag: 'text',
                                text: 'italic',
                                id: 'tag_77362545'
                            }
                        ],
                        childrenText: 'italic'
                    }
                ],
                id: 'tag_88596132',
                childrenText: '<b>Bold text</b><span> and </span><i>italic</i>'
            }
        },
        {
            title: 'div',
            children: [
                {
                    title: 'input',
                    children: null,
                    expanded: true,
                    id: 'tag_27384336',
                    selected: true,
                    logic: false,
                    canMove: true,
                    canDrop: false,
                    tag: {
                        tag: 'input',
                        id: 'tag_27384336',
                        attr: {
                            name: 'sample input',
                            'class': 'form-control'
                        }
                    }
                },
                {
                    title: 'button: Button',
                    children: null,
                    expanded: true,
                    id: 'tag_14345510',
                    selected: false,
                    logic: false,
                    canMove: true,
                    canDrop: true,
                    tag: {
                        tag: 'button',
                        id: 'tag_14345510',
                        children: [
                            {
                                tag: 'text',
                                text: 'Button',
                                id: 'tag_66000647'
                            }
                        ],
                        childrenText: 'Button'
                    }
                }
            ],
            expanded: true,
            id: 'tag_42524123',
            selected: false,
            logic: false,
            canMove: true,
            canDrop: true,
            tag: {
                tag: 'div',
                attr: {
                    'class': 'classname'
                },
                sysAttr: {
                    canDropPosition: 'inside'
                },
                children: [
                    {
                        tag: 'input',
                        id: 'tag_27384336',
                        attr: {
                            name: 'sample input',
                            'class': 'form-control'
                        }
                    },
                    {
                        tag: 'button',
                        id: 'tag_14345510',
                        children: [
                            {
                                tag: 'text',
                                text: 'Button',
                                id: 'tag_66000647'
                            }
                        ],
                        childrenText: 'Button'
                    }
                ],
                id: 'tag_42524123',
                childrenText: null
            }
        }
    ];

    const pageTemplate = 'P(Class: text-danger text-center) {\n Strong(Body:\n  Bold text\n )\n Span(Body:\n   and \n )\n Em(Body:\n  italic\n )\n}\nDiv(Class: classname) {\n Input(Class: form-control, Name: sample input)\n Button(Body:\n  Button\n )\n}';
    const codeGenerator = new constructorModule.CodeGenerator(jsonData);

    expect(foundTag).toEqual(constructorModule.findTagById(jsonData, 'tag_27384336'));
    expect(treeData).toEqual(constructorModule.convertToTreeData(jsonData, selectedTag));
    expect(pageTemplate).toEqual(codeGenerator.render());
    expect(jsonData).toEqual(constructorModule.updateChildrenText(jsonDataNoChildrenText));
    expect(jsonData).toEqual(constructorModule.copyObject(jsonData));
});
