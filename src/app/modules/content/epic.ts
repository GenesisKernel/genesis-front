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

import { combineEpics } from 'redux-observable';
import closeSectionEpic from './epics/closeSectionEpic';
import displayDataEpic from './epics/displayDataEpic';
import ecosystemInitEpic from './epics/ecosystemInitEpic';
import ecosystemInitDoneEpic from './epics/ecosystemInitDoneEpic';
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
    ecosystemInitDoneEpic,
    fetchNotificationsEpic,
    navigatePageEpic,
    reloadPageEpic,
    renderLegacyPageEpic,
    renderPageEpic,
    renderSectionEpic,
    resetEpic,
    resetOnLoginEpic
);