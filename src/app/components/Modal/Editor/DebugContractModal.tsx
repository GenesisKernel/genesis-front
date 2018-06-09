// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
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
import { Button, Well, Row, Col } from 'react-bootstrap';
import imgClose from 'images/close.svg';

import Modal from '../';
import { FormattedMessage, injectIntl } from 'react-intl';
import Validation from 'components/Validation';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Table, { ICellRenderer } from 'components/Table';

export interface IDebugContractModalProps {
    contract: string;
}

interface IDebugContractModalState {
    pending: boolean;
    params: { key: string, value: string }[];
    result: {
        block?: string;
        error?: {
            type: string;
            error: string;
        }
    };
}

class DebugContractModal extends Modal<IDebugContractModalProps, void, IDebugContractModalState> {
    constructor(props: any) {
        super(props);
        this.state = {
            pending: false,
            params: [],
            result: null
        };
    }

    mapContractParams = () => {
        this.setState({
            pending: true
        });

        const params = {};
        this.state.params.forEach(l => {
            params[l.key] = l.value;
        });

        return params;
    }

    renderParameter: ICellRenderer = (value, rowData) => {
        const index = rowData.rowData[2] as number;

        switch (rowData.colIndex) {
            case 0: return (
                <Validation.components.ValidatedFormGroup for={index + '_key'} className="m0">
                    <Validation.components.ValidatedControl
                        type="text"
                        name={index + '_key'}
                        value={value}
                        validators={[Validation.validators.required]}
                        onChange={(e: any) => this.onKeyUpdate(index, e.target.value)}
                    />
                </Validation.components.ValidatedFormGroup>
            );

            case 1: return (
                <Validation.components.ValidatedFormGroup for={index + '_value'} className="m0">
                    <Validation.components.ValidatedControl
                        type="text"
                        name={index + '_value'}
                        value={value}
                        onChange={(e: any) => this.onValueUpdate(index, e.target.value)}
                    />
                </Validation.components.ValidatedFormGroup>
            );

            case 2: return (
                <button className="btn-link" onClick={this.onRemoveParam.bind(this, index)}>
                    <img src={imgClose} />
                </button>
            );

            default: return null;
        }
    }

    onKeyUpdate = (index: number, key: string) => {
        this.setState({
            params: [
                ...this.state.params.slice(0, index),
                {
                    key,
                    value: this.state.params[index].value,
                },
                ...this.state.params.slice(index + 1)
            ]
        });
    }

    onValueUpdate = (index: number, value: string) => {
        this.setState({
            params: [
                ...this.state.params.slice(0, index),
                {
                    key: this.state.params[index].key,
                    value
                },
                ...this.state.params.slice(index + 1)
            ]
        });
    }

    onExec = (block: string, error?: { type: string, error: string }) => {
        this.setState({
            pending: false,
            result: {
                block,
                error
            }
        });
    }

    onAddParam = () => {
        this.setState({
            params: [
                ...this.state.params.slice(),
                {
                    key: '',
                    value: ''
                }
            ]
        });
    }

    onRemoveParam = (index: number) => {
        this.setState({
            params: [
                ...this.state.params.slice(0, index),
                ...this.state.params.slice(index + 1)
            ]
        });
    }

    render() {
        return (
            <ValidatedContractForm silent contract={this.props.params.contract} contractParams={this.mapContractParams} onExec={this.onExec}>
                <Modal.Header>
                    <FormattedMessage id="contract.exec" defaultMessage="Execute contract" />
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} style={{ width: 400 }}>
                            <Table
                                striped
                                collapse
                                renderCell={this.renderParameter}
                                columns={[
                                    { title: 'Key', width: 140 },
                                    { title: 'Value' },
                                    { width: 1 }
                                ]}
                                data={this.state.params.map((param, index) => [param.key, param.value, index])}
                            />
                            <Button bsStyle="primary" block onClick={this.onAddParam}>
                                <FormattedMessage id="editor.param.add" defaultMessage="Add parameter" />
                            </Button>
                        </Col>
                        <Col md={6} style={{ width: 300 }}>
                            <Well style={{ whiteSpace: 'pre-wrap' }}>
                                {this.state.pending && (
                                    <div>
                                        <FormattedMessage id="pending" defaultMessage="Pending" />
                                    </div>
                                )}
                                {!this.state.pending && (
                                    <div>
                                        {JSON.stringify(this.state.result, null, 3)}
                                    </div>
                                )}
                            </Well>
                        </Col>
                    </Row>
                </Modal.Body >
                <Modal.Footer className="text-right">
                    <Button type="button" bsStyle="link" onClick={this.props.onCancel.bind(this)}>
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Validation.components.ValidatedSubmit bsStyle="primary">
                        <FormattedMessage id="exec" defaultMessage="Exec" />
                    </Validation.components.ValidatedSubmit>
                </Modal.Footer>
            </ValidatedContractForm >
        );
    }
}
export default injectIntl(DebugContractModal);