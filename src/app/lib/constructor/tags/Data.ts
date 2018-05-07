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
import Tag from './Tag';
import getParamName, { getTailTagName } from 'lib/constructor/tags/params';

class Data extends Tag {
    constructor(element: TProtypoElement) {
        super(element);
        this.tagName = 'Data';
        this.logic = true;
        this.canHaveChildren = true;
        this.attr = {
            'source': 'Source',
            'columns': 'Columns'
        };
        this.editProps = ['source', 'columns', 'data'];
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

        result += params.join(', ');
        result += ((this.element.children && this.element.children.length === 1) ? ('\n' + this.renderOffset()) : '') + ')';

        if (this.element && this.element.attr && this.element.attr.data) {
            result += '{\n'
                + this.renderOffset() + '   '
                + this.element.attr.data
                + '\n'
                + this.renderOffset()
                + '}';
        }

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

        if (this.element.children && this.element.children.length > 0) {
            result += ' {\n' + body + '\n' + this.renderOffset() + '}';
        }

        return this.renderOffset() + result;
    }
}

export default Data;