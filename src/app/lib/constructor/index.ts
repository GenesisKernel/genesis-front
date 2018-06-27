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
import { IFindTagResult } from 'genesis/editor';
import * as _ from 'lodash';
import { html2json } from 'html2json';
import resolveTagHandler from 'lib/constructor/tags';
import IdGenerator from 'lib/constructor/idGenerator';
import { htmlJsonChild2childrenTags } from 'lib/constructor/helpers';
import TreeSearch from 'lib/constructor/treeSearch';

export const findTagById = (el: TProtypoElement[], id: string): IFindTagResult => {
    const treeSearch = new TreeSearch();
    return treeSearch.findTagById(el, id);
};

// todo: copyArray, copyObject

function copyObjectInstance(item: any) {
    let result = null;
    if (item instanceof Object && !(item instanceof Function)) {
        result = {};
        for (const key of Object.keys(item)) {
        // for (let key in item) {
            result[key] = copyObject(item[key]);
        }
    }
    return result;
}

export function copyObject(item: any) {
    let result: any = null;
    if (!item) {
        return result;
    }
    if (Array.isArray(item)) {
        result = item.map(copyObject);
    }
    else {
        result = copyObjectInstance(item);
    }
    return result || item;
}

export const idGenerator = new IdGenerator();

function setId(tag: any, force: boolean) {
    if (force) {
        tag.id = idGenerator.generateId();
    }
    else {
        tag.id = tag.id || idGenerator.generateId();
    }
}

export function setIds(children: any[], force: boolean = false) {
    for (let tag of children) {
        if (!tag) {
            continue;
        }
        setId(tag, force);
        setIds(tag.children || [], force);
        setIds(tag.tail || [], force);
    }
}

export function convertToTreeData(data: TProtypoElement[], selectedTag?: TProtypoElement): any {
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
                    title: item.tag + (subtitle ? (': ' + subtitle) : ''),
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

export default class CodeGenerator {
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

function getChildrenElements(children: TProtypoElement[]) {
    let result: TProtypoElement[] = [];
    for (let child of children) {
        result.push(updateElementChildrenText(child));
    }
    return result;
}

function updateElementChildrenText(el: TProtypoElement) {

    if (el.children) {
        let childrenText = null;
        const Handler = resolveTagHandler(el.tag);
        if (Handler) {
            let tag = new Handler(el);
            childrenText = tag.renderHTMLChildren();
        }
        return {
            ...el,
            childrenText,
            children: getChildrenElements(el.children)
        };
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

export function html2childrenTags(html: string): TProtypoElement[] {
    const htmlJson = html2json(html);
    return htmlJsonChild2childrenTags(htmlJson.child);
}