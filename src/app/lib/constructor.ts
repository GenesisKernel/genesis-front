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

// tslint:disable
import { findDOMNode } from 'react-dom';
import { TProtypoElement } from 'genesis/protypo';
import * as _ from 'lodash';
import { html2json } from 'html2json';

let findTagByIdResult: {
    el: any;
    parent: any,
    parentPosition: number,
    tail: boolean
} = {
        el: null,
        parent: null,
        parentPosition: 0,
        tail: false
    };

export const findTagById = (el: any, id: string): any => {
    findTagByIdResult.el = null;
    findNextTagById(el, id, null, false);
    return findTagByIdResult;
};

const findNextTagById = (el: any, id: string, parent: any, tail: boolean): any => {
    if (el.id === id) {
        findTagByIdResult.el = el;
        return;
    }
    if (el instanceof Array) {
        for (var i = 0; i < el.length; i++) {
            if (findTagByIdResult.el) {
                break;
            }
            findTagByIdResult.parent = parent;
            findTagByIdResult.parentPosition = i;
            findTagByIdResult.tail = tail;
            findNextTagById(el[i], id, parent, false);
        }
    }
    if (findTagByIdResult.el) {
        return;
    }
    if (el.children) {
        findNextTagById(el.children, id, el, false);
    }
    if (el.tail) {
        findNextTagById(el.tail, id, el, true);
    }
};

// todo: copyArray, copyObject

export function copyObject(item: any) {
    let result: any = null;
    if (!item) {
        return result;
    }
    if (Array.isArray(item)) {
        result = item.map(copyObject);
        // result = [];
        // item.forEach(element => {
        //     result.push(copyObject(element));
        // });
    }
    else {
        if (item instanceof Object && !(item instanceof Function)) {
            result = {};
            for (let key in item) {
                if (key) {
                    result[key] = copyObject(item[key]);
                }
            }
        }
    }
    return result || item;
}

export function generateId() {
    return 'tag_' + (10000000 + Math.floor(Math.random() * 89999999));
}

export function setIds(children: any[], force: boolean = false) {
    for (let tag of children) {
        if (!tag) {
            continue;
        }
        if (!tag.id || force) {
            tag.id = generateId();
        }
        if (tag.children) {
            setIds(tag.children, force);
        }
        if (tag.tail) {
            setIds(tag.tail, force);
        }
    }
}

let onPasteStripFormattingIEPaste: boolean = false;

export function OnPasteStripFormatting(elem: any, e: any) {
    let text: string;
    if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
        e.preventDefault();
        text = e.originalEvent.clipboardData.getData('text/plain');
        window.document.execCommand('insertText', false, text);
    }
    else if (e.clipboardData && e.clipboardData.getData) {
        e.preventDefault();
        text = e.clipboardData.getData('text/plain');
        window.document.execCommand('insertText', false, text);
    }
    else if (window['clipboardData'] && window['clipboardData'].getData) {
        // Stop stack overflow
        if (!onPasteStripFormattingIEPaste) {
            onPasteStripFormattingIEPaste = true;
            e.preventDefault();
            window.document.execCommand('ms-pasteTextOnly', false);
        }
        onPasteStripFormattingIEPaste = false;
    }
}

