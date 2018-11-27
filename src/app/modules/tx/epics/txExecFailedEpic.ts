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
import { txExec } from '../actions';
import { modalShow } from 'modules/modal/actions';
import { navigatePage } from 'modules/navigator/actions';
import { map, filter } from 'rxjs/operators';

export const txExecFailedEpic: Epic = (action$, store) => action$.ofAction(txExec.failed).pipe(
    filter(l => !l.payload.params.silent),
    map(action => {
        if (action.payload.error.id && action.payload.params.errorRedirects) {
            const errorRedirect = action.payload.params.errorRedirects[action.payload.error.id];
            if (errorRedirect) {
                return navigatePage.started({
                    name: errorRedirect.pagename,
                    params: errorRedirect.pageparams || {},
                    force: true
                });
            }
        }
        return modalShow({
            id: 'TX_ERROR',
            type: 'TX_ERROR',
            params: action.payload.error
        });
    })
);

export default txExecFailedEpic;