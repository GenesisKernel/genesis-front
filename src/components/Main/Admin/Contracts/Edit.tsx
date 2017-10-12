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
import { activateContract, getContract, editContract } from 'modules/admin/actions';

import ContractEditor from './ContractEditor';

export interface IEditProps {
    pending: boolean;
    session: string;
    privateKey: string;
    publicKey: string;
    contract: {
        id: string;
        active: string;
        name: string;
        conditions: string;
        address: string;
        value: string;
    };
    editContractStatus: { block: string, error: string };
    activateContractStatus: { block: string, error: string };
    getContract: typeof getContract.started;
    editContract: typeof editContract.started;
    activateContract: typeof activateContract.started;
}

interface IEditState {
    code: string;
    wallet: string;
    conditions: string;
}

class Edit extends React.Component<IEditProps, IEditState> {
    constructor(props: IEditProps) {
        super(props);
        this.state = props.contract ?
            {
                code: props.contract.value,
                conditions: props.contract.conditions,
                wallet: props.contract.address
            } : {
                code: '',
                conditions: '',
                wallet: ''
            };
    }

    componentWillReceiveProps(props: IEditProps) {
        if (props.editContractStatus && this.props.editContractStatus !== props.editContractStatus) {
            // TODO: Notification stub
            if (props.editContractStatus.error) {
                alert('Error:: ' + props.editContractStatus.error);
            }
            else {
                alert('Success:: ' + props.editContractStatus.block);
            }
        }

        if (props.activateContractStatus && this.props.activateContractStatus !== props.activateContractStatus) {
            // TODO: Notification stub
            if (props.activateContractStatus.error) {
                alert('Error:: ' + props.activateContractStatus.error);
            }
            else {
                alert('Success:: ' + props.activateContractStatus.block);
                props.getContract({ session: props.session, id: props.contract.id });
            }
        }

        if (props.contract && this.props.contract !== props.contract) {
            this.setState({
                code: props.contract.value,
                conditions: props.contract.conditions,
                wallet: props.contract.address
            });
        }
    }

    onSubmit(values: { [key: string]: any }) {
        this.props.editContract({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            id: this.props.contract.id,
            code: this.state.code,
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

    onActivateContract() {
        this.props.activateContract({
            session: this.props.session,
            privateKey: this.props.privateKey,
            publicKey: this.props.publicKey,
            id: this.props.contract.id
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
                        <FormattedMessage id="admin.contracts.edit" defaultMessage="Edit" />
                    </li>
                </ol>
                <ContractEditor
                    active={this.props.contract && '1' === this.props.contract.active}
                    pending={this.props.pending}
                    code={this.state.code}
                    wallet={this.state.wallet}
                    conditions={this.state.conditions}
                    onSubmit={this.onSubmit.bind(this)}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onWalletEdit={this.onWalletEdit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                    onContractActivation={this.props.contract && this.onActivateContract.bind(this)}
                />
            </div>
        );
    }
}

export default Edit;