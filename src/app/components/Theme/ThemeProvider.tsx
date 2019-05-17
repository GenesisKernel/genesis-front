/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ThemeProvider as ThemeProviderNative, ThemeProviderComponent } from 'styled-components';
import { IThemeDefinition } from 'apla/theme';

const ThemeProvider: ThemeProviderComponent<IThemeDefinition> = ThemeProviderNative as ThemeProviderComponent<IThemeDefinition>;

export default ThemeProvider;