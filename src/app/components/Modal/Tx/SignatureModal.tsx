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

import * as React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import Modal from '../';
import { FormattedMessage } from 'react-intl';

export interface ISignatureModalProps {
    txParams: { [key: string]: any };
    signs: {
        field: string;
        title: string;
        params: {
            name: string;
            text: string;
        }[];
    }[];
    contract: string;
}

class SignatureModal extends Modal<ISignatureModalProps, boolean> {
    onSuccess(values: { [key: string]: any }) {
        this.props.onResult(true);
    }

    render() {
        return (
            <div>
                <Modal.Header>
                    <FormattedMessage id="modal.authorization.title" defaultMessage="Authorization" />
                </Modal.Header>
                <Modal.Body>
                    {this.props.params.signs.map((sign, index) => (
                        <div key={index} className="text-left">
                            <div>{sign.title}</div>
                            <div>
                                {sign.params.map(param => (
                                    <div key={param.name}>
                                        <hr />
                                        <Row>
                                            <Col md={6}>
                                                <div>
                                                    <strong>{param.name}</strong>
                                                </div>
                                                <div className="text-muted">{param.text}</div>
                                            </Col>
                                            <Col md={6}>
                                                <div>
                                                    <strong>
                                                        <FormattedMessage id="tx.param.value" defaultMessage="Value" />
                                                    </strong>
                                                </div>
                                                <span>
                                                    {this.props.params.txParams[param.name] || '-'}
                                                </span>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Button bsStyle="primary" onClick={this.props.onResult.bind(null, true)}>
                        <FormattedMessage id="confirm" defaultMessage="Confirm" />
                    </Button>
                </Modal.Footer>
            </div>
        );
    }
}
export default SignatureModal;