export function convertToTreeData(data: any, selectedTag?: any): any {
    let result = [];
    if (data instanceof Array) {
        for (const item of data) {
            let children = null;
            let subtitle = item.text;
            if (item.children) {
                if (item.children.length && item.children[0] && item.children[0].tag === 'text') {
                    subtitle = _.truncate(item.children[0].text, {
                        'length': 24,
                        'separator': /,? +/
                    });
                    if (item.children.length > 1) {
                        children = convertToTreeData([...item.children.slice(1)], selectedTag);
                    }
                }
                else {
                    children = convertToTreeData(item.children, selectedTag);
                }
            }

            if (item.tail) {
                if (!children) {
                    children = [];
                }

                const tail = convertToTreeData(item.tail, selectedTag);

                let tailTreeItem = {
                    // title: ((item.tag !== 'text') ? item.tag : '') + ' ' + (subtitle ? subtitle : ''),
                    title: '...',
                    children: tail,
                    expanded: true,
                    id: '',
                    selected: false,
                    logic: true,
                    tag: '',
                    canMove: false,
                    canDrop: false
                };

                children.push(tailTreeItem);
            }

            let selected = false;
            if (selectedTag && selectedTag.id === item.id) {
                selected = true;
            }

            const Handler = resolveTagHandler(item.tag);
            if (Handler) {
                const tagObj = new Handler(item);
                let treeItem = {
                    // title: ((item.tag !== 'text') ? item.tag : '') + ' ' + (subtitle ? subtitle : ''),
                    title: item.tag + (subtitle ? (': ' + subtitle) : ''),
                    // subtitle: subtitle,
                    children: children,
                    expanded: true,
                    id: item.id,
                    selected: selected,
                    logic: tagObj.isLogic(),
                    canMove: tagObj.canMove,
                    canDrop: tagObj.canHaveChildren,
                    tag: item
                };
                result.push(treeItem);
            }
        }
    }
    return result;
}

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
                                    /*columns: [
                                        {
                                            Name: 'custom_id',
                                            Title: '$id$'
                                        },
                                        {
                                            Name: 'custom_name',
                                            Title: '$name$'
                                        },
                                        {
                                            Name: 'custom_type',
                                            Title: '$type$'
                                        },
                                        {
                                            Name: 'custom_date',
                                            Title: '$created$ / $deleted$'
                                        },
                                        {
                                            Name: 'custom_status',
                                            Title: '$status$'
                                        },
                                        {
                                            Name: 'custom_creator',
                                            Title: '$creator$'
                                        },
                                        {
                                            Name: 'actions',
                                            Title: '$actions$'
                                        }
                                    ],*/
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

export function getConstructorTemplate(name: string) {
    let template = _.cloneDeep(constructorTemplates[name]);
    template.id = generateId();
    if (template.children) {
        setIds(template.children, true);
    }
    return template;
}

class Tag {
    protected element: TProtypoElement;
    protected tagName: string = 'Tag';
    protected HTMLTag: string = null;
    public canHaveChildren: boolean = true;
    public canMove: boolean = true;
    public canCopy: boolean = true;
    public canChangePosition: boolean = true;
    protected offset: number = 0;
    protected generateTextElement = true;
    protected logic = false;

    protected attr: any = {
        'class': 'Class'
    };

    protected editProps = ['class', 'align', 'transform', 'wrap', 'color'];

