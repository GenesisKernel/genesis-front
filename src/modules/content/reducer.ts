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
    readonly menus: { name: string, content: IProtypoElement[] }[];
    readonly page: { name: string, content: IProtypoElement[], error?: string };
    readonly alert: { id: string, success: string, error: string };
};

export const initialState: State = {
    pending: false,
    menus: [],
    page: null,
    alert: null
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
        const menuNeedsPush = !state.menus.length || state.menus[state.menus.length - 1].name !== action.payload.result.menu.name;
        return {
            ...state,
            pending: false,
            menus: menuNeedsPush ?
                [...state.menus, action.payload.result.menu] :
                [...state.menus],
            page: action.payload.result.page
        };
    }

    if (isType(action, actions.renderPage.failed)) {
        return {
            ...state,
            pending: false,
            page: {
                name: null,
                content: null,
                error: action.payload.error
            }
        };
    }

    if (isType(action, actions.menuPop)) {
        if (1 >= state.menus.length) {
            return state;
        }
        else {
            return {
                ...state,
                menus: state.menus.slice(0, -1)
            };
        }
    }

    if (isType(action, actions.menuPush)) {
        const menuNeedsPush = !state.menus.length || state.menus[state.menus.length - 1].name !== action.payload.name;
        if (menuNeedsPush) {
            return {
                ...state,
                menus: [...state.menus, action.payload]
            };
        }
        else {
            return state;
        }
    }

    if (isType(action, actions.menuInit.started)) {
        return {
            ...state,
            pending: true
        };
    }

    if (isType(action, actions.menuInit.done)) {
        const menuNeedsPush = !state.menus.length || state.menus.find(l => l.name === action.payload.result.name);
        if (menuNeedsPush) {
            return {
                ...state,
                pending: false,
                menus: [action.payload.result, ...state.menus]
            };
        }
        else {
            return state;
        }
    }

    if (isType(action, actions.menuInit.failed)) {
        return {
            ...state,
            pending: false
        };
    }

    if (isType(action, actions.alertShow)) {
        return {
            ...state,
            alert: null
        };
    }
    else if (isType(action, actions.alertClose)) {
        return {
            ...state,
            alert: action.payload
        };
    }

    return state;
};