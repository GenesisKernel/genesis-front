/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IModal } from 'apla/modal';
import { modalClose } from 'modules/modal/actions';
import { enqueueNotification } from 'modules/notifications/actions';
import { setLocale } from 'modules/engine/actions';

import ModalProvider from 'components/Modal/ModalProvider';

interface IModalProviderContainerProps {

}

interface IModalProviderContainerState {
    modal: IModal;
}

interface IModalProviderContainerDispatch {
    modalClose: typeof modalClose;
    enqueueNotification: typeof enqueueNotification;
    changeLocale: typeof setLocale.started;
}

class ModalProviderContainer extends React.Component<IModalProviderContainerProps & IModalProviderContainerState & IModalProviderContainerDispatch> {
    render() {
        return (
            <ModalProvider
                modal={this.props.modal}
                onResult={this.props.modalClose}
                enqueueNotification={this.props.enqueueNotification}
                changeLocale={this.props.changeLocale}
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
    modalClose: modalClose,
    enqueueNotification: enqueueNotification,
    changeLocale: setLocale.started
};

export default connect<IModalProviderContainerState, IModalProviderContainerDispatch, IModalProviderContainerProps>(mapStateToProps, mapDispatchToProps)(ModalProviderContainer);