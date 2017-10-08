// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as actions from './actions';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import { IProtypoElement } from 'components/Protypo/Protypo';

export type State = {
    readonly pending: boolean;
    readonly menu: { name: string, content: IProtypoElement[] };
    readonly page: { name: string, content: IProtypoElement[] };
};

export const initialState: State = {
    pending: false,
    menu: null,
    page: null
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.renderPage.started)) {
        return {
            ...state,
            pending: true,
            page: null
        };
    }

    if (isType(action, actions.renderPage.done)) {
        return {
            ...state,
            pending: false,
            menu: action.payload.result.menu,
            page: action.payload.result.page
        };
    }

    if (isType(action, actions.renderPage.failed)) {
        return {
            ...state,
            pending: false,
            page: null
        };
    }

    return state;
};