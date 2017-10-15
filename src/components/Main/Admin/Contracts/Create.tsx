// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { FormControlProps } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import ContractEditor from './ContractEditor';

interface ICreateState {
    code: string;
    wallet: string;
    conditions: string;
}

const contractTemplate =
    `contract ... {
    data {

    }

    conditions {

    }

    action {

    }
}`;

class Create extends React.Component<{}, ICreateState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            code: contractTemplate,
            conditions: '',
            wallet: ''
        };
    }

    mapContractParams(values: { [key: string]: any }) {
        return {
            Wallet: this.state.wallet,
            Value: this.state.code,
            Conditions: this.state.conditions
        };
    }

    onExec(block: string, error: string) {
        // TODO: Notification stub
        if (block) {
            alert('Success:: ' + block);
        }
        else if (error) {
            alert('Error:: ' + error);
        }
    }

    onSourceEdit(code: string) {
        this.setState({ code });
    }

    onConditionsEdit(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            conditions: e.target.value
        });
    }

    onWalletEdit(e: React.ChangeEvent<FormControlProps>) {
        this.setState({
            wallet: e.target.value as string
        });
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-heading">
                    <FormattedMessage id="admin.contracts" defaultMessage="Smart contracts" />
                </div>
                <ol className="breadcrumb">
                    <li>
                        <Link to="/admin/contracts">
                            <FormattedMessage id="admin.contracts" defaultMessage="Smart contracts" />
                        </Link>
                    </li>
                    <li>
                        <FormattedMessage id="admin.interface.contracts.create" defaultMessage="Create contract" />
                    </li>
                </ol>
                <ContractEditor
                    contractName="NewContract"
                    mapContractParams={this.mapContractParams.bind(this)}

                    code={this.state.code}
                    wallet={this.state.wallet}
                    conditions={this.state.conditions}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onWalletEdit={this.onWalletEdit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                    onExec={this.onExec.bind(this)}
                />
            </div>
        );
    }
}

export default Create;