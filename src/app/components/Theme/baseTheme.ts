/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IThemeDefinition } from 'apla/theme';
import platform from 'lib/platform';

const baseTheme: IThemeDefinition = {
    windowBorder: '#4c7dbd',

    headerBackground: '#586180',
    headerForeground: '#fff',
    headerBackgroundActive: '#f3f3f3',
    headerForegroundActive: '#194a8a',
    headerHeight: platform.select({ desktop: 28, web: 0 }),

    toolbarBackground: '#f3f3f3',
    toolbarForeground: '#194a8a',
    toolbarOutline: '#e5e5e5',
    toolbarIconColor: '#5b97e4',
    toolbarIconHighlight: '#a9ccf9',
    toolbarDisabled: '#93a7bf',
    toolbarHeight: 40,

    progressBarForeground: '#b2c5dc',

    menuHeight: 40,
    menuBackground: '#fff',
    menuForeground: '#0a1d33',
    menuBackgroundActive: '#ececec',
    menuOutline: '#e5e4e5',
    menuIconColor: '#3577cc',
    menuPrimaryForeground: '#2886ff',
    menuPrimaryActive: '#7bb0f5',

    contentForeground: '#515253',
    contentBackground: '#f6f7fa',

    editorBackground: '#c3c7ce',

    modalHeaderBackground: '#6d7696',
    modalHeaderForeground: '#fff',
    modalOutline: '#979eb7',

    notificationBackground: 'rgba(62, 72, 111, 0.9)',
    notificationForeground: 'rgba(255, 255, 255, 0.6)',
    notificationIconColor: '#fff',
    notificationPrimaryForeground: '#fff',

    sectionButtonOutline: '#9eb4d0',
    sectionButtonBackground: '#e9eef5',
    sectionButtonForeground: '#194a8a',
    sectionButtonActive: '#9eb4d1',
    sectionButtonPrimary: '#fff',

    dropdownMenuBackground: '#fff',
    dropdownMenuForeground: '#666',
    dropdownMenuDisabled: '#ccc',
    dropdownMenuOutline: '#c5cbe2',
    dropdownMenuActive: 'rgba(0,0,0,0.1)',
    dropdownMenuSeparator: '#ddd',
    dropdownMenuPrimary: '#4b7dbd',
    dropdownMenuSecondary: '#999',

    systemButtonSecondary: '#ffa500',
    systemButtonActive: 'rgba(0,0,0,0.1)',

    securityWarningBackground: '#ff5555',
    securityWarningForeground: '#ffffff'
};

export default baseTheme;