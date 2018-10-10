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

import 'rxjs';
import 'lib/external/fsa';
import { Action } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { generatePageTemplate } from '../actions';
import generatePageTemplateEpic from './generatePageTemplateEpic';
import dependencies from 'modules/dependencies';
import mockStore from 'test/mockStore';

describe('generatePageTemplateEpic', () => {
    it('generate PageTemplate', () => {

        const action$ = ActionsObservable.of<Action>(generatePageTemplate);
        const expectedOutput: any = [
            {
                type: 'editor/UPDATE_EDITOR_TAB',
                payload: 'Image(Alt: Image, Src: /img/dummy.png)\nP(Class: text-primary, Body: Paragraph text here)\nForm(){\n Label(Body: Firstname:)\n Input(Class: form-control, Name: sample input)\n}\nForm(){\n Label(Body: Lastname:)\n Input(Class: form-control, Name: sample input)\n Button(Body: Submit)\n}\nTable(Source: keysStr, Columns: "KEY_ID=id,MONEY=amount")'
            },
            {
                type: 'editor/SET_PAGE_TEMPLATE',
                payload: 'Image(Alt: Image, Src: /img/dummy.png)\nP(Class: text-primary, Body: Paragraph text here)\nForm(){\n Label(Body: Firstname:)\n Input(Class: form-control, Name: sample input)\n}\nForm(){\n Label(Body: Lastname:)\n Input(Class: form-control, Name: sample input)\n Button(Body: Submit)\n}\nTable(Source: keysStr, Columns: "KEY_ID=id,MONEY=amount")'
            }
        ];

        generatePageTemplateEpic(action$, mockStore, { constructorModule: dependencies.constructorModule })
            .toArray()
            .subscribe(actualOutput => {
                expect(actualOutput).toEqual(expectedOutput);
            });
    });
});