/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'apla/theme' {
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

        securityWarningBackground: string;
        securityWarningForeground: string;
    }
}