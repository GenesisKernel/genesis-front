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

import { IThemeDefinition } from 'genesis/theme';
import platform from 'lib/platform';

const baseTheme: IThemeDefinition = {
    windowBorder: '#4c7dbd',

    headerBackground: '#4c7dbd',
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

    modalHeaderBackground: '#4b7dbd',
    modalHeaderForeground: '#fff',
    modalOutline: '#71a2e0',

    notificationBackground: 'rgba(26, 91, 158, 0.9)',
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
    dropdownMenuOutline: '#add1ff',
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