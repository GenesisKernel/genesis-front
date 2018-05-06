// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { IRootState } from 'modules';
import { reloadPage, navigationToggle, renderSection, navigatePage, closeSection } from 'modules/content/actions';

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
    section: state.content.section,
    sections: state.content.sections,
    navigationSize: state.storage.navigationSize,
    navigationVisible: state.content.sections[state.content.section].menuDisabled ? false : state.content.sections[state.content.section].menuVisible,
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