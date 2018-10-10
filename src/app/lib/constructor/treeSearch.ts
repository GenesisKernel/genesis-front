// MIT License
//
// Copyright (c) 2016-2018 AplaProject
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

import { TProtypoElement } from 'apla/protypo';
import { IFindTagResult } from 'apla/editor';

class TreeSearch {
    private findTagByIdResult: IFindTagResult = {
        el: null,
        parent: null,
        parentPosition: 0,
        tail: false
    };

    public findTagById(elements: TProtypoElement[], id: string): IFindTagResult {
        this.findTagByIdResult.el = null;
        this.findNextTagInArrayById(elements, id, null, false);
        return this.findTagByIdResult;
    }

    private findNextTagById(el: any, id: string, parent: TProtypoElement, tail: boolean): void {
        if (el.id === id) {
            this.findTagByIdResult.el = el;
            return;
        }

        this.findNextTagInArrayById(el.children, id, el, false);
        this.findNextTagInArrayById(el.tail, id, el, true);
    }

    private findNextTagInArrayById(el: TProtypoElement[], id: string, parent: TProtypoElement, tail: boolean): void {
        for (var i = 0; el && i < el.length; i++) {
            if (this.findTagByIdResult.el) {
                break;
            }
            this.findTagByIdResult.parent = parent;
            this.findTagByIdResult.parentPosition = i;
            this.findTagByIdResult.tail = tail;
            this.findNextTagById(el[i], id, parent, false);
        }
    }
}

export default TreeSearch;