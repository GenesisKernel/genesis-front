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

import { IRootState } from 'modules';
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { txExec } from '../actions';
import { saveWallet } from 'modules/storage/actions';
import { Observable } from 'rxjs';

const newEcosystemEpic: Epic<Action, IRootState> = (action$, store) => action$.ofAction(txExec.done)
    .filter(l => !!l.payload.params.contracts.find(c => /^(@1)?NewEcosystem$/.test(c.name)))
    .flatMap(action => Observable.from(action.payload.result).map(result => {
        const ecosystem = result.status.result;
        const wallet = store.getState().auth.wallet;

        return saveWallet({
            id: wallet.id,
            encKey: wallet.encKey,
            address: wallet.address,
            username: null,
            ecosystem,
            ecosystemName: String(result.params.Name.value) || ecosystem
        });
    }));

export default newEcosystemEpic;