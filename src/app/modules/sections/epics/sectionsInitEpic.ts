/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
        const client = api({
            apiHost: state.auth.session.network.apiHost,
            sessionToken: state.auth.session.sessionToken
        });
        const roleID = state.auth.wallet.role && state.auth.wallet.role.id;

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
                                page: null
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