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

declare module 'genesis/theme' {
    interface IThemeDefinition {
        windowBorder: string;
        
        headerBackground: string;
        headerForeground: string;
        headerBackgroundActive: string;
        headerForegroundActive: string;
        headerHeight: number;

        toolbarBackground: string;
        toolbarForeground: string;
        toolbarOutline: string;
        toolbarDisabled: string;
        toolbarIconColor: string;
        toolbarIconHighlight: string;
        toolbarHeight: number;

        progressBarForeground: string;

        menuHeight: number;
        menuBackground: string;
        menuForeground: string;
        menuBackgroundActive: string;
        menuOutline: string;
        menuIconColor: string;
        menuPrimaryForeground: string;
        menuPrimaryActive: string;

        contentForeground: string;
        contentBackground: string;

        editorBackground: string;

        modalHeaderBackground: string;
        modalHeaderForeground: string;
        modalOutline: string;

        notificationBackground: string;
        notificationForeground: string;
        notificationIconColor: string;
        notificationPrimaryForeground: string;

        sectionButtonOutline: string;
        sectionButtonBackground: string;
        sectionButtonForeground: string;
        sectionButtonActive: string;
        sectionButtonPrimary: string;

        dropdownMenuBackground: string;
        dropdownMenuForeground: string;
        dropdownMenuDisabled: string;
        dropdownMenuOutline: string;
        dropdownMenuActive: string;
        dropdownMenuSeparator: string;
        dropdownMenuPrimary: string;
        dropdownMenuSecondary: string;

        systemButtonSecondary: string;
        systemButtonActive: string;
    }
}