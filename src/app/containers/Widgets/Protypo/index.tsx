/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { navigate } from 'modules/engine/actions';
import { displayData } from 'modules/content/actions';
import { navigatePage, menuPush } from 'modules/sections/actions';
import { TProtypoElement } from 'apla/protypo';

import Protypo from 'components/Protypo';

export interface IProtypoContainerProps {
    editable?: boolean;
    wrapper?: JSX.Element;
    context: string;
    content: TProtypoElement[];
    changePage?: any;
    setTagCanDropPosition?: any;
    addTag?: any;
    moveTag?: any;
    copyTag?: any;
    removeTag?: any;
    selectTag?: any;
    selectedTag?: any;
    logic?: boolean;
}

interface IProtypoContainerState {
    apiHost: string;
    page: string;
}

interface IProtypoContainerDispatch {
    navigatePage: typeof navigatePage.started;
    navigate: typeof navigate;
    menuPush: typeof menuPush;
    displayData: typeof displayData.started;
}

const ProtypoContainer: React.SFC<IProtypoContainerState & IProtypoContainerDispatch & IProtypoContainerProps> = (props) => (
    <Protypo {...props} />
);

const mapStateToProps = (state: IRootState) => {
    const section = state.sections.sections[state.sections.section];

    return {
        apiHost: state.auth.session && (state.auth.session.network.apiHost + '/api/v2'),
        section: state.sections.section,
        page: section && section.page && section.page.name
    };
};

const mapDispatchToProps = {
    navigatePage: navigatePage.started,
    navigate,
    menuPush,
    displayData: displayData.started
};

export default connect<IProtypoContainerState, IProtypoContainerDispatch, IProtypoContainerProps>(mapStateToProps, mapDispatchToProps)(ProtypoContainer);