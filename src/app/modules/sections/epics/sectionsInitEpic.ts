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

/* import { Epic } from 'modules';
import { sectionsInit } from 'modules/sections/actions';
import { flatMap, map, catchError } from 'rxjs/operators';
import { forkJoin, iif, from, of, concat } from 'rxjs';

enum RemoteSectionStatus {
    Removed = '0',
    Default = '1',
    Main = '2'
}

const sectionsInitEpic: Epic = (action$, store, { api }) => action$.ofAction(sectionsInit.started).pipe(
    flatMap(action => {
        const client = api(store.value.auth.session);
        const roleID = store.value.auth.session.role && store.value.auth.session.role.id;

        return forkJoin(
            client.getSections({ locale: store.value.storage.locale }),
            iif<string, string>(
                () => !!roleID,
                from(client.getRow({
                    table: 'roles',
                    id: roleID
                })).pipe(
                    map(row => row.value.default_page),
                    catchError(e => of(null))
                ),
                of(null)
            )
        ).pipe(
            flatMap(([sections, defaultPage]) => {
                const remoteSections = sections.list.filter(l =>
                    RemoteSectionStatus.Removed !== l.status
                );
                const mainSection = remoteSections.find(l => RemoteSectionStatus.Main === l.status) || remoteSections[0];
                const sectionsResult = [
                    {
                        ...mainSection,
                        page: defaultPage || mainSection.page
                    },
                    ...remoteSections.filter(l => l.id !== mainSection.id)
                ].sort((a, b) =>
                    Number(a.id) - Number(b.id)
                );

                return concat(
                    of(sectionsInit.done({
                        params: action.payload,
                        result: {
                            mainSection: mainSection.urlname,
                            section: action.payload,
                            sections: [
                                ...sectionsResult.map(l => ({
                                    key: l.urlname,
                                    name: l.urlname,
                                    title: l.title,
                                    visible: true,
                                    defaultPage: l.page,
                                    pending: false,
                                    force: false,
                                    menus: [],
                                    menuVisible: true,
                                    pages: [],
                                    breadcrumbs: []
                                }))
                            ]
                        },
                    }))
                );
            }),
            catchError(e => of(sectionsInit.failed({
                params: action.payload,
                error: e
            })))
        );
    })
);

export default sectionsInitEpic;*/