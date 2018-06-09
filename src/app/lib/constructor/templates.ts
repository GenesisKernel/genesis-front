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

import { copyObject, idGenerator, setIds } from 'lib/constructor';

const constructorTemplates: any = {
    'formWithHeader': {
        tag: 'div',
        attr: {
            'class': 'panel panel-primary'
        },
        children: [
            {
                tag: 'div',
                attr: {
                    'class': 'panel-heading'
                },
                children: [
                    {
                        tag: 'text',
                        text: 'Money transfer'
                    }
                ]
            },
            {
                tag: 'form',
                children: [
                    {
                        tag: 'div',
                        attr: {
                            'class': 'list-group-item'
                        },
                        children: [
                            {
                                tag: 'div',
                                attr: {
                                    'class': 'row df f-valign'
                                },
                                children: [
                                    {
                                        tag: 'div',
                                        attr: {
                                            'class': 'col-md-3 mt-sm text-right'
                                        },
                                        children: [
                                            {
                                                tag: 'label',
                                                children: [
                                                    {
                                                        tag: 'text',
                                                        text: 'Input1'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        attr: {
                                            'class': 'col-md-9 mc-sm text-left'
                                        },
                                        children: [
                                            {
                                                tag: 'input',
                                                attr: {
                                                    class: 'form-control',
                                                    name: 'Input3',
                                                    type: 'text'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attr: {
                            'class': 'list-group-item'
                        },
                        children: [
                            {
                                tag: 'div',
                                attr: {
                                    'class': 'row df f-valign'
                                },
                                children: [
                                    {
                                        tag: 'div',
                                        attr: {
                                            'class': 'col-md-3 mt-sm text-right'
                                        },
                                        children: [
                                            {
                                                tag: 'label',
                                                children: [
                                                    {
                                                        tag: 'text',
                                                        text: 'Input2'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        attr: {
                                            'class': 'col-md-9 mc-sm text-left'
                                        },
                                        children: [
                                            {
                                                tag: 'input',
                                                attr: {
                                                    class: 'form-control',
                                                    name: 'Input3',
                                                    type: 'text'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attr: {
                            'class': 'list-group-item'
                        },
                        children: [
                            {
                                tag: 'div',
                                attr: {
                                    'class': 'row df f-valign'
                                },
                                children: [
                                    {
                                        tag: 'div',
                                        attr: {
                                            'class': 'col-md-3 mt-sm text-right'
                                        },
                                        children: [
                                            {
                                                tag: 'label',
                                                children: [
                                                    {
                                                        tag: 'text',
                                                        text: 'Input3'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        attr: {
                                            'class': 'col-md-9 mc-sm text-left'
                                        },
                                        children: [
                                            {
                                                tag: 'input',
                                                attr: {
                                                    class: 'form-control',
                                                    name: 'Input3',
                                                    type: 'text'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attr: {
                            'class': 'panel-footer text-right'
                        },
                        children: [
                            {
                                tag: 'button',
                                attr: {
                                    'class': 'btn btn-primary',
                                    contract: 'ContractName'
                                },
                                children: [
                                    {
                                        tag: 'text',
                                        text: 'Send'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
    ,
    'tableWithHeader': {
        tag: 'div',
        attr: {
            'class': 'panel panel-primary'
        },
        children: [
            {
                tag: 'div',
                attr: {
                    'class': 'panel-heading'
                },
                children: [
                    {
                        tag: 'text',
                        text: 'Table block'
                    }
                ]
            },
            {
                tag: 'table',
                attr: {
                    source: 'test_key'
                }
            },
            {
                tag: 'div',
                attr: {
                    'class': 'panel-footer text-right'
                },
                children: [
                    {
                        tag: 'button',
                        attr: {
                            'class': 'btn btn-primary',
                            contract: 'ContractName'
                        },
                        children: [
                            {
                                tag: 'text',
                                text: 'More'
                            }
                        ]
                    }
                ]
            }
        ]
    }
    ,
    'searchForm': {
        tag: 'div',
        attr: {
            'class': 'panel panel-primary'
        },
        children: [
            {
                tag: 'form',
                children: [
                    {
                        tag: 'div',
                        attr: {
                            'class': 'list-group-item'
                        },
                        children: [
                            {
                                tag: 'div',
                                attr: {
                                    'class': 'row df f-valign'
                                },
                                children: [
                                    {
                                        tag: 'div',
                                        attr: {
                                            'class': 'col-md-1 mt-sm text-right'
                                        },
                                        children: [
                                            {
                                                tag: 'label',
                                                attr: {
                                                    'for': 'Search'
                                                },
                                                children: [
                                                    {
                                                        tag: 'span',
                                                        children: [
                                                            {
                                                                tag: 'text',
                                                                text: 'name'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        attr: {
                                            'class': 'col-md-11 mc-sm'
                                        },
                                        children: [
                                            {
                                                tag: 'div',
                                                attr: {
                                                    'class': 'input-group'
                                                },
                                                children: [
                                                    {
                                                        tag: 'input',
                                                        attr: {
                                                            class: 'form-control',
                                                            name: 'Search',
                                                            type: 'text',
                                                            value: '#v_Search#'
                                                        }
                                                    },
                                                    {
                                                        tag: 'div',
                                                        attr: {
                                                            'class': 'input-group-btn'
                                                        },
                                                        children: [
                                                            {
                                                                tag: 'button',
                                                                attr: {
                                                                    'class': 'btn btn-default',
                                                                    page: 'roles_list',
                                                                    pageparams: {
                                                                        isSearch: {
                                                                            text: '1',
                                                                            type: 'text'
                                                                        },
                                                                        v_Search: {
                                                                            params: [
                                                                                'Search'
                                                                            ],
                                                                            type: 'Val'
                                                                        }
                                                                    }
                                                                },
                                                                children: [
                                                                    {
                                                                        tag: 'em',
                                                                        attr: {
                                                                            'class': 'fa fa-search'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attr: {
                            'class': 'list-group-item'
                        },
                        children: [
                            {
                                tag: 'table',
                                attr: {
                                    columns: '$id$=custom_id,$name$=custom_name,$type$=custom_type,$created$ / $deleted$=custom_date,$status$=custom_status,$creator$=custom_creator,$actions$=actions',
                                    source: 'src_roles_list'
                                }
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attr: {
                            'class': 'panel-footer clearfix'
                        },
                        children: [
                            {
                                tag: 'div',
                                attr: {
                                    'class': 'pull-right'
                                },
                                children: [
                                    {
                                        tag: 'button',
                                        attr: {
                                            'class': 'btn btn-primary',
                                            page: 'roles_create'
                                        },
                                        children: [
                                            {
                                                tag: 'text',
                                                text: 'create'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    'radioPanel': {
        tag: 'form',
        attr: {
            'class': 'panel panel-primary'
        },
        children: [
            {
                tag: 'div',
                attr: {
                    'class': 'panel-heading'
                },
                children: [
                    {
                        tag: 'div',
                        attr: {
                            'class': 'panel-title'
                        },
                        children: [
                            {
                                tag: 'text',
                                text: 'Payment'
                            }
                        ]
                    }
                ]
            },
            {
                tag: 'div',
                attr: {
                    'class': 'panel-body'
                },
                children: [
                    {
                        tag: 'div',
                        attr: {
                            'class': 'form-group'
                        },
                        children: [
                            {
                                tag: 'label',
                                children: [
                                    {
                                        tag: 'text',
                                        text: 'Payment methods'
                                    }
                                ]
                            },
                            {
                                tag: 'radiogroup',
                                attr: {
                                    name: 'Payments',
                                    namecolumn: 'type',
                                    source: 'payment',
                                    value: '#value_payment_method#',
                                    valuecolumn: 'id'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                tag: 'div',
                attr: {
                    'class': 'panel-footer text-center'
                },
                children: [
                    {
                        tag: 'button',
                        attr: {
                            alert: {
                                text: 'Select the payment method'
                            },
                            'class': 'btn btn-default mr-lg',
                            contract: 'ContractName'
                        },
                        children: [
                            {
                                tag: 'text',
                                text: 'Cancel'
                            }
                        ]
                    },
                    {
                        tag: 'button',
                        attr: {
                            'class': 'btn btn-primary',
                            contract: 'ContractName',
                            page: 'proof_payment'
                        },
                        children: [
                            {
                                tag: 'text',
                                text: 'Payment'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default function getConstructorTemplate(name: string) {
    let template = copyObject(constructorTemplates[name]);
    template.id = idGenerator.generateId();
    if (template.children) {
        setIds(template.children, true);
    }
    return template;
}