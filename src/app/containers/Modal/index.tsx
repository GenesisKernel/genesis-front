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
import * as uuid from 'uuid';
import * as propTypes from 'prop-types';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { modalShow, modalClose } from 'modules/content/actions';
import { IModal } from 'genesis/modal';

interface IModalContainerProps {
    active: boolean;
    type: string;
    params: {
        [key: string]: any;
    };
    component: React.ReactNode;
    onResult: (data: any) => void;
}

interface IModalContainerState {
    modal: IModal;
}

interface IModalContainerDispatch {
    modalShow: typeof modalShow;
    modalClose: typeof modalClose;
}

class ModalContainer extends React.Component<IModalContainerProps & IModalContainerState & IModalContainerDispatch> {
    private _uuid: string;
    private _type: string;

    static contextTypes = {
        bindModal: propTypes.func.isRequired,
        unbindModal: propTypes.func.isRequired
    };

    componentDidMount() {
        this._uuid = uuid.v4();
        this._type = this.props.type;

        this.context.bindModal(this._uuid, this.props.component);
    }

    componentWillUnmount() {
        this.context.unbindModal(this._uuid);
    }

    componentWillReceiveProps(props: IModalContainerProps & IModalContainerState & IModalContainerDispatch) {
        // Yield results if we are listening to this id
        if (props.modal && props.modal.id === this._uuid && props.modal.result && !this.props.modal.result) {
            this.props.onResult(props.modal.result.data);
        }

        // Open new modal window if active = true
        if (!this.props.active && props.active) {
            if (props.modal && !props.modal.result) {
                props.modalClose({
                    reason: 'OVERLAP',
                    data: null
                });
            }

            setImmediate(() =>
                props.modalShow({
                    id: this._uuid,
                    type: this._type,
                    params: props.params,
                })
            );
        }
        // Close current modal window if active = false and id is equal to the current one
        else if (props.modal && props.modal.id === this._uuid && !props.modal.result && this.props.active && !props.active) {
            this.props.modalClose({
                reason: 'CANCEL',
                data: props.modal.result
            });
        }
    }

    render(): JSX.Element {
        return null;
    }
}

const mapStateToProps = (state: IRootState) => ({
    modal: state.content.modal
});

const mapDispatchToProps = {
    modalShow: modalShow,
    modalClose: modalClose
};

export default connect<IModalContainerState, IModalContainerDispatch, IModalContainerProps>(mapStateToProps, mapDispatchToProps)(ModalContainer);