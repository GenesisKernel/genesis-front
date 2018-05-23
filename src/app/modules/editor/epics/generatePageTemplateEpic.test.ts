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
                payload: 'Image(Src: /img/dummy.png, Alt: Image)\nP(Class: text-primary, Body:\n Paragraph text here\n)\nForm() {\n Label(Body:\n  Firstname:\n )\n Input(Class: form-control, Name: sample input)\n}\nForm() {\n Label(Body:\n  Lastname:\n )\n Input(Class: form-control, Name: sample input)\n Button(Body:\n  Submit\n )\n}\nTable(Source: keysStr, Columns: "KEY_ID=id,MONEY=amount")'
            },
            {
                type: 'editor/SET_PAGE_TEMPLATE',
                payload: 'Image(Src: /img/dummy.png, Alt: Image)\nP(Class: text-primary, Body:\n Paragraph text here\n)\nForm() {\n Label(Body:\n  Firstname:\n )\n Input(Class: form-control, Name: sample input)\n}\nForm() {\n Label(Body:\n  Lastname:\n )\n Input(Class: form-control, Name: sample input)\n Button(Body:\n  Submit\n )\n}\nTable(Source: keysStr, Columns: "KEY_ID=id,MONEY=amount")'
            }
        ];

        generatePageTemplateEpic(action$, mockStore, { constructorModule: dependencies.constructorModule })
            .toArray()
            .subscribe(actualOutput => {
                expect(actualOutput).toEqual(expectedOutput);
            });
    });
});