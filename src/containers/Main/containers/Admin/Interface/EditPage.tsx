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
import { getPage, editPage } from 'modules/admin/actions';

import EditPage, { IEditPageProps } from 'components/Main/Admin/Interface/EditPage';

class EditPageContainer extends React.Component<IEditPageProps & { getPage: typeof getPage.started, match?: { params: { pageID: string } } }> {
    componentWillMount() {
        this.props.getPage({ session: this.props.session, id: this.props.match.params.pageID });
    }

    render() {
        return (
            <EditPage {...this.props} />
        );
    }
};

const mapStateToProps = (state: IRootState) => ({
    session: state.auth.sessionToken,
    pending: state.admin.pending,
    page: state.admin.page,
    menus: state.admin.menus,
    editPageStatus: state.admin.editPageStatus,
    privateKey: state.auth.privateKey,
    publicKey: state.auth.account.publicKey
});

const mapDispatchToProps = {
    editPage: editPage.started,
    getPage: getPage.started
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPageContainer);