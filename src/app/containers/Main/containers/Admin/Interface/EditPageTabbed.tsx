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
import { getPage } from 'modules/admin/actions';
import { navigatePage } from 'modules/content/actions';

import EditPage from 'components/Main/Admin/Interface/EditPage';

interface IEditPageProps {
    vde?: boolean;
    pageID: string;
    tabData: any;
    // page: { id: string, name: string, menu: string, conditions: string, value: string };
    menus: { id: string, name: string, conditions: string, value: string }[];
    navigatePage?: (params: { name: string, params?: any }) => void;
    getPage?: typeof getPage.started;

}

class EditPageContainer extends React.Component<IEditPageProps> {
    componentWillMount() {
        this.props.getPage({ id: this.props.pageID });
    }

    render() {
        let page = this.props.tabData && this.props.tabData['interfacePage' + this.props.pageID] && this.props.tabData['interfacePage' + this.props.pageID].data || null;

        return (
            <EditPage page={page} menus={this.props.menus} tabView={true} navigatePage={this.props.navigatePage} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    tabData: state.admin.tabs && state.admin.tabs.data || null,
    // page: state.admin.page,
    menus: state.admin.menus
});

const mapDispatchToProps = {
    getPage: getPage.started,
    navigatePage: navigatePage.started
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPageContainer);