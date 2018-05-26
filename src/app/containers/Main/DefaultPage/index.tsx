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
import { navigatePage } from 'modules/content/actions';

export interface IDefaultPageContainerProps {
}

interface IDefaultPageContainerState {
    inited: boolean;
}

interface IDefaultPageContainerDispatch {
    navigatePage: typeof navigatePage.started;
}

class DefaultPageContainer extends React.Component<IDefaultPageContainerProps & IDefaultPageContainerState & IDefaultPageContainerDispatch> {
    componentDidMount() {
        this.props.navigatePage({params: {}});
    }

    componentWillReceiveProps(props: IDefaultPageContainerProps & IDefaultPageContainerState & IDefaultPageContainerDispatch) {
        if (props.inited && props.inited !== this.props.inited) {
            this.props.navigatePage({params: {}});
        }
    }

    render() {
        return null as JSX.Element;
    }
}

const mapStateToProps = (state: IRootState) => ({
    inited: state.content.inited
});

const mapDispatchToProps = {
    navigatePage: navigatePage.started
};

export default connect<IDefaultPageContainerState, IDefaultPageContainerDispatch, IDefaultPageContainerProps>(mapStateToProps, mapDispatchToProps)(DefaultPageContainer);