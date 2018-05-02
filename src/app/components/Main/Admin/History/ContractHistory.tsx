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
import { Row, Col, FormControl, FormGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Validation from 'components/Validation';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Editor from 'components/Editor';
import PageSwitcher from './PageSwitcher';

export interface IContractHistoryProps {
    id: string;
    contracts: {
        conditions: string;
        value: string;
        active: string;
        wallet: string;
    }[];
}

interface IContractHistoryState {
    index: number;
}

class ContractHistory extends React.Component<IContractHistoryProps, IContractHistoryState> {
    constructor(props: IContractHistoryProps) {
        super(props);
        this.state = {
            index: 0
        };
    }

    onSwitchPage(index: number) {
        this.setState({
            index: index
        });
    }

    mapContractParams() {
        return {
            Id: this.props.id,
            Value: this.props.contracts[this.state.index].value,
            Conditions: this.props.contracts[this.state.index].conditions,
            WalletId: this.props.contracts[this.state.index].wallet
        };
    }

    render() {
        const contract = this.props.contracts[this.state.index];
        return (
            <ValidatedContractForm className="flex-col flex-stretch fullscreen-wrapper" mapContractParams={this.mapContractParams.bind(this)} contractName="@1EditContract">
                <FormGroup className="flex-col flex-stretch">
                    <div className="form-control p0 flex-col flex-stretch">
                        <Editor
                            language="simvolio"
                            value={contract.value}
                            options={{
                                readOnly: true,
                                automaticLayout: true,
                                contextmenu: false,
                                scrollBeyondLastLine: false
                            }}
                        />
                    </div>
                </FormGroup>
                <Row>
                    <Col md={6}>
                        <FormGroup className="mb0">
                            <label htmlFor="conditions">
                                <FormattedMessage id="admin.conditions.change" defaultMessage="Change conditions" />
                            </label>
                            <FormControl type="text" readOnly value={contract.conditions} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <label htmlFor="address">
                                <FormattedMessage id="admin.contracts.wallet" defaultMessage="Wallet" />
                            </label>
                            <Row className="p0">
                                <Col md={12}>
                                    <FormControl name="wallet" readOnly value={contract.wallet} />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>

                <div>
                    <hr />
                    <PageSwitcher index={this.state.index} count={this.props.contracts.length} onChange={this.onSwitchPage.bind(this)}>
                        <span>
                            <FormattedMessage
                                id="admin.history.indexof"
                                defaultMessage="Showing value {index} of {count}"
                                values={{
                                    index: this.state.index + 1,
                                    count: this.props.contracts.length
                                }}
                            />
                        </span>
                    </PageSwitcher>
                    <hr />

                    <Validation.components.ValidatedSubmit bsStyle="primary">
                        <FormattedMessage id="admin.restore" defaultMessage="Restore" />
                    </Validation.components.ValidatedSubmit>

                </div>

            </ValidatedContractForm>
        );
    }
}

export default ContractHistory;