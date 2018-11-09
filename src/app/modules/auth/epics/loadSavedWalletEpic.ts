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

import { Epic } from 'modules';
import { loadWallet } from '../actions';
import { Observable } from 'rxjs';
import { saveWallet } from 'modules/storage/actions';

const loadSavedWalletEpic: Epic = (action$, store, { api }) => action$.ofAction(saveWallet)
    .flatMap(action => {
        const state = store.getState();
        const client = api({ apiHost: state.engine.nodeHost });

        return Observable.from(client.keyinfo({
            id: action.payload.id

        })).map(keys => loadWallet({
            id: action.payload.id,
            address: action.payload.address,
            encKey: action.payload.encKey,
            publicKey: action.payload.publicKey,
            access: keys.map(key => ({
                ...key,
                roles: key.roles || []
            }))

        })).catch(e => Observable.empty<never>());
    });

export default loadSavedWalletEpic;