// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IProtypoElement } from 'components/Protypo/Protypo';
import { menuPop, menuPush, ecosystemInit } from 'modules/content/actions';

import Navigation from 'components/Main/Navigation';

interface INavigationContainerProps {
    topOffset: number;
}

interface INavigationContainerState {
    isEcosystemOwner: boolean;
    preloading: boolean;
    preloadingError: string;
    visible: boolean;
    width: number;
    menus: {
        name: string;
        content: IProtypoElement[];
    }[];
}

interface INavigationContainerDispatch {
    menuPop: typeof menuPop;
    menuPush: typeof menuPush;
    ecosystemInit: typeof ecosystemInit.started;
}

const NavigationContainer: React.SFC<INavigationContainerProps & INavigationContainerState & INavigationContainerDispatch> = (props) => (
    <Navigation {...props} />
);

const mapStateToProps = (state: IRootState) => ({
    isEcosystemOwner: state.auth.isEcosystemOwner,
    preloading: state.content.preloading,
    preloadingError: state.content.preloadingError,
    visible: state.content.navigationVisible,
    width: state.storage.navigationSize,
    menus: state.content.menus
});

const mapDispatchToProps = {
    menuPop,
    menuPush,
    ecosystemInit: ecosystemInit.started
};

export default connect<INavigationContainerState, INavigationContainerDispatch, INavigationContainerProps>(mapStateToProps, mapDispatchToProps)(NavigationContainer);