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

export default Tag;