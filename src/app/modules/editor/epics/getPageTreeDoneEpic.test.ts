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
import { getPageTree } from '../actions';
import getPageTreeDoneEpic from './getPageTreeDoneEpic';
import constructorModule from 'lib/constructor';
import mockStore from './mockStore';

describe('generatePageTemplateEpic', () => {
    it('generate PageTemplate', () => {

        const action$ = ActionsObservable.of<Action>(getPageTree.done({
                params: null,
                result: {
                    jsonData: [],
                    treeData: []
                }
            }
        ));
        const expectedOutput: any = [
            {
                payload: null,
                type: 'editor/SAVE_CONSTRUCTOR_HISTORY_STARTED'
            }
        ];

        getPageTreeDoneEpic(action$, mockStore, { constructorModule })
            .toArray()
            .subscribe(actualOutput => {
                expect(actualOutput).toEqual(expectedOutput);
            });
    });
});