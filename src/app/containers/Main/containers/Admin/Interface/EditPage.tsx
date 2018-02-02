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
import { getPage } from 'modules/admin/actions';
import { navigatePage } from 'modules/content/actions';

import EditPage from 'components/Main/Admin/Interface/EditPage';

export interface IEditPageContainerProps {
    vde?: boolean;
    pageID: string;
}

interface IEditPageContainerState {
    page: { id: string, name: string, menu: string, conditions: string, value: string };
    menus: { id: string, name: string, value: string, conditions: string }[];
}

interface IEditPageContainerDispatch {
    getPage: typeof getPage.started;
    navigatePage: typeof navigatePage.started;
}

class EditPageContainer extends React.Component<IEditPageContainerProps & IEditPageContainerState & IEditPageContainerDispatch> {
    componentDidMount() {
        this.props.getPage({
            id: this.props.pageID,
            vde: this.props.vde
        });
    }

    componentWillReceiveProps(props: IEditPageContainerProps & IEditPageContainerState & IEditPageContainerDispatch) {
        if (this.props.pageID !== props.pageID || this.props.vde !== props.vde) {
            props.getPage({
                id: props.pageID,
                vde: props.vde
            });
        }
    }

    render() {
        return (
            <EditPage {...this.props} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    page: state.admin.page,
    menus: state.admin.menus
});

const mapDispatchToProps = {
    getPage: getPage.started,
    navigatePage: navigatePage.started
};

export default connect<IEditPageContainerState, IEditPageContainerDispatch, IEditPageContainerProps>(mapStateToProps, mapDispatchToProps)(EditPageContainer);