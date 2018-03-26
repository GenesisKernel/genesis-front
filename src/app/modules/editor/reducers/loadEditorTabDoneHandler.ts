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
import { Success } from 'typescript-fsa';
import { TEditorTab, ILoadEditorTabCall } from 'genesis/editor';
import findTabIndex from './findTabIndex';

export default function (state: State, payload: Success<ILoadEditorTabCall, TEditorTab>): State {
    const tabIndex = findTabIndex(state, payload.result);

    const tabs = -1 === tabIndex ?
        [
            ...state.tabs,
            {
                ...payload.result
            }
        ] : [
            ...state.tabs.slice(0, tabIndex),
            {
                ...state.tabs[tabIndex],
                initialValue: payload.result.initialValue,
                dirty: payload.result.initialValue !== state.tabs[tabIndex].value
            },
            ...state.tabs.slice(tabIndex + 1)
        ];

    return {
        ...state,
        tabIndex: -1 === tabIndex ? tabs.length - 1 : tabIndex,
        tabs
    };
}