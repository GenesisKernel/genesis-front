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
import { renderPage } from 'modules/content/actions';

import { IProtypoElement } from 'components/Protypo/Protypo';
import Page from 'components/Main/Page';

export interface IPageContainerProps {
    match?: { params: { [key: string]: string, pageName: string } };
    location?: {
        state: { params?: { [key: string]: any } };
    };
}

interface IPageContainerState {
    page: { name: string, content: IProtypoElement[], error?: string };
    pending: boolean;
}

interface IPageContainerDispatch {
    renderPage: typeof renderPage.started;
}

class PageContainer extends React.Component<IPageContainerProps & IPageContainerState & IPageContainerDispatch> {
    componentDidMount() {
        this.renderPage(this.props);
    }

    componentWillReceiveProps(props: IPageContainerProps & IPageContainerState & IPageContainerDispatch) {
        this.renderPage(props);
    }

    renderPage(props: IPageContainerProps & IPageContainerState & IPageContainerDispatch) {
        const isVDE = props.match.params && props.match.params['0'] === 'vde';
        if (!props.pending && (!props.page || props.page.name !== props.match.params.pageName)) {
            props.renderPage({
                name: props.match.params.pageName,
                params: props.location.state && props.location.state.params,
                vde: isVDE
            });
        }
    }

    render() {
        const isVDE = this.props.match.params && this.props.match.params['0'] === 'vde';

        return (
            <Page
                vde={isVDE}
                error={this.props.page && this.props.page.error}
                name={this.props.page && this.props.page.name}
                payload={this.props.page && this.props.page.content}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    page: state.content.page,
    pending: state.content.pending
});

const mapDispatchToProps = {
    renderPage: renderPage.started
};

export default connect<IPageContainerState, IPageContainerDispatch, IPageContainerProps>(mapStateToProps, mapDispatchToProps)(PageContainer);