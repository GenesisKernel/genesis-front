/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { ecosystemInit } from 'modules/content/actions';
import { menuPop, menuPush } from 'modules/sections/actions';
import { TMenu } from 'apla/content';

import Navigation from 'components/Main/Navigation';

interface INavigationContainerProps {

}

interface INavigationContainerState {
    preloading: boolean;
    preloadingError: string;
    visible: boolean;
    width: number;
    menus: TMenu[];
}

interface INavigationContainerDispatch {
    menuPop: typeof menuPop;
    menuPush: typeof menuPush;
    ecosystemInit: typeof ecosystemInit.started;
}

const NavigationContainer: React.SFC<INavigationContainerProps & INavigationContainerState & INavigationContainerDispatch> = (props) => (
    <Navigation {...props} />
);

const mapStateToProps = (state: IRootState) => {
    const section = state.sections.sections[state.sections.section] || state.sections.sections.home;
    return {
        preloading: state.content.preloading,
        preloadingError: state.content.preloadingError,
        visible: state.sections.sections[state.sections.section] && (
            state.sections.sections[state.sections.section].menuDisabled ?
                false :
                state.sections.sections[state.sections.section].menuVisible
        ),
        width: state.storage.navigationSize,
        menus: section ? section.menus : []
    };
};

const mapDispatchToProps = {
    menuPop,
    menuPush,
    ecosystemInit: ecosystemInit.started
};

export default connect<INavigationContainerState, INavigationContainerDispatch, INavigationContainerProps>(mapStateToProps, mapDispatchToProps)(NavigationContainer);