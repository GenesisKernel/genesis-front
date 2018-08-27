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

import * as actions from '../actions';
import uuid from 'uuid';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { txCall } from 'modules/tx/actions';

const connections = {
    contract: '@1EditContract',
    page: '@1EditPage',
    menu: '@1EditMenu',
    block: '@1EditBlock',
};

const editorSaveEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.editorSave)
        .filter(l => !l.payload.new)
        .flatMap(action => {
            const contract = connections[action.payload.type];

            if (contract) {
                return Observable.of(txCall({
                    uuid: uuid.v4(),
                    contract: {
                        name: contract,
                        params: {
                            Id: action.payload.id,
                            Value: action.payload.value
                        }
                    }
                }));
            }
            else {
                return Observable.empty();
            }
        });

export default editorSaveEpic;