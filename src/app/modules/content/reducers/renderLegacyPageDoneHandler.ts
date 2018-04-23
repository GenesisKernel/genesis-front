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