    constructor(element: TProtypoElement) {
        this.element = element;
    }
    setOffset(offset: number): void {
        this.offset = offset;
    }
    renderOffset(): string {
        return Array(this.offset + 1).join(' ');
    }
    renderCode(): string {
        let result: string = this.tagName + '(';
        let params = [];
        for (let attr in this.attr) {
            if (this.attr.hasOwnProperty(attr)) {
                let value = this.element && this.element.attr && this.element.attr[attr] || '';
                if (value) {
                    params.push(this.attr[attr] + ': ' + value);
                }
            }
        }

        let body = this.renderChildren();
        if (this.element.children && this.element.children.length === 1) {
            params.push('Body:\n' + body);
        }

        if (this.element && this.element.attr) {
            if (this.element.attr.params) {
                params.push(this.getParamsStr('Params', this.element.attr.params));
            }
            if (this.element.attr.pageparams) {
                params.push(this.getParamsStr('PageParams', this.element.attr.pageparams));
            }
            if (this.element.attr.columns) {
                params.push('Columns: "' + this.element.attr.columns + '"');
            }
        }

        result += params.join(', ');
        result += ((this.element.children && this.element.children.length === 1) ? ('\n' + this.renderOffset()) : '') + ')';

        if (this.element && this.element.attr && this.element.attr.validate) {
            result += this.getValidationParams(this.element.attr.validate);
        }

        if (this.element && this.element.attr) {
            if (this.element.attr.style) {
                result += '.Style(' + this.element.attr.style + ')';
            }
            if (this.element.attr.alert && typeof this.element.attr.alert === 'object') {
                let alertParamsArr = [];
                if (this.element.attr.alert.text) {
                    alertParamsArr.push('Text: ' + this.element.attr.alert.text);
                }
                if (this.element.attr.alert.confirmbutton) {
                    alertParamsArr.push('ConfirmButton: ' + this.element.attr.alert.confirmbutton);
                }
                if (this.element.attr.alert.cancelbutton) {
                    alertParamsArr.push('CancelButton: ' + this.element.attr.alert.cancelbutton);
                }
                if (this.element.attr.alert.icon) {
                    alertParamsArr.push('Icon: ' + this.element.attr.alert.icon);
                }
                result += '.Alert(' + alertParamsArr.join(', ') + ')';
            }
        }

        if (this.element.children && this.element.children.length > 1) {
            result += ' {\n' + body + '\n' + this.renderOffset() + '}';
        }

        return this.renderOffset() + result;
    }
    renderChildren(): string {
        if (!this.element.children) {
            return '';
        }
        let result = this.element.children.map((element, index) => {
            switch (element.tag) {
                case 'text':
                    return this.renderOffset() + ' ' + element.text;
                default:
                    const Handler = resolveTagHandler(element.tag);
                    if (Handler) {
                        let tag = new Handler(element);
                        tag.setOffset(this.offset + 1);
                        return tag.renderCode();
                    }
                    return '';
            }
        }).join('\n');

        if (result.length > 0) {
            return result;
        }

        return '';
    }
    renderHTML(): string {
        if (this.HTMLTag) {
            let result: string = '<' + this.HTMLTag;
            if (this.element.attr && (this.element.attr.class || this.element.attr.className)) {
                result += ' class="' + (this.element.attr.class ? this.element.attr.class : '') + ' ' + (this.element.attr.className ? this.element.attr.className : '') + '"';
            }
            result += '>';
            const children = this.renderHTMLChildren();
            if (children === null) {
                return null;
            }
            result += children;
            result += '</' + this.HTMLTag + '>';
            return result;
        }
        else {
            return null;
        }
    }
    renderHTMLChildren(): string {
        if (!this.element.children) {
            return '';
        }
        let resultArr = this.element.children.map((element, index) => {
            switch (element.tag) {
                case 'text':
                    return element.text;
                default:
                    const Handler = resolveTagHandler(element.tag);
                    if (Handler) {
                        let tag = new Handler(element);
                        return tag.renderHTML();
                    }
                    return '';
            }
        });

        // if any of subtags has null -> result is null
        if (resultArr.indexOf(null) !== -1) {
            return null;
        }

        const result = resultArr.join('');

        if (result.length > 0) {
            return result;
        }

        return '';
    }
    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            children: this.generateTextElement ? [{
                tag: 'text',
                text: text,
                id: generateId()
            }] : []
        };
    }

    getParamsStr(name: string, obj: Object) {
        let paramsArr = [];
        for (let param in obj) {
            if (obj.hasOwnProperty(param)) {
                paramsArr.push(param + '=' + (obj[param] && obj[param].text || ''));
            }
        }
        return name + ': ' + '"' + paramsArr.join(',') + '"';
    }

    getParamsArrStr(name: string, obj: { Name: string, Title: string }[]) {
        let paramsArr = [];
        if (name && obj) {
            for (let param of obj) {
                if (param && param.Title) {
                    paramsArr.push(param.Title + '=' + param.Name);
                }
            }
            return name + ': ' + '"' + paramsArr.join(',') + '"';
        }
        return '';
    }

    getValidationParams(obj: Object) {
        const params = {
            'minlength': 'minLength',
            'maxlength': 'maxLength'
        };
        let paramsArr = [];
        for (let param in obj) {
            if (obj.hasOwnProperty(param)) {
                paramsArr.push((params[param] || param) + ': ' + obj[param]);
            }
        }
        if (paramsArr.length) {
            return '.Validate(' + paramsArr.join(',') + ')';
        }
        return '';
    }

    getParams(obj: Object) {
        let paramsArr = [];
        for (let param in obj) {
            if (obj.hasOwnProperty(param)) {
                paramsArr.push(param + ': ' + (obj[param] || ''));
            }
        }
        return paramsArr.join(',');
    }

    getCanHaveChildren() {
        return this.canHaveChildren;
    }

    hasEditProp(prop: string): boolean {
        return this.editProps.indexOf(prop) !== -1;
    }

    isLogic(): boolean {
        return this.logic;
    }
}

