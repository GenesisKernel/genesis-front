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
import { IEditorTabCreateCall } from 'genesis/editor';
import { Success } from 'typescript-fsa';

export default function (state: State, payload: Success<string, IEditorTabCreateCall>): State {
    return {
        ...state,
        tabs: [
            ...state.tabs,
            {
                type: payload.params,
                id: payload.result.id,
                new: true,
                name: payload.result.name,
                tool: 'editor',
                value: payload.result.value,
                initialValue: payload.result.value,
                dirty: false
            }
        ],
        tabIndex: state.tabs.length
    };
}