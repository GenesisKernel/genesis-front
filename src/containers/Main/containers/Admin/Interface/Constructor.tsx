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

import Constructor from 'components/Main/Admin/Interface/Constructor';

export interface IConstructorContainerProps {
    pageID?: string;
    page: { id: string, name: string, value: string };
    tabs: any;
    session: string;
}

class ConstructorContainer extends React.Component<IConstructorContainerProps & { getPage?: typeof getPage.started } > {
    componentWillMount() {
        this.props.getPage({ id: this.props.pageID });
    }

    render() {
        let page = this.props.tabs && this.props.tabs[this.props.pageID] && this.props.tabs[this.props.pageID].data || null;

        return (
            <Constructor {...this.props} page={page} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    page: state.admin.page,
    tabs: state.admin.constructor && state.admin.constructor.tabs || null,
    session: state.auth.sessionToken
});

const mapDispatchToProps = {
    getPage: getPage.started
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorContainer);