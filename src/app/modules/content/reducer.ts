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
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TProtypoElement } from 'genesis/protypo';
import { TSection } from 'genesis/content';
import closeSectionHandler from './reducers/closeSectionHandler';
import ecosystemInitDoneHandler from './reducers/ecosystemInitDoneHandler';
import ecosystemInitFailedHandler from './reducers/ecosystemInitFailedHandler';
import fetchNotificationsDoneHandler from './reducers/fetchNotificationsDoneHandler';
import menuPopHandler from './reducers/menuPopHandler';
import menuPushHandler from './reducers/menuPushHandler';
import navigatePageDoneHandler from './reducers/navigatePageDoneHandler';
import navigationToggleHandler from './reducers/navigationToggleHandler';
import reloadPageDoneHandler from './reducers/reloadPageDoneHandler';
import reloadPageHandler from './reducers/reloadPageHandler';
import renderLegacyPageDoneHandler from './reducers/renderLegacyPageDoneHandler';
import renderLegacyPageHandler from './reducers/renderLegacyPageHandler';
import renderPageDoneHandler from './reducers/renderPageDoneHandler';
import renderPageFailedHandler from './reducers/renderPageFailedHandler';
import renderPageHandler from './reducers/renderPageHandler';
import renderSectionHandler from './reducers/renderSectionHandler';
import resetDoneHandler from './reducers/resetDoneHandler';
import resetFailedHandler from './reducers/resetFailedHandler';
import setResizingHandler from './reducers/setResizingHandler';
import switchSectionHandler from './reducers/switchSectionHandler';
import updateSectionHandler from './reducers/updateSectionHandler';
import ecosystemInitHandler from './reducers/ecosystemInitHandler';
import setDefaultPageHandler from './reducers/setDefaultPageHandler';

export type State = {
    readonly preloading: boolean;
    readonly preloadingError: string;
    readonly stylesheet: string;
    readonly navigationResizing: boolean;
    readonly inited: boolean;
    readonly section: string;
    readonly sections: {
        readonly [name: string]: TSection;
    };
    readonly notifications: TProtypoElement[];
};

export const initialState: State = {
    preloading: false,
    preloadingError: null,
    stylesheet: null,
    navigationResizing: false,
    inited: false,
    section: 'home',
    sections: {
        home: {
            name: 'home',
            title: 'Home',
            visible: true,
            pending: false,
            force: false,
            defaultPage: 'default_page',
            menus: [],
            menuVisible: true,
            page: null
        },
        admin: {
            name: 'admin',
            title: 'Admin',
            visible: true,
            defaultPage: 'admin_index',
            pending: false,
            force: false,
            menus: [],
            menuVisible: true,
            page: null
        },
        editor: {
            name: 'editor',
            title: 'Editor',
            visible: false,
            closeable: true,
            defaultPage: 'editor',
            pending: false,
            force: false,
            menus: [],
            menuDisabled: true,
            menuVisible: true,
            page: null
        }
    },
    notifications: null
};

export default reducerWithInitialState(initialState)
    .case(actions.closeSection, closeSectionHandler)
    .case(actions.ecosystemInit.done, ecosystemInitDoneHandler)
    .case(actions.ecosystemInit.failed, ecosystemInitFailedHandler)
    .case(actions.ecosystemInit.started, ecosystemInitHandler)
    .case(actions.fetchNotifications.done, fetchNotificationsDoneHandler)
    .case(actions.menuPop, menuPopHandler)
    .case(actions.menuPush, menuPushHandler)
    .case(actions.navigatePage.done, navigatePageDoneHandler)
    .case(actions.navigationToggle, navigationToggleHandler)
    .case(actions.reloadPage.done, reloadPageDoneHandler)
    .case(actions.reloadPage.started, reloadPageHandler)
    .case(actions.renderLegacyPage.done, renderLegacyPageDoneHandler)
    .case(actions.renderLegacyPage.started, renderLegacyPageHandler)
    .case(actions.renderPage.done, renderPageDoneHandler)
    .case(actions.renderPage.failed, renderPageFailedHandler)
    .case(actions.renderPage.started, renderPageHandler)
    .case(actions.renderSection, renderSectionHandler)
    .case(actions.reset.done, resetDoneHandler)
    .case(actions.reset.failed, resetFailedHandler)
    .case(actions.setResizing, setResizingHandler)
    .case(actions.switchSection, switchSectionHandler)
    .case(actions.updateSection, updateSectionHandler)
    .case(actions.setDefaultPage, setDefaultPageHandler);