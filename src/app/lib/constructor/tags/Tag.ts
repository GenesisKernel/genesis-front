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

import { TProtypoElement } from 'genesis/protypo';
import constructorModule from 'lib/constructor';
import resolveTagHandler from 'lib/constructor/tags';
import getParamName, { getTailTagName } from 'lib/constructor/tags/params';

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
                    if (typeof value === 'string') {
                        const quote = value.indexOf(',') >= 0;
                        params.push(this.attr[attr] + ': ' + (quote ? '"' : '') + value + (quote ? '"' : ''));
                    }
                    if (typeof value === 'object') {
                        params.push(this.getParamsStr(this.attr[attr], value));
                    }
                }
            }
        }

        let body = this.renderChildren(this.element.children, this.offset);
        if (this.element.children && this.element.children.length === 1) {
            params.push('Body:\n' + body);
        }

        result += params.join(', ');
        result += ((this.element.children && this.element.children.length === 1) ? ('\n' + this.renderOffset()) : '') + ')';

        if (this.element.tail && this.element.tail.length) {
            result += this.element.tail.map((element) => {
                const tagName = getTailTagName(element.tag);
                if (tagName) {
                    let attrs: string[] = [];
                    for (let attr in element.attr) {
                        if (element.attr.hasOwnProperty(attr)) {
                            const val = element.attr[attr];
                            const quote = val.indexOf(',') >= 0;
                            attrs.push(getParamName(attr) + ': ' + (quote ? '"' : '') + val + (quote ? '"' : ''));
                        }
                    }
                    const children = this.renderChildren(element.children, this.offset);
                    return '.' + tagName + '(' + attrs.join(', ') + ')' + (children ? ('{\n' + children + '\n' + this.renderOffset() + '}') : '');
                }
                return '';
            }).join('');
        }

        if (this.element.children && this.element.children.length > 1) {
            result += ' {\n' + body + '\n' + this.renderOffset() + '}';
        }

        return this.renderOffset() + result;
    }

    renderChildren(children: TProtypoElement[], offset: number): string {
        if (!children) {
            return '';
        }
        let result = children.map((element, index) => {
            switch (element.tag) {
                case 'text':
                    return this.renderOffset() + ' ' + element.text;
                default:
                    const Handler = resolveTagHandler(element.tag);
                    if (Handler) {
                        let tag = new Handler(element);
                        tag.setOffset(offset + 1);
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
            id: constructorModule.generateId(),
            children: this.generateTextElement ? [{
                tag: 'text',
                text: text,
                id: constructorModule.generateId()
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

export default Tag;