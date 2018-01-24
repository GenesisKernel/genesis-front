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

import { IProtypoElement } from 'components/Protypo/Protypo';
import { findDOMNode } from 'react-dom';
import * as _ from 'lodash';

let findTagByIdResult: {
    el: any;
    parent: any,
    parentPosition: number
} = {
    el: null,
    parent: null,
    parentPosition: 0
};

export const findTagById = (el: any, id: string): any => {
    findTagByIdResult.el = null;
    findNextTagById(el, id, null);
    return findTagByIdResult;
};

const findNextTagById = (el: any, id: string, parent: any): any => {
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
            findNextTagById(el[i], id, parent);
        }
    }
    if (findTagByIdResult.el) {
        return;
    }
    if (el.children) {
        findNextTagById(el.children, id, el);
    }
};

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
    }
}

let onPasteStripFormattingIEPaste: boolean = false;

export function OnPasteStripFormatting(elem: any, e: any) {
    let text: string;
    if (e.originalEvent &&  e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
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
                if (item.children.length === 1 && item.children[0] && item.children[0].tag === 'text') {
                    subtitle = _.truncate(item.children[0].text, {
                        'length': 24,
                        'separator': /,? +/
                    });
                }
                else {
                    children = convertToTreeData(item.children, selectedTag);
                }
            }

            let selected = false;
            if (selectedTag && selectedTag.id === item.id) {
                selected = true;
            }

            let treeItem = {
                title: (item.tag !== 'text') ? item.tag : '',
                subtitle: subtitle,
                children: children,
                expanded: true,
                id: item.id,
                selected: selected
            };
            result.push(treeItem);
        }

    }
    return result;
}

class Tag {
    protected element: IProtypoElement;
    protected tagName: string = 'Tag';
    protected canHaveChildren: boolean = true;

    protected attr: any = {
        'class': 'Class'
    };

    constructor(element: IProtypoElement) {
        this.element = element;
    }
    renderCode(): string {
        let result: string = this.tagName + '(';
        let params = [];
        for (let attr in this.attr) {
            if (this.attr.hasOwnProperty(attr)) {
                params.push(this.attr[attr] + ': ' + (this.element && this.element.attr && this.element.attr[attr] || ''));
            }
        }

        let body = this.renderChildren();
        if (body.length > 0) {
           params.push('Body: ' + body);
        }
        result += params.join(', ');
        result += ')';
        if (this.element && this.element.attr) {
            if (this.element.attr.style) {
                result += '.Style(' + this.element.attr.style + ')';
            }
        }
        return result + ' ';
    }
    renderChildren(): string {
        if (!this.element.children) {
            return '';
        }
        let result = this.element.children.map((element, index) => {
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

        if (result.length > 0) {
            return result;
        }

        return '';
    }
    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            children: [{
                tag: 'text',
                text: text,
                id: generateId()
            }]
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
        for (let param of obj) {
            paramsArr.push(param.Name + '=' + param.Title);
        }
        return name + ': ' + '"' + paramsArr.join(',') + '"';
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
}

class Button extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Button';
        this.canHaveChildren = true;
        this.attr = {
            'class': 'Class',
            'page': 'Page',
            'contract': 'Contract'
        };
    }

    renderCode(): string {
        let result: string = this.tagName + '(';
        let params = [];
        for (let attr in this.attr) {
            if (this.attr.hasOwnProperty(attr)) {
                params.push(this.attr[attr] + ': ' + (this.element && this.element.attr && this.element.attr[attr] || ''));
            }
        }
        let body = this.renderChildren();
        if (body.length > 0) {
            params.push('Body: ' + body);
        }
        if (this.element && this.element.attr) {
            if (this.element.attr.params) {
                params.push(this.getParamsStr('Params', this.element.attr.params));
            }
            if (this.element.attr.pageparams) {

                params.push(this.getParamsStr('PageParams', this.element.attr.pageparams));

            }
        }

        result += params.join(', ');
        result += ')';
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

        return result + ' ';
    }
}

class P extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'P';
    }
}

class Div extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Div';
    }
}

class Span extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Span';
    }
}

class Strong extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Strong';
    }
}

class Em extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Em';
    }
}

class Form extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Form';
    }
}

class Label extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Label';
    }
}

class Table extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Table';
        this.canHaveChildren = false;
        this.attr = {
            'source': 'Source'
        };
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                source: 'keysStr',
                columns: [
                    {
                        Name: 'id',
                        Title: 'KEY_ID'
                    },
                    {
                        Name: 'amount',
                        Title: 'MONEY'
                    }
                ]
            }
        };
    }

    renderCode(): string {
        let result: string = this.tagName + '(';
        let params = [];

        for (let attr in this.attr) {
            if (this.attr.hasOwnProperty(attr)) {
                params.push(this.attr[attr] + ': ' + (this.element && this.element.attr && this.element.attr[attr] || ''));
            }
        }

        if (this.element && this.element.attr) {
            if (this.element.attr.columns) {
                params.push(this.getParamsArrStr('Columns', this.element.attr.columns));
            }
        }

        result += params.join(', ');
        result += ')';
        if (this.element && this.element.attr) {
            if (this.element.attr.style) {
                result += '.Style(' + this.element.attr.style + ')';
            }
        }

        return result + ' ';
    }
}

