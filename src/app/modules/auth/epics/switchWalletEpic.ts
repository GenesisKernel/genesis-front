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
import { switchWallet, selectWallet, logout } from '../actions';
import { flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

const switchWalletEpic: Epic = (action$, store, { api }) => action$.ofAction(switchWallet).pipe(
    flatMap(action => {
        const wallet = store.value.storage.wallets.find(l => l.id === store.value.auth.session.wallet!.id)!;
        const walletData = store.value.auth.wallets.find(l => l.id === store.value.auth.session.wallet!.id)!;
        const access = walletData!.access.find(l => l.ecosystem === action.payload.ecosystem)!;

        return of(
            logout(),
            selectWallet({
                wallet,
                access,
                role: access.roles.find(l => l.id === action.payload.role)
            })
        );
    })
);

export default switchWalletEpic;