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
import { getMenus } from 'modules/admin/actions';
import { navigate } from 'modules/engine/actions';

import CreatePage from 'components/Main/Admin/Interface/CreatePage';

export interface ICreatePageContainerProps {
    vde?: boolean;
}

interface ICreatePageContainerState {
    menus: {
        id: string;
        name: string;
        value: string;
        conditions: string;
    }[];
}

interface ICreatePageContainerDispatch {
    getMenus: typeof getMenus.started;
    navigate: typeof navigate;
}

class CreatePageContainer extends React.Component<ICreatePageContainerProps & ICreatePageContainerState & ICreatePageContainerDispatch> {
    componentWillMount() {
        this.props.getMenus({
            vde: this.props.vde
        });
    }

    render() {
        return (
            <CreatePage {...this.props} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    menus: state.admin.menus
});

const mapDispatchToProps = {
    getMenus: getMenus.started,
    navigate: navigate
};

export default connect<ICreatePageContainerState, ICreatePageContainerDispatch, ICreatePageContainerProps>(mapStateToProps, mapDispatchToProps)(CreatePageContainer);