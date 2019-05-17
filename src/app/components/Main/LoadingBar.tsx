/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import LoadingBarNative from 'react-redux-loading-bar';
import { withTheme } from 'styled-components';
import { IThemeDefinition } from 'apla/theme';
import themed from 'components/Theme/themed';

export interface ILoadingBarProps {
    theme: IThemeDefinition;
}

const StyledLoadingBar = themed(LoadingBarNative)`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
`;

const LoadingBar: React.SFC<ILoadingBarProps> = props => (
    <StyledLoadingBar
        showFastActions
        style={{
            backgroundColor: props.theme.progressBarForeground,
            width: 'auto',
            height: 2
        }}
    />
);

export default withTheme(LoadingBar);