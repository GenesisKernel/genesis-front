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
import { navigate } from 'modules/engine/actions';
import { menuPush, navigatePage } from 'modules/content/actions';

import Protypo from 'components/Protypo';
import { IProtypoElement } from 'components/Protypo/Protypo';

export interface IProtypoContainerProps {
    wrapper?: JSX.Element;
    payload: IProtypoElement[];
}

interface IProtypoContainerState {
    page: string;
}

interface IProtypoContainerDispatch {
    navigatePage: typeof navigatePage.started;
    navigate: typeof navigate;
    menuPush: typeof menuPush;
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
    menuPush
};

export default connect<IProtypoContainerState, IProtypoContainerDispatch, IProtypoContainerProps>(mapStateToProps, mapDispatchToProps)(ProtypoContainer);