/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import actionCreatorFactory from 'typescript-fsa';
import { TMenu, TPage, TSection } from 'apla/content';

const actionCreator = actionCreatorFactory('section');

// Navigation
export const renderSection = actionCreator<string>('RENDER_SECTION');
export const updateSection = actionCreator<TSection>('UPDATE_SECTION');
export const closeSection = actionCreator<string>('CLOSE_SECTION');
export const switchSection = actionCreator<string>('SWITCH_SECTION');
export const reset = actionCreator('RESET');
export const menuPop = actionCreator('MENU_POP');
export const menuPush = actionCreator<TMenu>('MENU_PUSH');
export const navigatePage = actionCreator.async<{ name?: string, section?: string, force?: boolean, params: { [key: string]: any } }, { section: string }, undefined>('NAVIGATE_PAGE');
export const navigationToggle = actionCreator('NAVIGATION_TOGGLE');
export const renderPage = actionCreator.async<{ key: string, section: string, name: string, params?: { [key: string]: any } }, { defaultMenu: TMenu, menu: TMenu, page: TPage }, string>('RENDER_PAGE');
export const renderLegacyPage = actionCreator.async<{ section: string, name: string, menu: string, params?: { [key: string]: any } }, { menu: TMenu }>('RENDER_LEGACY_PAGE');
export const reloadPage = actionCreator.async<{}, { params: { [key: string]: any }, menu: TMenu, page: TPage }, string>('RELOAD_PAGE');
export const sectionsInit = actionCreator.async<string, { mainSection: string, section: string, sections: TSection[] }>('SECTIONS_INIT');
