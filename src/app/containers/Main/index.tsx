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
import { connect, Dispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { IRootState } from 'modules';
import { reloadPage, navigationToggle, renderSection, navigatePage, closeSection } from '../../modules/sections/actions';

import { AnimatedSwitch } from 'components/Animation';
import Main, { IMainProps } from 'components/Main';
import DefaultPage from 'containers/Main/DefaultPage';
import Page from 'containers/Main/Page';
import NotFound from 'components/NotFound';

const MainContainer: React.SFC<IMainProps> = props => (
    <Main {...props}>
        <AnimatedSwitch animation={AnimatedSwitch.animations.fade()}>
            <Route exact path="/" component={DefaultPage} />
            <Route exact path="/:section/:pageName?" component={Page} />
            <Route path="*" render={() => <NotFound main />} />
        </AnimatedSwitch>
    </Main>
);

const mapStateToProps = (state: IRootState) => ({
    nodeUrl: state.auth.session && state.auth.session.apiHost,
    isAuthorized: !!state.auth.privateKey,
    stylesheet: state.content.stylesheet,
    section: state.sections.section,
    sections: state.sections.sections,
    navigationSize: state.storage.navigationSize,
    navigationVisible: state.sections.sections[state.sections.section].menuDisabled ? false : state.sections.sections[state.sections.section].menuVisible,
    transactionsCount: state.tx.transactions.count(),
    pendingTransactions: state.tx.transactions.takeLast(5)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onNavigationToggle: () => {
        dispatch(navigationToggle());
    },
    onNavigateHome: () => {
        dispatch(navigatePage.started({ params: {} }));
    },
    onRefresh: (section: string) => {
        dispatch(reloadPage.started(section));
    },
    onSwitchSection: (section: string) => {
        dispatch(renderSection(section));
    },
    onCloseSection: (section: string) => {
        dispatch(closeSection(section));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);