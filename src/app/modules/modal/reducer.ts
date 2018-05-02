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

import * as actions from './actions';
import { IModal } from 'genesis/modal';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import modalShowHandler from './reducers/modalShowHandler';
import modalCloseHandler from './reducers/modalCloseHandler';

export type State =
    IModal;

export const initialState: State = {
    id: null,
    type: null,
    result: null,
    params: null
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.modalShow, modalShowHandler)
    .case(actions.modalClose, modalCloseHandler);