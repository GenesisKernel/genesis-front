/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
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
            <Route exact path="/:section/:pageName?" component={Page} />
            <Route exact path="*" component={DefaultPage} />
            <Route path="*" render={() => <NotFound main />} />
        </AnimatedSwitch>
    </Main>
);

const mapStateToProps = (state: IRootState) => ({
    network: state.auth.session && state.auth.session.network,
    isAuthorized: !!state.auth.privateKey,
    stylesheet: state.content.stylesheet,
    section: state.sections.section,
    sections: state.sections.sections,
    navigationSize: state.storage.navigationSize,
    navigationVisible: state.sections.sections[state.sections.section] &&
        (state.sections.sections[state.sections.section].menuDisabled ?
            false :
            state.sections.sections[state.sections.section].menuVisible
        ),
    transactionsCount: state.tx.transactions.count()
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onNavigationToggle: () => {
        dispatch(navigationToggle());
    },
    onNavigateHome: () => {
        dispatch(navigatePage.started({ params: {} }));
    },
    onRefresh: (section: string) => {
        dispatch(reloadPage.started({}));
    },
    onSwitchSection: (section: string) => {
        dispatch(renderSection(section));
    },
    onCloseSection: (section: string) => {
        dispatch(closeSection(section));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);