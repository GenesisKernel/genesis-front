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

import { TProtypoElement } from 'genesis/protypo';
import { idGenerator } from 'lib/constructor';
import resolveTagHandler from 'lib/constructor/tags';
import Tag from './Tag';

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

        let body = this.renderChildren(this.element.children, this.offset);
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
                    tag.setOffset(this.offset);
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
            id: idGenerator.generateId(),
            attr: {
                condition: '#value#'
            },
            children: [],
            tail: [
                {
                    tag: 'else',
                    id: idGenerator.generateId(),
                    children: []
                }
            ]
        };
    }
}

export default If;