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
import { createContract } from 'modules/admin/actions';

import ContractEditor from './ContractEditor';

export interface ICreateProps {
    pending: boolean;
    session: string;
    privateKey: string;
    publicKey: string;
    createContractStatus: { block: string, error: string };
    createContract: typeof createContract.started;
}

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

class Create extends React.Component<ICreateProps, ICreateState> {
    constructor(props: ICreateProps) {
        super(props);
        this.state = {
            code: contractTemplate,
            conditions: '',
            wallet: ''
        };
    }

    componentWillReceiveProps(props: ICreateProps) {
        if (props.createContractStatus) {
            // TODO: Notification stub
            if (props.createContractStatus.error) {
                alert('Error:: ' + props.createContractStatus.error);
            }
            else {
                alert('Success:: ' + props.createContractStatus.block);
            }
        }
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.createContract({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            code: this.state.code,
            wallet: this.state.wallet,
            conditions: this.state.conditions
        });
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
                    pending={this.props.pending}
                    code={this.state.code}
                    wallet={this.state.wallet}
                    conditions={this.state.conditions}
                    onSubmit={this.onSubmit.bind(this)}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onWalletEdit={this.onWalletEdit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                />
            </div>
        );
    }
}

export default Create;