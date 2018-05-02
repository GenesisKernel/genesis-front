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

import { combineEpics } from 'redux-observable';
import closeSectionEpic from './epics/closeSectionEpic';
import displayDataEpic from './epics/displayDataEpic';
import ecosystemInitEpic from './epics/ecosystemInitEpic';
import fetchNotificationsEpic from './epics/fetchNotificationsEpic';
import navigatePageEpic from './epics/navigatePageEpic';
import reloadPageEpic from './epics/reloadPageEpic';
import renderLegacyPageEpic from './epics/renderLegacyPageEpic';
import renderPageEpic from './epics/renderPageEpic';
import renderSectionEpic from './epics/renderSectionEpic';
import resetEpic from './epics/resetEpic';
import resetOnLoginEpic from './epics/resetOnLoginEpic';

export default combineEpics(
    closeSectionEpic,
    displayDataEpic,
    ecosystemInitEpic,
    fetchNotificationsEpic,
    navigatePageEpic,
    reloadPageEpic,
    renderLegacyPageEpic,
    renderPageEpic,
    renderSectionEpic,
    resetEpic,
    resetOnLoginEpic
);