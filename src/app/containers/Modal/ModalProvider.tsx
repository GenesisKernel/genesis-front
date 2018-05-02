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
import { IModal } from 'genesis/modal';
import { modalClose } from 'modules/modal/actions';
import ModalProvider from 'components/Modal/ModalProvider';

interface IModalProviderContainerProps {

}

interface IModalProviderContainerState {
    modal: IModal;
}

interface IModalProviderContainerDispatch {
    modalClose: typeof modalClose;
}

class ModalProviderContainer extends React.Component<IModalProviderContainerProps & IModalProviderContainerState & IModalProviderContainerDispatch> {
    render() {
        return (
            <ModalProvider
                modal={this.props.modal}
                onResult={this.props.modalClose}
            >
                {this.props.children}
            </ModalProvider>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    modal: state.modal
});

const mapDispatchToProps = {
    modalClose: modalClose
};

export default connect<IModalProviderContainerState, IModalProviderContainerDispatch, IModalProviderContainerProps>(mapStateToProps, mapDispatchToProps)(ModalProviderContainer);