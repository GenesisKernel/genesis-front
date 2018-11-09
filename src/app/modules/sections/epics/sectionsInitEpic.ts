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
import { sectionsInit, navigatePage } from 'modules/sections/actions';

enum RemoteSectionStatus {
    Removed = '0',
    Default = '1',
    Main = '2'
}

interface IRemoteSectionProto {
    id: string;
    title: string;
    urlname: string;
    page: string;
    roles_access: string;
    status: RemoteSectionStatus;
    order: string;
}

const sectionsInitEpic: Epic = (action$, store, { api }) => action$.ofAction(sectionsInit.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api(state.auth.session);
        const roleID = state.auth.session.role && state.auth.session.role.id;

        return Observable.from(Promise.all([
            client.sections({
                locale: state.storage.locale
            }),
            client.getRow({
                table: 'roles',
                id: (roleID && roleID.toString()) || null,
            }).then(row => row.value.default_page).catch(e => null)

        ])).flatMap(payload => {
            const remoteSections = (payload[0].list as object as IRemoteSectionProto[]).filter(l =>
                RemoteSectionStatus.Removed !== l.status
            );

            const mainSection = remoteSections.find(l => RemoteSectionStatus.Main === l.status) || remoteSections[0];
            const sections = [
                {
                    ...mainSection,
                    page: payload[1] || mainSection.page
                },
                ...remoteSections.filter(l => l.id !== mainSection.id)
            ].sort((a, b) =>
                Number(a.order) - Number(b.order) || Number(a.id) - Number(b.id)
            );

            return Observable.concat(
                Observable.of(sectionsInit.done({
                    params: action.payload,
                    result: {
                        mainSection: mainSection.urlname,
                        section: action.payload,
                        sections: [
                            ...sections.map(l => ({
                                key: null,
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
                })),
                action.payload ? Observable.empty<never>() : Observable.of(navigatePage.started({
                    section: mainSection.urlname,
                    params: {}
                }))
            );
        }).catch(e => Observable.of(sectionsInit.failed({
            params: action.payload,
            error: e
        })));
    }).catch(e => Observable.empty<never>());

export default sectionsInitEpic;