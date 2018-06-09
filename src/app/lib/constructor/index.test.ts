// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
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

import CodeGenerator, { findTagById, convertToTreeData, updateChildrenText, copyObject } from 'lib/constructor';
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
    const codeGenerator = new CodeGenerator(jsonData);

    expect(foundTag).toEqual(findTagById(jsonData, 'tag_27384336'));
    expect(treeData).toEqual(convertToTreeData(jsonData, selectedTag));
    expect(pageTemplate).toEqual(codeGenerator.render());
    expect(jsonData).toEqual(updateChildrenText(jsonDataNoChildrenText));
    expect(jsonData).toEqual(copyObject(jsonData));
});
