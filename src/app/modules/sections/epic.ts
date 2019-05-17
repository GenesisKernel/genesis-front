/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { combineEpics } from 'redux-observable';
import closeSectionEpic from './epics/closeSectionEpic';
import renderSectionEpic from './epics/renderSectionEpic';
import resetOnLoginEpic from './epics/resetOnLoginEpic';
import navigatePageEpic from './epics/navigatePageEpic';
import reloadPageEpic from './epics/reloadPageEpic';
import renderLegacyPageEpic from './epics/renderLegacyPageEpic';
import renderPageEpic from './epics/renderPageEpic';
import sectionsInitEpic from './epics/sectionsInitEpic';

export default combineEpics(
    closeSectionEpic,
    renderSectionEpic,
    resetOnLoginEpic,
    navigatePageEpic,
    reloadPageEpic,
    renderLegacyPageEpic,
    renderPageEpic,
    sectionsInitEpic
);