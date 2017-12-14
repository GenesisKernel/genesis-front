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

let findTagByIdResult = null;

export const findTagById = (el: any, id: string): any => {
    findTagByIdResult = null;
    findNextTagById(el, id);
    return findTagByIdResult;
};

const findNextTagById = (el: any, id: string): any => {
    if (el.id === id) {
        findTagByIdResult = el;
    }
    if (el instanceof Array) {
        for (var i = 0; i < el.length; i++) {
            findNextTagById(el[i], id);
        }
    }
    if (el.children) {
        findNextTagById(el.children, id);
    }
};

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

class Tag {
    private element: IProtypoElement;
    protected tagName: string = 'Tag';
    constructor(element: IProtypoElement) {
        this.element = element;
    }
    renderCode(): string {
        let result: string = this.tagName + '(';
        let params = [];
        params.push('Class: ' + (this.element && this.element.attr && this.element.attr.class || ''));
        let body = this.renderChildren();
        if (body.length > 0) {
           params.push('Body: ' + body);
        }
        result += params.join(', ');
        result += ')';
        if (this.element && this.element.attr && this.element.attr.style) {
            result += '.Style(' + this.element.attr.style + ')';
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
//     'button': Button,
//     'data': Data,
//     'dbfind': DBFind,
    'div': Div,
//     'em': Em,
//     'forlist': ForList,
//     'form': Form,
//     'image': Image,
//     'imageinput': ImageInput,
//     'input': Input,
//     'inputerr': InputErr,
//     'label': Label,
//     'linkpage': LinkPage,
//     'menuitem': MenuItem,
//     'menugroup': MenuGroup,
    'p': P,
//     'radiogroup': RadioGroup,
//     'select': Select,
    'span': Span,
    'strong': Strong,
//     'table': Table
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

        return classes;
    }
}

export const getInitialTagValue = (prop: string, tag: any): string => {
    let properties = new Properties();
    return properties.getInitial(prop, tag);
};

const resolveTagHandler = (name: string) => {
    return tagHandlers[name];
};

let hoverTimer: number = null;

export function startHoverTimer() {
    if (hoverTimer) {
        return false;
    }
    hoverTimer = setTimeout(() => { hoverTimer = null }, 200);
    return true;
}


export default findTagById;