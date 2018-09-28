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

declare const window: Window & { clipboardData: any };
import { idGenerator } from 'lib/constructor';
import { TProtypoElement } from 'genesis/protypo';

export function isSimpleBody(body: string): boolean {
    return typeof body === 'string' && body.indexOf('(') === -1;
}

export function quoteValueIfNeeded(value: string): string {
    const quote = value.indexOf(',') >= 0;
    return (quote ? '"' : '') + value + (quote ? '"' : '');
}

export function getParamsStr(name: string, obj: Object) {
    let paramsArr = [];
    for (let param in obj) {
        if (obj.hasOwnProperty(param)) {
            paramsArr.push(param + '=' + (obj[param] && obj[param].text || ''));
        }
    }
    return name + ': ' + '"' + paramsArr.join(',') + '"';
}

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
}

function clearHtml(text: string): string {
    return text.replace(/&nbsp;/g, '');
}

interface IHtmlJsonNode {
    node: string;
    tag?: string;
    text?: string;
    attr?: { [key: string]: any };
    child?: IHtmlJsonNode[];
}

function htmlJson2ProtypoElement(node: IHtmlJsonNode, index: number) {
    switch (node.node) {
        case 'text':
            if (index === 0) {
                return {
                    tag: 'text',
                    text: clearHtml(node.text),
                    id: idGenerator.generateId()
                };
            }
            else {
                return {
                    tag: 'span',
                    id: idGenerator.generateId(),
                    children: [{
                        tag: 'text',
                        text: clearHtml(node.text),
                        id: idGenerator.generateId()
                    }]
                };
            }
        case 'element':
            return generateProtypoElement(node);
        default:
            return null;
    }
}

function getProtypoElement(tag: string, className: string, nodes: IHtmlJsonNode[]) {
    return {
        tag,
        id: idGenerator.generateId(),
        attr: {
            className: className
        },
        children: htmlJsonChild2childrenTags(nodes)
    };
}

function generateProtypoElement(node: IHtmlJsonNode) {
    const className = node.attr && node.attr.class && node.attr.class.join(' ') || '';
    switch (node.tag) {
        case 'p':
            return getProtypoElement(node.tag, className, node.child);
        case 'i':
            return getProtypoElement('em', className, node.child);
        case 'b':
        case 'strong':
            return getProtypoElement('strong', className, node.child);
        case 'span':
            return getProtypoElement('span', className, node.child);
        default:
            return null;
    }
}

export function htmlJsonChild2childrenTags(nodes: IHtmlJsonNode[]): TProtypoElement[] {
    let children = [];
    let i = 0;

    for (const node of nodes || []) {
        const el = htmlJson2ProtypoElement(node, i);
        if (el) {
            children.push(el);
        }
        i++;
    }

    return children;
}

export function stripNewlineTags(html: string): string {
    let result = html.replace(/<br>|<div>/g, ' ');
    return result.replace(/<\/div>/g, '');
}