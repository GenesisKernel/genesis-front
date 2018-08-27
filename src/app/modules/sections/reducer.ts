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

import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TSection } from 'genesis/content';
import closeSectionHandler from './reducers/closeSectionHandler';
import renderSectionHandler from './reducers/renderSectionHandler';
import switchSectionHandler from './reducers/switchSectionHandler';
import updateSectionHandler from './reducers/updateSectionHandler';
import resetHandler from './reducers/resetHandler';
import sectionsInitDoneHandler from './reducers/sectionsInitDoneHandler';
import menuPopHandler from './reducers/menuPopHandler';
import menuPushHandler from './reducers/menuPushHandler';
import navigatePageDoneHandler from './reducers/navigatePageDoneHandler';
import navigationToggleHandler from './reducers/navigationToggleHandler';
import renderLegacyPageDoneHandler from './reducers/renderLegacyPageDoneHandler';
import renderLegacyPageHandler from './reducers/renderLegacyPageHandler';
import renderPageDoneHandler from './reducers/renderPageDoneHandler';
import renderPageFailedHandler from './reducers/renderPageFailedHandler';
import renderPageHandler from './reducers/renderPageHandler';

export type State = {
    readonly mainSection: string;
    readonly section: string;
    readonly sections: {
        readonly [name: string]: TSection;
    };
    readonly systemSections: TSection[];
    readonly inited: boolean;
};

export const initialState: State = {
    mainSection: null,
    section: null,
    sections: {},
    systemSections: [{
        key: 'editor',
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
    }],
    inited: false
};

export default reducerWithInitialState(initialState)
    .case(actions.closeSection, closeSectionHandler)
    .case(actions.renderSection, renderSectionHandler)
    .case(actions.switchSection, switchSectionHandler)
    .case(actions.updateSection, updateSectionHandler)
    .case(actions.reset, resetHandler)
    .case(actions.menuPop, menuPopHandler)
    .case(actions.menuPush, menuPushHandler)
    .case(actions.navigatePage.done, navigatePageDoneHandler)
    .case(actions.navigationToggle, navigationToggleHandler)
    .case(actions.renderLegacyPage.done, renderLegacyPageDoneHandler)
    .case(actions.renderLegacyPage.started, renderLegacyPageHandler)
    .case(actions.renderPage.done, renderPageDoneHandler)
    .case(actions.renderPage.failed, renderPageFailedHandler)
    .case(actions.renderPage.started, renderPageHandler)
    .case(actions.sectionsInit.done, sectionsInitDoneHandler);
