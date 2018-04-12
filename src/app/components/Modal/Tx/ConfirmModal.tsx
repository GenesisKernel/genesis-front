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
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { ITransactionConfirm } from 'genesis/tx';

import Modal from '../';

export interface ITxConfirmModalProps extends ITransactionConfirm {
}

class TxConfirmModal extends Modal<ITxConfirmModalProps, void> {
    render() {
        return (
            <div>
                <Modal.Header>
                    {this.props.params.title ?
                        (
                            <div>{this.props.params.title}</div>
                        ) : (
                            <FormattedMessage id="modal.confirm.title" defaultMessage="Confirmation" />
                        )
                    }
                </Modal.Header>
                <Modal.Body>
                    <div>{this.props.params.text}</div>
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onCancel.bind(this)}>
                        {this.props.params.cancelButton ?
                            (
                                <div>{this.props.params.cancelButton}</div>
                            ) : (
                                <FormattedMessage id="cancel" defaultMessage="Cancel" />
                            )
                        }
                    </Button>
                    <Button bsStyle="primary" onClick={this.props.onResult.bind(null, true)}>
                        {this.props.params.confirmButton ?
                            (
                                <div>{this.props.params.confirmButton}</div>
                            ) : (
                                <FormattedMessage id="confirm" defaultMessage="Confirm" />
                            )
                        }
                    </Button>
                </Modal.Footer>
            </div >
        );
    }
}
export default TxConfirmModal;