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
import { acquireSession } from '../actions';
import { forkJoin, of, from } from 'rxjs';
import { flatMap, catchError, map } from 'rxjs/operators';
import { ISection } from 'genesis/content';
import { sectionsInit } from 'modules/sections/actions';
import { fetchNotifications, ecosystemInit } from 'modules/content/actions';

enum RemoteSectionStatus {
    Removed = '0',
    Default = '1',
    Main = '2'
}

const acquireSessionEpic: Epic = (action$, store, { api }) => action$.ofAction(acquireSession.started).pipe(
    flatMap(action => {
        const client = api(action.payload);

        return forkJoin(
            from(client.getSections({
                locale: store.value.storage.locale
            })).pipe(
                map(sections => sections.list),
            ),
            from(client.getParam({ name: 'stylesheet' })).pipe(
                map(result => result.value),
                catchError(e => of(''))
            )
        ).pipe(
            flatMap(([sections, stylesheet]) => {
                const sectionsResult: { [name: string]: ISection } = {};
                const mainSection = sections.find(l => RemoteSectionStatus.Main === l.status);
                sections.forEach(section => {
                    sectionsResult[section.urlname] = {
                        name: section.urlname,
                        title: section.title,
                        defaultPage: section.page,
                        breadcrumbs: [{
                            caller: '',
                            type: 'PAGE',
                            section: section.urlname,
                            page: section.page,
                            params: {}
                        }],
                        menus: [],
                        pages: []
                    };
                });

                return of(
                    sectionsInit({
                        mainSection: mainSection ? mainSection.urlname : sections[0].urlname,
                        sections: sectionsResult
                    }),
                    ecosystemInit({
                        stylesheet
                    }),
                    fetchNotifications.started(undefined),
                    acquireSession.done({
                        params: action.payload,
                        result: true
                    })
                );
            }),
            catchError(e => of(acquireSession.done({
                params: action.payload,
                result: false
            })))
        );
    })
);

export default acquireSessionEpic;