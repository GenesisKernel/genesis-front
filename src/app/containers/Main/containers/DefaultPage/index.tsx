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
import { navigatePage } from 'modules/content/actions';

import { IProtypoElement } from 'components/Protypo/Protypo';
import Page from 'components/Main/Page';

export interface IDefaultPageContainerProps {
}

interface IDefaultPageContainerState {
    page: { name: string, content: IProtypoElement[] };
}

interface IDefaultPageContainerDispatch {
    navigatePage: typeof navigatePage.started;
}

class DefaultPageContainer extends React.Component<IDefaultPageContainerProps & IDefaultPageContainerState & IDefaultPageContainerDispatch> {
    componentWillMount() {
        this.props.navigatePage({
            name: 'default_page',
            params: null
        });
    }

    render() {
        return (
            <Page
                name={this.props.page && this.props.page.name}
                payload={this.props.page && this.props.page.content}
            />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    page: state.content.page
});

const mapDispatchToProps = {
    navigatePage: navigatePage.started
};

export default connect<IDefaultPageContainerState, IDefaultPageContainerDispatch, IDefaultPageContainerProps>(mapStateToProps, mapDispatchToProps)(DefaultPageContainer);