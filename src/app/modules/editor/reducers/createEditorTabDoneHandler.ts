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
import { createEditorTab } from '../actions';
import { Reducer } from 'modules';

const createEditorTabDoneHandler: Reducer<typeof createEditorTab.done, State> = (state, payload) => ({
    ...state,
    tabs: [
        ...state.tabs,
        {
            type: payload.params.type,
            id: payload.result.id,
            new: true,
            name: payload.result.name,
            tool: 'editor',
            value: payload.result.value,
            initialValue: payload.result.value,
            dirty: false,
            appId: payload.params.appId
        }
    ],
    tabIndex: state.tabs.length
});

export default createEditorTabDoneHandler;