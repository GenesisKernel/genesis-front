// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as queryString from 'query-string';
import api, { IAPIError, IContract } from 'lib/api';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { combineEpics, Epic } from 'redux-observable';
import swal, { SweetAlertType } from 'sweetalert2';
import { IRootState } from 'modules';
import * as actions from './actions';
import { logout, selectAccount } from 'modules/auth/actions';
import * as storageActions from 'modules/storage/actions';
import { history } from 'store';
import { navigate } from 'modules/engine/actions';
import { LEGACY_PAGES, VDE_LEGACY_PAGES } from 'lib/legacyPages';
import editContractEpic from './epics/editContractEpic';
import newContractEpic from './epics/newContractEpic';
import editPageEpic from './epics/editPageEpic';
import editorSaveEpic from './epics/editorSaveEpic';
import newPageEpic from './epics/newPageEpic';
import editMenuEpic from './epics/editMenuEpic';
import editBlockEpic from './epics/editBlockEpic';
import newMenuEpic from './epics/newMenuEpic';
import newBlockEpic from './epics/newBlockEpic';

export const navigatePageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.navigatePage.started)
        .map(action => {
            const state = store.getState();
            const sectionName = (action.payload.vde ?
                (VDE_LEGACY_PAGES[action.payload.name] && VDE_LEGACY_PAGES[action.payload.name].section) :
                (LEGACY_PAGES[action.payload.name] && LEGACY_PAGES[action.payload.name].section)) || action.payload.section || state.content.section;
            const section = state.content.sections[sectionName];

            const params = queryString.stringify(action.payload.params);
            history.push(`/${sectionName}/${action.payload.name || section.defaultPage}${params ? '?' + params : ''}`);
            return actions.navigatePage.done({
                params: action.payload,
                result: {
                    section: sectionName,
                    leftVDE: 'vde' === state.content.section && 'vde' !== sectionName,
                    enteredVDE: 'vde' !== state.content.section && 'vde' === sectionName
                }
            });
        });

export const renderPageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.renderPage.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, action.payload.name, action.payload.params, action.payload.vde))
                .map(payload =>
                    actions.renderPage.done({
                        params: action.payload,
                        result: {
                            menu: {
                                name: payload.menu,
                                vde: action.payload.vde,
                                content: payload.menutree
                            },
                            page: {
                                params: action.payload.params,
                                name: action.payload.name,
                                content: payload.tree
                            }
                        }
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.renderPage.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const renderLegacyPageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.renderLegacyPage.started)
        .flatMap(action => {
            if (action.payload.menu) {
                const state = store.getState();
                return Observable.fromPromise(api.contentMenu(state.auth.sessionToken, action.payload.menu, action.payload.vde))
                    .map(payload =>
                        actions.renderLegacyPage.done({
                            params: action.payload,
                            result: {
                                menu: {
                                    name: action.payload.menu,
                                    vde: action.payload.vde,
                                    content: payload.tree
                                }
                            }
                        })
                    )
                    .catch(error =>
                        Observable.of(actions.renderLegacyPage.done({
                            params: action.payload,
                            result: {
                                menu: {
                                    name: action.payload.menu,
                                    vde: action.payload.vde,
                                    content: []
                                }
                            }
                        })));
            }
            else {
                return Observable.of(actions.renderLegacyPage.done({
                    params: action.payload,
                    result: {
                        menu: null
                    }
                }));
            }
        });

export const reloadPageEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.reloadPage.started)
        .flatMap(action => {
            const state = store.getState();
            const section = state.content.sections[state.content.section];

            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, section.page.name, section.page.params, section.page.vde))
                .map(payload =>
                    actions.reloadPage.done({
                        params: action.payload,
                        result: {
                            vde: section.page.vde,
                            params: section.page.params,
                            menu: {
                                name: payload.menu,
                                vde: section.page.vde,
                                content: payload.menutree
                            },
                            page: {
                                params: section.page.params,
                                name: section.page.name,
                                content: payload.tree
                            }
                        }
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.reloadPage.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const ecosystemInitEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.ecosystemInit.started)
        .flatMap(action => {
            const state = store.getState();

            const promise = Promise.all([
                api.parameter(state.auth.sessionToken, 'stylesheet'),
                api.parameter(state.auth.sessionToken, 'ecosystem_name'),

                // FIXME: Check if VDE exists
                api.row(state.auth.sessionToken, 'contracts', '1', undefined, true)
                    .then(l => true)
                    .catch(e => false)
            ]);

            return Observable.fromPromise(promise)
                .flatMap(payload =>
                    Observable.concat([
                        storageActions.saveAccount({
                            ...state.auth.account,
                            ecosystemName: payload[1].value
                        }),
                        actions.fetchNotifications.started(null),
                        actions.setVDEAvailable(payload[2]),
                        actions.ecosystemInit.done({
                            params: action.payload,
                            result: {
                                stylesheet: payload[0].value || null
                            }
                        })
                    ])
                )
                .catch((e: IAPIError) => {
                    if ('E_OFFLINE' === e.error || 'E_SERVER' === e.error || 'E_TOKENEXPIRED' === e.error) {
                        const account = store.getState().auth.account;

                        return Observable.concat([
                            logout.started({}),
                            selectAccount.started({
                                account
                            }),
                            actions.ecosystemInit.failed({
                                params: action.payload,
                                error: e.error
                            })
                        ]);
                    }
                    return Observable.of(actions.ecosystemInit.failed({
                        params: action.payload,
                        error: e.error
                    }));
                });
        });

export const alertEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.alertShow)
        .flatMap(action => {
            return Observable.fromPromise(swal({
                title: action.payload.title,
                text: action.payload.text,
                type: action.payload.type as SweetAlertType,
                showCancelButton: true,
                showCloseButton: !!action.payload.cancelButton,
                showConfirmButton: !!action.payload.confirmButton,
                confirmButtonText: action.payload.confirmButton,
                cancelButtonText: action.payload.cancelButton
            })
                .then(result => ({ success: result, error: null }))
                .catch(error => ({ success: null, error }))
            )
                .map(payload => actions.alertClose({
                    id: action.payload.id,
                    ...payload
                }));
        });

export const resetEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.reset.started)
        .flatMap(action => {
            const state = store.getState();
            const section = state.content.sections[state.content.section];

            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, section.defaultPage, {}))
                .map(payload => actions.reset.done({
                    params: action.payload,
                    result: {
                        menu: {
                            name: payload.menu,
                            vde: false,
                            content: payload.menutree
                        },
                        page: {
                            params: {},
                            name: section.defaultPage,
                            content: payload.tree
                        }
                    }
                }))
                .catch((e: IAPIError) =>
                    Observable.of(actions.reset.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const fetchNotificationsEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.fetchNotifications.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.contentPage(state.auth.sessionToken, 'notifications', {}))
                .map(payload =>
                    actions.fetchNotifications.done({
                        params: action.payload,
                        result: payload.tree
                    })
                )
                .catch((e: IAPIError) =>
                    Observable.of(actions.fetchNotifications.failed({
                        params: action.payload,
                        error: null
                    }))
                );
        });

