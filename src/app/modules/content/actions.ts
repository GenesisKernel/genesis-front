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
import { TMenu, TPage, TEditorTab } from 'genesis/content';
import { TProtypoElement } from 'genesis/protypo';
import { TModalResultReason } from 'genesis/modal';

const actionCreator = actionCreatorFactory('content');

// Navigation
export const setResizing = actionCreator<boolean>('SET_RESIZING');
export const navigationToggle = actionCreator('NAVIGATION_TOGGLE');
export const menuPop = actionCreator('MENU_POP');
export const menuPush = actionCreator<TMenu>('MENU_PUSH');
export const alertShow = actionCreator<{ id: string, type: string, title: string, text: string, confirmButton?: string, cancelButton?: string }>('ALERT_SHOW');
export const alertClose = actionCreator<{ id: string, success: string, error: string }>('ALERT_CLOSE');
export const ecosystemInit = actionCreator.async<{ section: string }, { stylesheet: string }, string>('ECOSYSTEM_INIT');
export const navigatePage = actionCreator.async<{ name?: string, section?: string, force?: boolean, params: { [key: string]: any }, vde?: boolean }, { section: string, leftVDE: boolean, enteredVDE: boolean }, undefined>('NAVIGATE_PAGE');
export const renderPage = actionCreator.async<{ section: string, name: string, params?: { [key: string]: any }, vde?: boolean }, { menu: TMenu, page: TPage }, string>('RENDER_PAGE');
export const renderLegacyPage = actionCreator.async<{ section: string, name: string, menu: string, params?: { [key: string]: any }, vde?: boolean }, { menu: TMenu }>('RENDER_LEGACY_PAGE');
export const reloadPage = actionCreator.async<{}, { vde: boolean, params: { [key: string]: any }, menu: TMenu, page: TPage }, string>('RELOAD_PAGE');
export const renderSection = actionCreator<string>('RENDER_SECTION');
export const closeSection = actionCreator<string>('CLOSE_SECTION');
export const switchSection = actionCreator<string>('SWITCH_SECTION');
export const reset = actionCreator.async<undefined, { menu: TMenu, page: TPage }, string>('RESET');

// Editor
export const editorSave = actionCreator<TEditorTab>('EDITOR_SAVE');
export const createEditorTab = actionCreator.async<string, { id: string, name: string, value: string }>('CREATE_EDITOR_TAB');
export const loadEditorTab = actionCreator.async<{ type: string, name: string, vde?: boolean }, TEditorTab>('LOAD_EDITOR_TAB');
export const changeEditorTab = actionCreator<number>('CHANGE_EDITOR_TAB');
export const closeEditorTab = actionCreator<number>('CLOSE_EDITOR_TAB');
export const updateEditorTab = actionCreator<string>('UPDATE_EDITOR_TAB');
export const revertEditorTab = actionCreator<number>('REVERT_EDITOR_TAB');
export const reloadEditorTab = actionCreator<{ type: string, id: string, data: { id?: string, new?: boolean, name?: string, tool?: string, value?: string, initialValue?: string, dirty?: boolean } }>('RELOAD_EDITOR_TAB');
export const changeEditorTool = actionCreator.async<string, TProtypoElement[]>('CHANGE_EDITOR_TOOL');

// Protypo-specific
export const displayData = actionCreator.async<string, string, string>('DISPLAY_DATA');

// Modal windows
export const modalShow = actionCreator<{ id: string, type: string, params: { [key: string]: any } }>('MODAL_SHOW');
export const modalClose = actionCreator<{ reason: TModalResultReason, data: any }>('MODAL_CLOSE');

// Notifications
export const fetchNotifications = actionCreator.async<undefined, TProtypoElement[], undefined>('FETCH_NOTIFICATIONS');

// Data-setters
export const setVDEAvailable = actionCreator<boolean>('SET_VDE_AVAILABLE');