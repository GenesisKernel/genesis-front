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