class Button extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Button';
        this.canHaveChildren = true;
        this.attr = {
            'class': 'Class',
            'page': 'Page',
            'contract': 'Contract'
        };
        this.editProps = ['class', 'btn', 'align', 'transform', 'wrap'];
    }
}

class P extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'P';
        this.HTMLTag = 'p';
    }
}

class Div extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Div';
        this.HTMLTag = 'div';
        this.generateTextElement = false;
    }
}

class Span extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Span';
        this.HTMLTag = 'span';
    }
}

class Strong extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Strong';
        this.HTMLTag = 'b';
    }
}

class Em extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Em';
        this.HTMLTag = 'i';
    }
}

class Form extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Form';
        this.generateTextElement = false;
    }
}

class Label extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Label';
    }
}

class Table extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Table';
        this.canHaveChildren = false;
        this.attr = {
            'source': 'Source'
        };
        this.editProps = ['class'];
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                source: 'keysStr',
                columns: 'KEY_ID=id,MONEY=amount'
            }
        };
    }
}

class Image extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Image';
        this.canHaveChildren = false;
        this.attr = {
            'source': 'Source',
            'src': 'Src',
            'alt': 'Alt'
        };
        this.editProps = ['class', 'src', 'alt'];
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                alt: 'Image',
                src: '/img/dummy.png'
            }
        };
    }
}

class ImageInput extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'ImageInput';
        this.canHaveChildren = false;
        this.attr = {
            'class': 'Class',
            'format': 'Format',
            'name': 'Name',
            'ratio': 'Ratio',
            'width': 'Width'
        };
        this.editProps = ['class', 'ratio', 'width'];
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                format: 'jpg',
                name: 'sample image',
                ratio: '2/1',
                width: '100'
            }
        };
    }
}

class Input extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Input';
        this.canHaveChildren = false;
        this.attr = {
            'class': 'Class',
            'name': 'Name',
            'placeholder': 'Placeholder',
            'type': 'Type',
            'value': 'Value'
        };
        this.editProps = ['class', 'align', 'transform', 'wrap'];
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                name: 'sample input',
                class: 'form-control'
            }
        };
    }
}

class RadioGroup extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'RadioGroup';
        this.canHaveChildren = false;
        this.attr = {
            'name': 'Name',
            'source': 'Source',
            'namecolumn': 'NameColumn',
            'valuecolumn': 'ValueColumn',
            'value': 'Value',
            'class': 'Class'
        };
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                name: 'name'
            }
        };
    }
}

class DBFind extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'DBFind';
        this.canHaveChildren = false;
        this.logic = true;
        this.attr = {
            'name': 'Name',
            'source': 'Source'
        };
        this.editProps = ['name', 'source'];
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                name: 'name',
                source: 'source'
            }
        };
    }
}

