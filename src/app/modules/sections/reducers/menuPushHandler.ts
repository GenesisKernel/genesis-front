/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { menuPush } from '../actions';
import { Reducer } from 'modules';

const menuPushHandler: Reducer<typeof menuPush, State> = (state, payload) => {
    const menuIndex = state.sections[state.section].menus.findIndex(l =>
        l.name === payload.name);

    return {
        ...state,
        sections: {
            ...state.sections,
            [state.section]: {
                ...state.sections[state.section],
                menus: -1 === menuIndex ? [...state.sections[state.section].menus, payload] : [
                    ...state.sections[state.section].menus.slice(0, menuIndex),
                    payload,
                    ...state.sections[state.section].menus.slice(menuIndex + 1)
                ]
            }
        }
    };
};

export default menuPushHandler;