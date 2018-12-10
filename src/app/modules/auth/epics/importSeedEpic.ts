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
import { importSeed } from '../actions';
import { readTextFile } from 'lib/fs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

const importSeedEpic: Epic = (action$) => action$.ofAction(importSeed.started).pipe(
    switchMap(action =>
        from(readTextFile(action.payload)).pipe(
            map(payload => importSeed.done({
                params: action.payload,
                result: payload
            }))
        ).pipe(
            catchError(e => of(
                importSeed.failed({
                    params: action.payload,
                    error: e
                })
            ))
        )
    )
);

export default importSeedEpic;