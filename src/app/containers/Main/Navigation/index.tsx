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

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { ecosystemInit } from 'modules/content/actions';
import { menuPop, menuPush, ecosystemInit as ecosystemInitSection } from 'modules/sections/actions';
import { TMenu } from 'genesis/content';

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
    ecosystemInitSection: typeof ecosystemInitSection.started;
}

const NavigationContainer: React.SFC<INavigationContainerProps & INavigationContainerState & INavigationContainerDispatch> = (props) => (
    <Navigation {...props} />
);

const mapStateToProps = (state: IRootState) => {
    const section = state.sections.sections[state.sections.section] || state.sections.sections.home;
    return {
        preloading: state.content.preloading,
        preloadingError: state.content.preloadingError,
        visible: state.sections.sections[state.sections.section].menuDisabled ? false : state.sections.sections[state.sections.section].menuVisible,
        width: state.storage.navigationSize,
        menus: section.menus
    };
};

const mapDispatchToProps = {
    menuPop,
    menuPush,
    ecosystemInit: ecosystemInit.started,
    ecosystemInitSection: ecosystemInitSection.started
};

export default connect<INavigationContainerState, INavigationContainerDispatch, INavigationContainerProps>(mapStateToProps, mapDispatchToProps)(NavigationContainer);