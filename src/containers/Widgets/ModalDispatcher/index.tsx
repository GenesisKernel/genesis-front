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
import { imageEditorClose } from 'modules/content/actions';

import ImageEditorModal from 'components/Modal/ImageEditorModal';

interface IModalDispatcherState {
    imageEditorData: string;
    imageEditorAspectRatio: number;
    imageEditorWidth: number;
}

interface IModalDispatcherDispatch {
    imageEditorClose: typeof imageEditorClose;
}

// TODO: Currently supports only one type of modal window
// will be reworked in the near future
class ModalDispatcherContainer extends React.Component<IModalDispatcherState & IModalDispatcherDispatch> {
    render() {
        return this.props.imageEditorData && (
            <div className="modal fade in" role="dialog" style={{ display: 'block' }}>
                <ImageEditorModal
                    data={this.props.imageEditorData}
                    width={this.props.imageEditorWidth}
                    aspectRatio={this.props.imageEditorAspectRatio}
                    onSuccess={this.props.imageEditorClose}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    imageEditorData: state.content.imageEditor.data,
    imageEditorAspectRatio: state.content.imageEditor.aspectRatio,
    imageEditorWidth: state.content.imageEditor.minWidth
});

const mapDispatchToProps = {
    imageEditorClose
};

export default connect<IModalDispatcherState, IModalDispatcherDispatch, {}>(mapStateToProps, mapDispatchToProps)(ModalDispatcherContainer);