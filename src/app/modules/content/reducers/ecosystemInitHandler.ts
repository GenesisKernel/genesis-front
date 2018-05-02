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
import { ecosystemInit } from '../actions';
import { Reducer } from 'modules';
import { TSection } from 'genesis/content';

const ecosystemInitHandler: Reducer<typeof ecosystemInit.started, State> = (state, payload) => {
    const sections: { [key: string]: TSection } = {};
    for (let itr in state.sections) {
        if (state.sections.hasOwnProperty(itr)) {
            sections[itr] = {
                ...state.sections[itr],
                pending: payload.section === itr ? true : false,
                page: null,
                menus: []
            };
        }
    }

    return {
        ...state,
        preloading: true,
        preloadingError: null,
        section: payload.section,
        sections
    };
};

export default ecosystemInitHandler;