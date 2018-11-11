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
import { modalPage, modalShow } from '../actions';
import { flatMap, catchError, map } from 'rxjs/operators';
import { from, empty } from 'rxjs';

const modalPageEpic: Epic = (action$, store, { api }) => action$.ofAction(modalPage).pipe(
    flatMap(action => {
        const client = api(store.value.auth.session);

        return from(client.content({
            type: 'page',
            name: action.payload.name,
            params: action.payload.params,
            locale: store.value.storage.locale

        })).pipe(
            map(payload => modalShow({
                id: 'PAGE_MODAL',
                type: 'PAGE_MODAL',
                params: {
                    title: action.payload.title || action.payload.name,
                    width: action.payload.width,
                    tree: payload.tree
                }

            })),
            catchError(e => empty())
        );
    })
);

export default modalPageEpic;