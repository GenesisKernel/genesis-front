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

import actionCreatorFactory from 'typescript-fsa';
import { TMenu, TPage } from 'genesis/content';
import { TProtypoElement } from 'genesis/protypo';

const actionCreator = actionCreatorFactory('content');

// Navigation
export const setResizing = actionCreator<boolean>('SET_RESIZING');
export const navigationToggle = actionCreator('NAVIGATION_TOGGLE');
export const menuPop = actionCreator('MENU_POP');
export const menuPush = actionCreator<TMenu>('MENU_PUSH');
export const alertShow = actionCreator<{ id: string, type: string, title: string, text: string, confirmButton?: string, cancelButton?: string }>('ALERT_SHOW');
export const alertClose = actionCreator<{ id: string, success: string, error: string }>('ALERT_CLOSE');
export const ecosystemInit = actionCreator.async<{ section: string }, { stylesheet: string }, string>('ECOSYSTEM_INIT');
export const navigatePage = actionCreator.async<{ name?: string, section?: string, force?: boolean, params: { [key: string]: any }, vde?: boolean }, { section: string }, undefined>('NAVIGATE_PAGE');
export const renderPage = actionCreator.async<{ section: string, name: string, params?: { [key: string]: any }, vde?: boolean }, { menu: TMenu, page: TPage }, string>('RENDER_PAGE');
export const renderLegacyPage = actionCreator.async<{ section: string, name: string, menu: string, params?: { [key: string]: any }, vde?: boolean }, { menu: TMenu }>('RENDER_LEGACY_PAGE');
export const reloadPage = actionCreator.async<{}, { vde: boolean, params: { [key: string]: any }, menu: TMenu, page: TPage }, string>('RELOAD_PAGE');
export const switchSection = actionCreator<string>('SWITCH_SECTION');
export const reset = actionCreator.async<undefined, { menu: TMenu, page: TPage }, string>('RESET');

// Protypo-specific
export const displayData = actionCreator.async<string, string, string>('DISPLAY_DATA');

// Image editor modal window
export const imageEditorOpen = actionCreator<{ mime: string, data: string, width?: number, aspectRatio?: number }>('IMAGE_EDITOR_OPEN');
export const imageEditorClose = actionCreator<string>('IMAGE_EDITOR_CLOSE');

// Notifications
export const fetchNotifications = actionCreator.async<undefined, TProtypoElement[], undefined>('FETCH_NOTIFICATIONS');