export const displayDataEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.displayData.started)
        .flatMap(action => {
            return Observable.fromPromise(api.resolveTextData(action.payload))
                .map(payload => {
                    const state = store.getState();
                    swal({
                        title: state.engine.intl.formatMessage({ id: 'alert.info', defaultMessage: 'Information' }),
                        html: `
                            <div style="white-space: pre-wrap;text-align:left;">${payload}</div>
                        `,
                        type: 'info'
                    }).catch(e => null);

                    return actions.displayData.done({
                        params: action.payload,
                        result: payload
                    });
                })
                .catch((e: IAPIError) =>
                    Observable.of(actions.displayData.failed({
                        params: action.payload,
                        error: e.error
                    }))
                );
        });

export const renderSectionEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.renderSection)
        .map(action => {
            const state = store.getState();
            const section = state.content.sections[action.payload];
            const params = section.page ? queryString.stringify(section.page.params) : '';
            return navigate(`/${section.name}/${section.page ? section.page.name : ''}${params ? '?' + params : ''}`);
        });

export const closeSectionEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.closeSection)
        .flatMap(action => {
            const state = store.getState();
            if (action.payload === state.content.section) {
                return Observable.of(actions.renderSection('home'));
            }
            else {
                return Observable.empty<never>();
            }
        });

export const createEditorTabEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.createEditorTab.started)
        .delay(0)
        .map(action => {
            const state = store.getState();

            const ids = state.content.editor.tabs
                .filter(l => l.new)
                .map(l => l.id)
                .sort();

            const id = (ids.length ? parseInt(ids[ids.length - 1], 10) + 1 : 1).toString();
            const name = state.engine.intl.formatMessage({
                id: 'editor.untitled',
                defaultMessage: 'Untitled-{id}'
            }, { id });

            switch (action.payload) {
                case 'contract':
                    return actions.createEditorTab.done({
                        params: action.payload,
                        result: {
                            id,
                            name,
                            value: `contract ${name} {\n    data {\n\n    }\n    conditions {\n\n    }\n    action {\n\n    }\n}`
                        }
                    });

                case 'page':
                case 'block':
                case 'menu':
                    return actions.createEditorTab.done({
                        params: action.payload,
                        result: {
                            id,
                            name,
                            value: ''
                        }
                    });

                default: return actions.createEditorTab.failed({
                    params: action.payload,
                    error: null
                });
            }
        });

