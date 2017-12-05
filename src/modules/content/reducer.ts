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
    readonly stylesheet: string;
    readonly menus: { name: string, vde: boolean, content: IProtypoElement[] }[];
    readonly page: { name: string, content: IProtypoElement[], error?: string };
    readonly notifications: IProtypoElement[];
    readonly alert: { id: string, success: string, error: string };
    readonly imageEditor: { mime: string, data: string, aspectRatio: number, minWidth: number, result: string };
};

export const initialState: State = {
    pending: false,
    stylesheet: null,
    menus: [],
    page: null,
    notifications: null,
    alert: null,
    imageEditor: { mime: null, data: null, aspectRatio: null, minWidth: null, result: null }
};

export default (state: State = initialState, action: Action): State => {
    if (isType(action, actions.navigatePage.started)) {
        return {
            ...state,
            page: null
        };
    }

    if (isType(action, actions.renderPage.started)) {
        return {
            ...state,
            pending: true,
            page: null
        };
    }
    else if (isType(action, actions.renderPage.done)) {
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
    else if (isType(action, actions.renderPage.failed)) {
        return {
            ...state,
            pending: false,
            page: {
                name: action.payload.params.name,
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

    if (isType(action, actions.ecosystemInit.started)) {
        return {
            ...state,
            pending: true
        };
    }

    if (isType(action, actions.ecosystemInit.done)) {
        // TODO: Move this logic to the Epic
        const menuNeedsPush = !state.menus.length || state.menus.find(l => l.name === action.payload.result.defaultMenu.name);
        if (menuNeedsPush) {
            return {
                ...state,
                pending: false,
                stylesheet: action.payload.result.stylesheet,
                menus: [action.payload.result.defaultMenu, ...state.menus]
            };
        }
        else {
            return {
                ...state,
                stylesheet: action.payload.result.stylesheet
            };
        }
    }

    if (isType(action, actions.ecosystemInit.failed)) {
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

    if (isType(action, actions.reset.started)) {
        return {
            ...state,
            pending: true,
            page: null,
            menus: []
        };
    }
    else if (isType(action, actions.reset.done)) {
        return {
            ...state,
            pending: false,
            menus: [action.payload.result.menu],
            page: action.payload.result.page
        };
    }
    else if (isType(action, actions.reset.failed)) {
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

    if (isType(action, actions.imageEditorOpen)) {
        return {
            ...state,
            imageEditor: {
                mime: action.payload.mime,
                data: action.payload.data,
                aspectRatio: action.payload.aspectRatio,
                minWidth: action.payload.width,
                result: null
            }
        };
    }
    else if (isType(action, actions.imageEditorClose)) {
        return {
            ...state,
            imageEditor: {
                mime: null,
                data: null,
                aspectRatio: null,
                minWidth: null,
                result: action.payload
            }
        };
    }

    if (isType(action, actions.fetchNotifications.done)) {
        return {
            ...state,
            notifications: action.payload.result
        };
    }

    return state;
};