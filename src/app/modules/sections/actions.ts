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

import actionCreatorFactory from 'typescript-fsa';
import { TMenu, TPage, TSection } from 'genesis/content';
import { ITransactionConfirm } from 'genesis/tx';

const actionCreator = actionCreatorFactory('section');

// Navigation
export const renderSection = actionCreator<string>('RENDER_SECTION');
export const updateSection = actionCreator<TSection>('UPDATE_SECTION');
export const closeSection = actionCreator<string>('CLOSE_SECTION');
export const switchSection = actionCreator<string>('SWITCH_SECTION');
export const setDefaultPage = actionCreator<string>('SET_DEFAULT_PAGE');
export const reset = actionCreator.async<void, { menu: TMenu, page: TPage }, string>('RESET');
export const menuPop = actionCreator('MENU_POP');
export const menuPush = actionCreator<TMenu>('MENU_PUSH');
export const navigatePage = actionCreator.async<{ name?: string, section?: string, force?: boolean, popup?: { title?: string, width?: number }, params: { [key: string]: any }, confirm?: ITransactionConfirm }, { section: string }, undefined>('NAVIGATE_PAGE');
export const navigationToggle = actionCreator('NAVIGATION_TOGGLE');
export const renderPage = actionCreator.async<{ section: string, name: string, params?: { [key: string]: any } }, { menu: TMenu, page: TPage }, string>('RENDER_PAGE');
export const renderLegacyPage = actionCreator.async<{ section: string, name: string, menu: string, params?: { [key: string]: any } }, { menu: TMenu }>('RENDER_LEGACY_PAGE');
export const reloadPage = actionCreator.async<{}, { params: { [key: string]: any }, menu: TMenu, page: TPage }, string>('RELOAD_PAGE');
export const sectionsInit = actionCreator<string>('SECTIONS_INIT');