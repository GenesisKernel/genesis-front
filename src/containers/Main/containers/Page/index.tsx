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
import { renderPage, menuPush } from 'modules/content/actions';

import { IProtypoElement } from 'components/Protypo/Protypo';
import Page from 'components/Main/Page';

interface IPageContainerProps {
    session: string;
    pending: boolean;
    page: { name: string, content: IProtypoElement[] };
    match?: { params: { pageName: string } };
    renderPage: typeof renderPage.started;
    menuPush: typeof menuPush;
}

class PageContainer extends React.Component<IPageContainerProps> {
    componentWillMount() {
        this.props.renderPage({
            session: this.props.session,
            name: this.props.match.params.pageName
        });
    }

    componentWillReceiveProps(props: IPageContainerProps) {
        if (this.props.page && (this.props.match.params.pageName !== props.match.params.pageName)) {
            props.renderPage({
                session: this.props.session,
                name: props.match.params.pageName
            });
        }
    }

    render() {
        return (
            <Page
                payload={this.props.page && this.props.page.content}
                menuPush={this.props.menuPush.bind(this)}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    session: state.auth.sessionToken,
    pending: state.content.pending,
    page: state.content.page
});

const mapDispatchToProps = {
    renderPage: renderPage.started,
    menuPush: menuPush
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);