class If extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'If';
        this.canHaveChildren = true;
        this.logic = true;
        this.attr = {
            'condition': 'Condition'
        };
        this.editProps = ['condition'];
    }

    renderCode(): string {
        let result: string = this.tagName + '(';

        if (this.element && this.element.attr && this.element.attr.condition) {
            result += this.element.attr.condition;
        }
        result += ')';

        let body = this.renderChildren();
        result += '{\n';
        if (this.element.children && this.element.children.length) {
            result += body + '\n' + this.renderOffset();
        }
        result += '}';

        if (this.element.tail && this.element.tail.length) {
            result += this.element.tail.map((element, index) => {
                const TailHandler = resolveTagHandler(element.tag);
                if (TailHandler) {
                    let tag = new TailHandler(element);
                    // tag.setOffset(this.offset + 1);
                    return tag.renderCode();
                }
                return '';
            }).join('');
        }

        return this.renderOffset() + result;
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                condition: '#value#'
            },
            children: [],
            tail: [
                {
                    tag: 'else',
                    id: generateId(),
                    children: []
                }
            ]
        };
    }
}

class ElseIf extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'ElseIf';
        this.canHaveChildren = true;
        this.canMove = false;
        this.canCopy = false;
        this.canChangePosition = false;
        this.logic = true;
        this.attr = {
            'condition': 'Condition'
        };
        this.editProps = ['condition'];
    }

    renderCode(): string {
        let result: string = '.' + this.tagName + '(';

        if (this.element && this.element.attr && this.element.attr.condition) {
            result += this.element.attr.condition;
        }

        result += ')';

        let body = this.renderChildren();
        result += '{\n';
        if (this.element.children && this.element.children.length) {
            result += body + '\n' + this.renderOffset();
        }
        result += '}';
        return this.renderOffset() + result;
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                condition: '#value#'
            }
        };
    }
}

class Else extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Else';
        this.canHaveChildren = true;
        this.canMove = false;
        this.canCopy = false;
        this.canChangePosition = false;
        this.logic = true;
        this.attr = {
        };
        this.editProps = [];
    }

    renderCode(): string {

        if (this.element.children && this.element.children.length === 0) {
            return '';
        }

        let result: string = '.' + this.tagName;
        result += '{\n';
        let body = this.renderChildren();

        if (this.element.children && this.element.children.length) {
            result += body + '\n' + this.renderOffset();
        }
        result += '}';
        return this.renderOffset() + result;
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId()
        };
    }
}

const LogicTagNames = {
    'getvar': 'GetVar',
    'setvar': 'SetVar',
    'addtoolbutton': 'AddToolButton',
    'linkpage': 'LinkPage',
    'and': 'And',
    'calculate': 'Calculate',
    'cmptime': 'CmpTime',
    'datetime': 'DateTime',
    'now': 'Now',
    'or': 'Or',
    'code': 'Code',
    'chart': 'Chart',
    'forlist': 'ForList',
    'menugroup': 'MenuGroup',
    'menuitem': 'MenuItem',
    'qrcode': 'QRcode',
    'address': 'Address',
    'appparam': 'AppParam',
    'data': 'Data',
    'ecosysparam': 'EcosysParam',
    'jsontosource': 'JsonToSource',
    'langres': 'LangRes',
    'range': 'Range',
    'sysparam': 'SysParam',
    'binary': 'Binary',
    'settitle': 'SetTitle',
    'inputerr': 'InputErr',
    'select': 'Select',
    'inputmap': 'InputMap',
    'map': 'Map',
    'include': 'Include'
};

class Logic extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = LogicTagNames[element.tag] || element.tag;
        this.canHaveChildren = false;
        this.logic = true;
        this.attr = {
        };
        this.editProps = [];
        for (let attr in element.attr) {
            this.attr[attr] = attr;
        }
    }
}

export class CodeGenerator {
    private elements: TProtypoElement[];
    constructor(elements: TProtypoElement[]) {
        this.elements = elements;
    }
    render(): string {
        if (!this.elements) {
            return '';
        }
        return this.elements.map((element, index) => {
            switch (element.tag) {
                case 'text':
                    return element.text;
                default:
                    const Handler = resolveTagHandler(element.tag);
                    if (Handler) {
                        let tag = new Handler(element);
                        return tag.renderCode();
                    }
                    return '';
            }
        }).join('\n');
    }
}

const tagHandlers = {
    'button': Button,
    //     'data': Data,
    'dbfind': DBFind,
    'div': Div,
    'em': Em,
    //     'forlist': ForList,
    'form': Form,
    'image': Image,
    'imageinput': ImageInput,
    'input': Input,
    //     'inputerr': InputErr,
    'label': Label,
    //     'linkpage': LinkPage,
    //     'menuitem': MenuItem,
    //     'menugroup': MenuGroup,
    'p': P,
    'radiogroup': RadioGroup,
    //     'select': Select,
    'span': Span,
    'strong': Strong,
    'table': Table,
    'if': If,
    'elseif': ElseIf,
    'else': Else
};

export class Properties {
    private propertiesClasses = {
        'align': {
            'left': 'text-left',
            'center': 'text-center',
            'right': 'text-right'
        },
        'transform': {
            'lowercase': 'text-lowercase',
            'uppercase': 'text-uppercase'
        },
        'wrap': {
            'nowrap': 'text-nowrap'
        },
        'color': {
            'muted': 'text-muted',
            'primary': 'text-primary',
            'success': 'text-success',
            'info': 'text-info',
            'warning': 'text-warning',
            'danger': 'text-danger'
        },
        'btn': {
            'default': 'btn btn-default',
            'primary': 'btn btn-primary',
            'success': 'btn btn-success',
            'info': 'btn btn-info',
            'warning': 'btn btn-warning',
            'danger': 'btn btn-danger',
            'link': 'btn btn-link',
            'basic': 'btn'
        }
    };

    public getInitial(property: string, tag: any) {
        // alert('getInitial ' + property + (tag && tag.attr && tag.attr.class));

        if (tag && tag.attr && tag.attr.class) {
            const classes = ' ' + tag.attr.class + ' ';
            if (this.propertiesClasses[property]) {
                for (let value in this.propertiesClasses[property]) {
                    if (this.propertiesClasses[property].hasOwnProperty(value)) {
                        if (classes.indexOf(' ' + this.propertiesClasses[property][value] + ' ') >= 0) {
                            return value;
                        }
                    }
                }
            }
        }
        return '';
    }

    public updateClassList(classes: string, property: string, value: string) {
        classes = classes ? classes.concat() : '';

        switch (property) {
            case 'align':
            case 'transform':
            case 'wrap':
            case 'color':
            case 'btn':
                for (let prop in this.propertiesClasses[property]) {
                    if (this.propertiesClasses[property].hasOwnProperty(prop)) {
                        classes = classes.replace(this.propertiesClasses[property][prop], '');
                    }
                }
                if (this.propertiesClasses[property][value]) {
                    classes += ' ' + this.propertiesClasses[property][value];
                }
                break;
            /*
            case 'btn':
                for (let prop in this.propertiesClasses[property]) {
                    if (this.propertiesClasses[property].hasOwnProperty(prop)) {
                        classes = classes.replace(this.propertiesClasses[property][prop], '');
                    }
                }
                classes = classes.replace('btn', '');
                if (this.propertiesClasses[property][value]) {
                    classes += ' btn ' + this.propertiesClasses[property][value];
                }
                break;
                */
            default:
                break;
        }

        return classes.replace(/\s+/g, ' ').trim();
    }
}

export const getInitialTagValue = (prop: string, tag: any): string => {
    let properties = new Properties();
    return properties.getInitial(prop, tag);
};

export const resolveTagHandler = (name: string) => {
    return tagHandlers[name] || Logic;
};

export function getDropPosition(monitor: any, component: any, tag: any) {

    // Determine rectangle on screen
    if (!findDOMNode(component)) {
        return 'after';
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const maxGap: number = 15;
    let gapX: number = hoverBoundingRect.width / 4;
    let gapY: number = hoverBoundingRect.height / 4;
    if (gapX > maxGap) {
        gapX = maxGap;
    }
    if (gapY > maxGap) {
        gapY = maxGap;
    }

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    let tagObj: any = null;
    const Handler = resolveTagHandler(tag.tag);
    if (Handler) {
        tagObj = new Handler(tag);
    }

    if (!tagObj.canChangePosition && tagObj.canHaveChildren) {
        return 'inside';
    }

    if (hoverClientY < gapY || hoverClientX < gapX) {
        return 'before';
    }

    if (hoverClientY > hoverBoundingRect.height - gapY || hoverClientX > hoverBoundingRect.width - gapX) {
        return 'after';
    }

    if (tagObj && tagObj.getCanHaveChildren()) {
        return 'inside';
    }
    return 'after';
}

function updateElementChildrenText(el: TProtypoElement) {

    if (el.children) {
        let childrenText = null;
        const Handler = resolveTagHandler(el.tag);
        if (Handler) {
            let tag = new Handler(el);
            childrenText = tag.renderHTMLChildren();
        }
        let children: TProtypoElement[] = [];
        for (let child of el.children) {
            children.push(updateElementChildrenText(child));
        }
        return {
            ...el,
            childrenText,
            children
        }
    }
    else {
        return el;
    }
}

export function updateChildrenText(tree: TProtypoElement[]): TProtypoElement[] {
    let updatedElements = [];
    if (tree && tree.length) {
        for (let el of tree) {
            updatedElements.push(updateElementChildrenText(el));
        }
        return updatedElements;
    }
    else {
        return tree;
    }
}

function html2childrenTags(html: string): TProtypoElement[] {
    const htmlJson = html2json(html);
    return htmlJsonChild2childrenTags(htmlJson.child);
}

function htmlJsonChild2childrenTags(nodes: IHtmlJsonNode[]): TProtypoElement[] {
    let children = [];
    let i = 0;
    if (nodes) {
        for (const node of nodes) {
            const el = htmlJson2ProtypoElement(node, i);
            if (el) {
                children.push(el);
            }
            i++;
        }
    }
    return children;
}

interface IHtmlJsonNode {
    node: string;
    tag?: string;
    text?: string;
    attr?: { [key: string]: any };
    child?: IHtmlJsonNode[];
};

function clearHtml(text: string): string {
    return text.replace(/&nbsp;/g, '');
}

function htmlJson2ProtypoElement(node: IHtmlJsonNode, index: number) {
    switch (node.node) {
        case 'text':
            if (index === 0) {
                return {
                    tag: 'text',
                    text: clearHtml(node.text),
                    id: generateId()
                }
            }
            else {
                return {
                    tag: 'span',
                    id: generateId(),
                    children: [{
                        tag: 'text',
                        text: clearHtml(node.text),
                        id: generateId()
                    }]
                }
            }
        case 'element':
            switch (node.tag) {
                case 'p':
                    return {
                        tag: 'p',
                        id: generateId(),
                        children: htmlJsonChild2childrenTags(node.child)
                    }
                case 'i':
                    return {
                        tag: 'em',
                        id: generateId(),
                        children: htmlJsonChild2childrenTags(node.child)
                    }
                case 'b':
                case 'strong':
                    return {
                        tag: 'strong',
                        id: generateId(),
                        children: htmlJsonChild2childrenTags(node.child)
                    }
                case 'span':
                    return {
                        tag: 'span',
                        id: generateId(),
                        children: htmlJsonChild2childrenTags(node.child)
                    }
                case 'div':
                    return {
                        tag: 'div',
                        id: generateId(),
                        children: htmlJsonChild2childrenTags(node.child)
                    }
                default:
                    break;
            }
        default:
            break;
    }
    return null;
}

let hoverTimer: any = null;

export function startHoverTimer() {
    if (hoverTimer) {
        return false;
    }
    hoverTimer = setTimeout(() => { hoverTimer = null; }, 200);
    return true;
}

export default {
    setIds,
    convertToTreeData,
    findTagById,
    copyObject,
    resolveTagHandler,
    getConstructorTemplate,
    generateId,
    updateChildrenText,
    html2childrenTags,
    CodeGenerator,
    Properties
};