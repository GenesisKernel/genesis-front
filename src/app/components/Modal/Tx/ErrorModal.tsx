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
import { ITransactionCall, TxError } from 'genesis/tx';

import Modal from '../';

export interface ITxErrorModalProps {
    tx: ITransactionCall;
    error: TxError;
}

class TxErrorModal extends Modal<ITxErrorModalProps, void> {
    render() {
        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id={`tx.error.${this.props.params.error}`} defaultMessage={this.props.params.error} />
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <FormattedMessage id={`tx.error.${this.props.params.error}.desc`} defaultMessage={this.props.params.error} />
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