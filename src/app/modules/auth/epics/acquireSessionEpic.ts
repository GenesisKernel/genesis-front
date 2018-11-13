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
import { forkJoin, of, iif, from, defer } from 'rxjs';
import { flatMap, map, catchError, filter, toArray } from 'rxjs/operators';
import { ISection } from 'genesis/content';
import { sectionsInit } from 'modules/sections/actions';

enum RemoteSectionStatus {
    Removed = '0',
    Default = '1',
    Main = '2'
}

const acquireSessionEpic: Epic = (action$, store, { api }) => action$.ofAction(acquireSession.started).pipe(
    flatMap(action => {
        const client = api(action.payload);

        return forkJoin(
            // Resolve sections list
            from(client.getSections({
                locale: store.value.storage.locale
            })).pipe(
                flatMap(sections => from(sections.list)),
                filter(section => RemoteSectionStatus.Removed !== section.status),
                toArray()
            ),

            // Resolve default page for the role
            iif<string, string>(
                () => !!(action.payload.role && action.payload.role.id),
                defer(() => from(client.getRow({
                    table: 'roles',
                    id: action.payload.role.id,
                })).pipe(
                    map(row => row.value.default_page),
                    catchError(e => of(null))
                )),
                of(null)
            )
        ).pipe(
            flatMap(([sections, defaultPage]) => {
                const sectionsResult: { [name: string]: ISection } = {};
                const mainSection = sections.find(l => RemoteSectionStatus.Main === l.status);
                sections.forEach(section => {
                    sectionsResult[section.urlname] = {
                        key: section.urlname,
                        pending: false,
                        name: section.urlname,
                        title: section.title,
                        defaultPage: (RemoteSectionStatus.Main === section.status && defaultPage) || section.page,
                        breadcrumbs: [],
                        menus: [],
                        pages: []
                    };
                });

                return of(
                    sectionsInit({
                        mainSection: mainSection ? mainSection.urlname : sections[0].urlname,
                        sections: sectionsResult
                    }),
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