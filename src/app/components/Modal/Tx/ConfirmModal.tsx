// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { IButtonConfirm } from 'apla/protypo';

import Modal from '../';

export interface ITxConfirmModalProps extends IButtonConfirm {
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