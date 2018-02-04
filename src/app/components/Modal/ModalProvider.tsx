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
import * as propTypes from 'prop-types';
import { TModalComponentClass } from 'components/Modal';
import { IModal, TModalResultReason } from 'genesis/modal';
import { Map } from 'immutable';

export interface IModalProviderProps {
    modal: IModal;
    onResult: (params: { reason: TModalResultReason, data: any }) => void;
}

class ModalProvider extends React.Component<IModalProviderProps> {
    static childContextTypes = {
        bindModal: propTypes.func.isRequired,
        unbindModal: propTypes.func.isRequired
    };

    private _bindings: Map<string, TModalComponentClass<any, any>> = Map();

    getChildContext() {
        return {
            bindModal: this.bindModal.bind(this),
            unbindModal: this.unbindModal.bind(this),
        };
    }

    bindModal(id: string, component: TModalComponentClass<any, any>) {
        this._bindings = this._bindings.set(id, component);
    }

    unbindModal(id: string) {
        this._bindings = this._bindings.remove(id);
    }

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

    render(): any {
        const Modal = this.props.modal && !this.props.modal.result && this._bindings.get(this.props.modal.id);
        return [
            Modal ? (
                <Modal
                    key={this.props.modal.id}
                    active
                    onResult={this.onResult.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                    {...this.props.modal}
                />
            ) : null,
            this.props.children
        ];
    }
}

export default ModalProvider;