/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { navigatePage } from '../../modules/sections/actions';

import PageLink from 'components/Routing/PageLink';

export interface IPageLinkContainerProps {
    page: string;
    section?: string;
    className?: string;
    params?: {
        [key: string]: string;
    };
}

interface IPageLinkContainerState {
    mainSection: string;
    currentSection: string;
}

interface IPageLinkContainerDispatch {
    navigatePage: typeof navigatePage.started;
}

const PageLinkContainer: React.SFC<IPageLinkContainerProps & IPageLinkContainerState & IPageLinkContainerDispatch> = (props) => (
    <PageLink {...props} />
);

const mapStateToProps = (state: IRootState) => ({
    mainSection: state.sections.mainSection,
    currentSection: state.sections.section
});

const mapDispatchToProps = {
    navigatePage: navigatePage.started
};

export default connect<IPageLinkContainerState, IPageLinkContainerDispatch, IPageLinkContainerProps>(mapStateToProps, mapDispatchToProps)(PageLinkContainer);