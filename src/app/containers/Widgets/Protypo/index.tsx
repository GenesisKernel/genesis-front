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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { navigate } from 'modules/engine/actions';
import { menuPush, navigatePage, displayData } from 'modules/content/actions';

import Protypo from 'components/Protypo';
import { IProtypoElement } from 'components/Protypo/Protypo';

export interface IProtypoContainerProps {
    vde?: boolean;
    editable?: boolean;
    wrapper?: JSX.Element;
    context: string;
    payload: IProtypoElement[];
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

const mapStateToProps = (state: IRootState) => ({
    page: state.content.page && state.content.page.name
});

const mapDispatchToProps = {
    navigatePage: navigatePage.started,
    navigate,
    menuPush,
    displayData: displayData.started
};

export default connect<IProtypoContainerState, IProtypoContainerDispatch, IProtypoContainerProps>(mapStateToProps, mapDispatchToProps)(ProtypoContainer);