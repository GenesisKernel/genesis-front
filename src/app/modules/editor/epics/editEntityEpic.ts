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

import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { IRootState } from 'modules';
import { txExec } from 'modules/tx/actions';
import { reloadEditorTab } from '../actions';

const connections = {
    '@1EditBlock': 'block',
    '@1EditPage': 'page',
    '@1EditContract': 'contract',
    '@1EditMenu': 'menu'
};

const editEntityEpic: Epic<Action, IRootState> = (action$, store) => action$.ofAction(txExec.done)
    .flatMap(action => {
        const contractName = action.payload.params.tx.contract && action.payload.params.tx.contract.name;
        const entity = connections[contractName];

        if (entity) {
            const params = action.payload.params.tx.contract.params as { Id: string, Value?: string };
            return Observable.of(reloadEditorTab({
                type: entity,
                id: params.Id,
                data: {
                    initialValue: params.Value
                }
            }));
        }
        else {
            return Observable.empty();
        }
    });

export default editEntityEpic;