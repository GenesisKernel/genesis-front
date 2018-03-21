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
import { IModal, TModalResultReason } from 'genesis/modal';
import { styles } from 'components/Main';

import Wrapper from 'components/Modal/Wrapper';
import DebugContractModal from 'components/Modal/Editor/DebugContractModal';
import PromptModal from 'components/Modal/PromptModal';
import ImageEditorModal from 'components/Modal/ImageEditorModal';
import MapEditorModal from 'components/Modal/MapEditorModal';
import AboutModal from 'components/Modal/AboutModal';
import InfoModal from 'components/Modal/InfoModal';
import ConfirmModal from './ConfirmModal';
import CreatePageModal from 'components/Modal/Editor/CreatePageModal';
import CreateInterfaceModal from 'components/Modal/Editor/CreateInterfaceModal';
import AuthorizeModal from 'components/Modal/AuthorizeModal';
import SignatureModal from 'components/Modal/Tx/SignatureModal';

const MODAL_COMPONENTS = {
    'AUTHORIZE': AuthorizeModal,
    'TX_SIGNATURE': SignatureModal,
    'CREATE_PAGE': CreatePageModal,
    'CREATE_INTERFACE': CreateInterfaceModal,
    'DEBUG_CONTRACT': DebugContractModal,
    'IMAGE_EDITOR': ImageEditorModal,
    'MAP_EDITOR': MapEditorModal,
    'PROMPT': PromptModal,
    'CONFIRM': ConfirmModal,
    'INFO': InfoModal,
    'ABOUT': AboutModal
};

export interface IModalProviderProps {
    modal: IModal;
    onResult: (params: { reason: TModalResultReason, data: any }) => void;
}

class ModalProvider extends React.Component<IModalProviderProps> {
    onResult(data: any) {
        this.props.onResult({
            reason: 'RESULT',
            data
        });
    }

    onCancel() {
        this.props.onResult({
            reason: 'CANCEL',
            data: null
        });
    }

    render() {
        const Modal = this.props.modal && !this.props.modal.result && MODAL_COMPONENTS[this.props.modal.type] || null;
        return (
            <Wrapper topOffset={styles.headerHeight - 1}>
                {Modal && (
                    <Modal
                        key={this.props.modal.id}
                        active
                        onResult={this.onResult.bind(this)}
                        onCancel={this.onCancel.bind(this)}
                        {...this.props.modal}
                    />
                )}
            </Wrapper>
        );
    }
}

export default ModalProvider;