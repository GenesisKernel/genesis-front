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
import { Observable } from 'rxjs/Observable';
import { locationChange } from '../actions';
import { renderPage } from 'modules/sections/actions';

const sectionLoadEpic: Epic = (action$, store, { routerService }) => action$.ofAction(locationChange)
    .flatMap(action => {
        const match = routerService.matchRoute('(/)(:section)(/)(:page)(/)', action.payload.location.pathname);
        if (match) {
            const state = store.getState();
            const section = state.sections.sections[match.parts.section || state.sections.mainSection];
            const page = match.parts.page || section.defaultPage;

            return Observable.of(renderPage.started({
                key: action.payload.location.key,
                section: section.name,
                name: page,
                params: match.query
            }));
        }
        else {
            return Observable.empty<never>();
        }
    });

export default sectionLoadEpic;