class Image extends Tag {
    constructor(element: IProtypoElement) {
        super(element);
        this.tagName = 'Image';
        this.canHaveChildren = false;
        this.attr = {
            'source': 'Source',
            'src': 'Src',
            'alt': 'Alt'
        };
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                alt: 'Image',
                src: 'https://i0.wp.com/richtopia.com/wp-content/uploads/2016/12/Women-Business-CEOs-Executives-in-the-Workplace-Statistics-Infographic-female-entrepreneurs.jpg?fit=990%2C606&ssl=1'
            }
        };
    }

    renderCode(): string {
        let result: string = this.tagName + '(';
        let params = [];
        for (let attr in this.attr) {
            if (this.attr.hasOwnProperty(attr)) {
                params.push(this.attr[attr] + ': ' + (this.element && this.element.attr && this.element.attr[attr] || ''));
            }
        }
        let body = this.renderChildren();
        if (body.length > 0) {
            params.push('Body: ' + body);
        }
        result += params.join(', ');
        result += ')';
        if (this.element && this.element.attr) {
            if (this.element.attr.style) {
                result += '.Style(' + this.element.attr.style + ')';
            }
        }
        return result + ' ';
    }
}

class ImageInput extends Tag {
    constructor(element: IProtypoElement) {
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

    renderCode(): string {
        let result: string = this.tagName + '(';
        let params = [];
        for (let attr in this.attr) {
            if (this.attr.hasOwnProperty(attr)) {
                params.push(this.attr[attr] + ': ' + (this.element && this.element.attr && this.element.attr[attr] || ''));
            }
        }
        let body = this.renderChildren();
        if (body.length > 0) {
            params.push('Body: ' + body);
        }

        result += params.join(', ');
        result += ')';
        if (this.element && this.element.attr) {
            if (this.element.attr.style) {
                result += '.Style(' + this.element.attr.style + ')';
            }
        }
        return result + ' ';
    }
}

class Input extends Tag {
    constructor(element: IProtypoElement) {
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
    }

    generateTreeJSON(text: string): any {
        return {
            tag: this.tagName.toLowerCase(),
            id: generateId(),
            attr: {
                name: 'sample image',

            }
        };
    }

    renderCode(): string {
        let result: string = this.tagName + '(';
        let params = [];
        let body = this.renderChildren();
        if (body.length > 0) {
            params.push('Body: ' + body);
        }
        for (let attr in this.attr) {
            if (this.attr.hasOwnProperty(attr)) {
                params.push(this.attr[attr] + ': ' + (this.element && this.element.attr && this.element.attr[attr] || ''));
            }
        }

        result += params.join(', ');
        result += ')';

        if (this.element && this.element.attr && this.element.attr.validate) {
            result += this.getValidationParams(this.element.attr.validate);
        }

        if (this.element && this.element.attr) {
            if (this.element.attr.style) {
                result += '.Style(' + this.element.attr.style + ')';
            }
        }
        return result + ' ';
    }
}

export class CodeGenerator {
    private elements: IProtypoElement[];
    constructor(elements: IProtypoElement[]) {
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
//     'dbfind': DBFind,
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
//     'radiogroup': RadioGroup,
//     'select': Select,
    'span': Span,
    'strong': Strong,
    'table': Table
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
        }
    };

    public getInitial(property: string, tag: any) {
        // alert('getInitial ' + property + (tag && tag.attr && tag.attr.class));
        if (tag && tag.attr && tag.attr.class) {
            if (this.propertiesClasses[property]) {
                for (let value in this.propertiesClasses[property]) {
                    if (this.propertiesClasses[property].hasOwnProperty(value)) {
                        if (tag.attr.class.indexOf(this.propertiesClasses[property][value]) >= 0) {
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
                for (let prop in this.propertiesClasses[property]) {
                    if (this.propertiesClasses[property].hasOwnProperty(prop)) {
                        classes = classes.replace(this.propertiesClasses[property][prop], '');
                    }
                }
                if (this.propertiesClasses[property][value]) {
                    classes += ' ' + this.propertiesClasses[property][value];
                }
                break;
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
    return tagHandlers[name];
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
        tagObj = new Handler();
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

let hoverTimer: any = null;

export function startHoverTimer() {
    if (hoverTimer) {
        return false;
    }
    hoverTimer = setTimeout(() => { hoverTimer = null; }, 200);
    return true;
}

export default findTagById;