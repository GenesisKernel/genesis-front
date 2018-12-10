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

import { from } from 'rxjs';
import { Epic } from 'modules';
import { txExec } from 'modules/tx/actions';
import { reloadEditorTab } from '../actions';
import { flatMap, filter, map } from 'rxjs/operators';

const connections: { [name: string]: string } = {
    '@1EditBlock': 'block',
    '@1EditPage': 'page',
    '@1EditContract': 'contract',
    '@1EditMenu': 'menu'
};

const editEntityEpic: Epic = (action$) => action$.ofAction(txExec.done).pipe(
    flatMap(action => from(action.payload.params.contracts).pipe(
        filter(l => l.name in connections),
        flatMap(contract => from(contract.params).pipe(
            map(params => reloadEditorTab({
                type: connections[contract.name],
                id: params.Id,
                data: {
                    initialValue: params.Value
                }
            })))
        )
    ))
);

export default editEntityEpic;