export const loadEditorTabEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.loadEditorTab.started)
        .flatMap(action => {
            const state = store.getState();
            const nameParser = /^(@[0-9]+)?(.*)$/i;

            history.replace('/editor');

            switch (action.payload.type) {
                case 'contract':
                    return Observable.from(
                        api.contract(state.auth.sessionToken, action.payload.name, action.payload.vde)
                            .then(contract =>
                                api.row(state.auth.sessionToken, 'contracts', contract.tableid.toString(), undefined, action.payload.vde)
                                    .then(row => ({
                                        id: contract.tableid.toString(),
                                        name: nameParser.exec(contract.name)[2],
                                        contract: row.value as IContract
                                    }))
                            ))
                        .map(data =>
                            actions.loadEditorTab.done({
                                params: action.payload,
                                result: {
                                    type: 'contract',
                                    id: data.id,
                                    new: false,
                                    name: data.name,
                                    tool: 'editor',
                                    value: data.contract.value,
                                    initialValue: data.contract.value,
                                    vde: action.payload.vde,
                                    dirty: false
                                }
                            })
                        );

                case 'page':
                    return Observable.from(api.findPage(state.auth.sessionToken, action.payload.name, action.payload.vde))
                        .map(data =>
                            actions.loadEditorTab.done({
                                params: action.payload,
                                result: {
                                    type: 'page',
                                    id: data.id.toString(),
                                    new: false,
                                    name: data.name,
                                    tool: 'editor',
                                    value: data.value,
                                    initialValue: data.value,
                                    vde: action.payload.vde,
                                    dirty: false
                                }
                            })
                        );

                case 'menu':
                    return Observable.from(api.findMenu(state.auth.sessionToken, action.payload.name, action.payload.vde))
                        .map(data =>
                            actions.loadEditorTab.done({
                                params: action.payload,
                                result: {
                                    type: 'menu',
                                    id: data.id.toString(),
                                    new: false,
                                    name: data.name,
                                    tool: 'editor',
                                    value: data.value,
                                    initialValue: data.value,
                                    vde: action.payload.vde,
                                    dirty: false
                                }
                            })
                        );

                case 'block':
                    return Observable.from(api.findBlock(state.auth.sessionToken, action.payload.name, action.payload.vde))
                        .map(data =>
                            actions.loadEditorTab.done({
                                params: action.payload,
                                result: {
                                    type: 'block',
                                    id: data.id.toString(),
                                    new: false,
                                    name: data.name,
                                    tool: 'editor',
                                    value: data.value,
                                    initialValue: data.value,
                                    vde: action.payload.vde,
                                    dirty: false
                                }
                            })
                        );

                default:
                    return Observable.of(actions.loadEditorTab.failed({
                        params: action.payload,
                        error: null
                    }));
            }
        })
        .catch((error: IAPIError) =>
            Observable.of(actions.loadEditorTab.failed({
                params: null,
                error
            }))
        );

export const changeEditorToolEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.changeEditorTool.started)
        .flatMap(action => {
            const state = store.getState();

            switch (action.payload) {
                case 'preview':
                    const payload = state.content.editor.tabs[state.content.editor.tabIndex].value;
                    return Observable.fromPromise(api.contentTest(state.auth.sessionToken, payload))
                        .map(result => actions.changeEditorTool.done({
                            params: action.payload,
                            result: result.tree
                        }))
                        .catch(e => Observable.of(actions.changeEditorTool.failed({
                            params: action.payload,
                            error: e
                        })));

                default:
                    return Observable.of(actions.changeEditorTool.done({
                        params: action.payload,
                        result: null
                    }));
            }
        });

export default combineEpics(
    renderPageEpic,
    renderLegacyPageEpic,
    reloadPageEpic,
    ecosystemInitEpic,
    resetEpic,
    alertEpic,
    navigatePageEpic,
    fetchNotificationsEpic,
    displayDataEpic,
    renderSectionEpic,
    closeSectionEpic,
    createEditorTabEpic,
    loadEditorTabEpic,
    editorSaveEpic,
    changeEditorToolEpic,

    newContractEpic,
    newPageEpic,
    newMenuEpic,
    newBlockEpic,
    editContractEpic,
    editPageEpic,
    editMenuEpic,
    editBlockEpic
);