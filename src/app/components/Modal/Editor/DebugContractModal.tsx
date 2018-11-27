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
import { FormattedMessage } from 'react-intl';
import { ITransactionCollection, ITxStatus, ITxError } from 'genesis/tx';
import { TContractFieldType } from 'genesis/api';

import Modal, { IModalProps } from '../';
import Validation from 'components/Validation';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Table, { ICellRenderer } from 'components/Table';

export interface IDebugContractModalProps {
    contract: string;
    fields: {
        name: string;
        type: TContractFieldType;
        optional?: boolean;
    }[];
}

interface IDebugContractModalState {
    pending: boolean;
    result?: ITxError | ITxStatus;
}

class DebugContractModal extends React.Component<IModalProps<IDebugContractModalProps, void>, IDebugContractModalState> {
    state: IDebugContractModalState = {
        pending: false,
        result: undefined
    };

    mapContractParams = (payload: { [key: string]: any }) => {
        this.setState({
            pending: true
        });

        return payload;
    }

    renderParameter: ICellRenderer = (value, rowData) => {
        const field = rowData.rowData[0] as {
            name: string;
            type: TContractFieldType;
            optional?: boolean;
        };

        switch (rowData.colIndex) {
            case 0: return (
                <span className="pl">{field.name}</span>
            );

            case 1:
                return (
                    <Validation.components.ValidatedFormGroup for={field.name} className="pr">
                        {this.renderField(field.name, field.type, field.optional)}
                    </Validation.components.ValidatedFormGroup>
                );

            default: return null;
        }
    }

    onExec = (tx: ITransactionCollection) => {
        this.setState({
            pending: false,
            result: tx.error || tx.stack[0].status
        });
    }

    renderField = (name: string, type: TContractFieldType, optional?: boolean) => {
        switch (type) {
            case 'bool': return (
                <Validation.components.ValidatedCheckbox name={name} title={name} />
            );

            case 'int':
            case 'money':
            case 'float': return (
                <Validation.components.ValidatedControl name={name} type="number" validators={optional ? [] : [Validation.validators.required]} />
            );

            case 'string': return (
                <Validation.components.ValidatedControl name={name} type="text" validators={optional ? [] : [Validation.validators.required]} />
            );

            case 'file': return (
                <Validation.components.ValidatedFile name={name} />
            );

            default: return null;
        }
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
                                ]}
                                data={this.props.params.fields.map((param, index) => [param])}
                            />
                        </Col>
                        <Col md={6} style={{ width: 400 }}>
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
export default DebugContractModal;