/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { setResizing } from 'modules/content/actions';
import { navigationToggle } from 'modules/sections/actions';
import { saveNavigationSize } from 'modules/storage/actions';

import ResizeHandle from 'components/Main/Navigation/ResizeHandle';

interface IResizeHandleContainerProps {

}

interface IResizeHandleContainerState {
    width: number;
    resizing: boolean;
    disabled: boolean;
}

interface IResizeHandleContainerDispatch {
    setResizing: typeof setResizing;
    navigationResize: typeof saveNavigationSize;
    navigationToggle: typeof navigationToggle;
}

const ResizeHandleContainer: React.SFC<IResizeHandleContainerProps & IResizeHandleContainerState & IResizeHandleContainerDispatch> = (props) => (
    <ResizeHandle {...props} />
);

const mapStateToProps = (state: IRootState) => ({
    width: state.storage.navigationSize,
    resizing: state.content.navigationResizing,
    disabled: !state.engine.isCollapsed
});

const mapDispatchToProps = {
    setResizing,
    navigationResize: saveNavigationSize,
    navigationToggle
};

export default connect<IResizeHandleContainerState, IResizeHandleContainerDispatch, IResizeHandleContainerProps>(mapStateToProps, mapDispatchToProps)(ResizeHandleContainer);