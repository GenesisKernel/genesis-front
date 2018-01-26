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
import { setResizing, navigationToggle } from 'modules/content/actions';
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