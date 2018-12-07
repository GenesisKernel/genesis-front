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

import { Epic, ofAction } from 'modules';
import { locationChange } from '../actions';
import { renderPage } from 'modules/navigator/actions';
import { of, empty } from 'rxjs';
import { filter, delayWhen, switchMap } from 'rxjs/operators';

const sectionLoadEpic: Epic = (action$, store, { routerService }) => action$.pipe(
    delayWhen(() => store.pipe(
        filter(l => l.auth.isAcquired)
    )),
    ofAction(locationChange),
    switchMap(action => {
        const match = routerService.matchRoute('(/)(:section)(/)(:page)(/)', action.payload.location.pathname + action.payload.location.search);

        if (store.value.auth.isAuthenticated && match) {
            const section = store.value.navigator.sections[match.parts.section || store.value.navigator.mainSection];
            const pageName = match.parts.page || section.defaultPage;

            // TODO: refactoring
            // must ignore navigation when page and params are equal
            // if ('POP' === action.payload.action) {
            //     const pageIndex = findPage(section, pageName);
            //     if (-1 !== pageIndex) {
            //         const page = store.value.navigator.sections[section.name].pages[pageIndex];
            //         if (page.content || page.error) {
            //             return of(popPage({
            //                 location: action.payload.location,
            //                 section: section.name,
            //                 name: pageName
            //             }));
            //         }
            //     }
            // }

            return of(renderPage.started({
                location: action.payload.location,
                section: section.name,
                name: pageName,
                params: match.query
            }));
        }
        else {
            return empty();
        }
    })
);

export default sectionLoadEpic;