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
import { ITransactionCall, TTxError } from 'genesis/tx';

import Modal from '../';

export interface ITxErrorModalProps {
    tx: ITransactionCall;
    error: {
        type: TTxError,
        error?: string
    };
}

class TxErrorModal extends Modal<ITxErrorModalProps, void> {
    render() {
        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id={`tx.error.${this.props.params.error.type}`} defaultMessage={this.props.params.error.type} />
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <FormattedMessage
                            id={`tx.error.${this.props.params.error.type}.desc`}
                            defaultMessage={this.props.params.error.type}
                            values={{
                                error: this.props.params.error.error,
                                contract: this.props.params.tx.name
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="primary" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                </Modal.Footer>
            </div>
        );
    }
}
export default TxErrorModal;