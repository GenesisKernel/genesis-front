/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { renderLegacyPage } from '../actions';
import { Reducer } from 'modules';

const renderLegacyPageDoneHandler: Reducer<typeof renderLegacyPage.done, State> = (state, payload) => {
    const section = payload.params.section;
    const menuIndex = payload.result.menu ? state.sections[section].menus.findIndex(l =>
        l.name === payload.result.menu.name) : -1;

    return {
        ...state,
        sections: {
            ...state.sections,
            [section]: {
                ...state.sections[section],
                menus: -1 === menuIndex ?
                    (payload.params.menu ? [
                        ...state.sections[section].menus,
                        payload.result.menu
                    ] : state.sections[section].menus) : [
                        ...state.sections[section].menus.slice(0, menuIndex),
                        payload.result.menu,
                        ...state.sections[section].menus.slice(menuIndex + 1),
                    ],
                page: {
                    name: payload.params.name,
                    content: [],
                    legacy: true,
                    params: payload.params.params
                },
                pending: false
            }
        }
    };
};

export default renderLegacyPageDoneHandler;