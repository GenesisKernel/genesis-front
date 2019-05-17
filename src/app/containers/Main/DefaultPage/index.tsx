/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { ecosystemInit } from 'modules/content/actions';

export interface IDefaultPageContainerProps {
}

interface IDefaultPageContainerState {

}

interface IDefaultPageContainerDispatch {
    ecosystemInit: typeof ecosystemInit.started;
}

class DefaultPageContainer extends React.Component<IDefaultPageContainerProps & IDefaultPageContainerState & IDefaultPageContainerDispatch> {
    componentDidMount() {
        this.props.ecosystemInit({});
    }

    render() {
        return null as JSX.Element;
    }
}

const mapStateToProps = (state: IRootState) => ({

});

const mapDispatchToProps = {
    ecosystemInit: ecosystemInit.started
};

export default connect<IDefaultPageContainerState, IDefaultPageContainerDispatch, IDefaultPageContainerProps>(mapStateToProps, mapDispatchToProps)(DefaultPageContainer);