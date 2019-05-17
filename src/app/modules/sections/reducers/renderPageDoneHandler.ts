/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { renderPage } from '../actions';
import { Reducer } from 'modules';
import { TMenu } from 'apla/content';

const renderPageDoneHandler: Reducer<typeof renderPage.done, State> = (state, payload) => {
    const section = payload.params.section;
    const menuIndex = state.sections[section].menus.findIndex(l =>
        l.name === payload.result.menu.name);

    let menus: TMenu[] = [];

    if (state.sections[section].menus.length) {
        if (-1 === menuIndex) {
            menus = [
                ...state.sections[section].menus,
                payload.result.menu
            ];
        }
        else {
            menus = [
                ...state.sections[section].menus.slice(0, menuIndex),
                payload.result.menu,
                ...state.sections[section].menus.slice(menuIndex + 1),
            ];
        }
    }
    else if (payload.result.defaultMenu) {
        menus = [
            payload.result.defaultMenu,
            payload.result.menu
        ];
    }
    else {
        menus = [
            payload.result.menu
        ];
    }

    return {
        ...state,
        sections: {
            ...state.sections,
            [section]: {
                ...state.sections[section],
                menus,
                page: {
                    ...payload.result.page,
                    params: payload.params.params
                },
                pending: false
            }
        }
    };
};

export default renderPageDoneHandler;