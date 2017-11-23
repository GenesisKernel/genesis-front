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
import { getContract } from 'modules/admin/actions';

import DocumentTitle from 'components/DocumentTitle';
import Heading from 'components/Heading';
import ContractEditor from './ContractEditor';

export interface IEditProps {
    contract: {
        id: string;
        active: string;
        name: string;
        conditions: string;
        address: string;
        value: string;
    };
    getContract: typeof getContract.started;
    tabView?: boolean;
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
        if (props.contract && this.props.contract !== props.contract) {
            this.setState({
                code: props.contract.value,
                conditions: props.contract.conditions,
                wallet: props.contract.address
            });
        }
    }

    mapContractParams(values: { [key: string]: any }) {
        return {
            Id: this.props.contract.id,
            Value: this.state.code,
            Conditions: this.state.conditions
        };
    }

    onContractActivation(block: string, error: string) {
        if (block) {
            this.props.getContract({ id: this.props.contract.id });
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
        if(this.props.tabView) {
            return (
                <ContractEditor
                    contractName="@1EditContract"
                    mapContractParams={this.mapContractParams.bind(this)}

                    code={this.state.code}
                    wallet={this.state.wallet}
                    conditions={this.state.conditions}
                    contract={this.props.contract}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onWalletEdit={this.onWalletEdit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                    onContractActivation={this.onContractActivation.bind(this)}
                />
            );
        }

        return (
            <DocumentTitle title="admin.contracts.edit" defaultTitle="Edit contract">
                <div>
                    <Heading>
                        <FormattedMessage id="admin.contracts" defaultMessage="Smart contracts" />
                    </Heading>
                    <div className="content-wrapper">
                        <ol className="breadcrumb">
                            <li>
                                <Link to="/admin/contracts">
                                    <FormattedMessage id="admin.contracts" defaultMessage="Smart contracts" />
                                </Link>
                            </li>
                            <li>
                                <FormattedMessage id="admin.edit" defaultMessage="Edit" />
                            </li>
                        </ol>
                        <ContractEditor
                            contractName="@1EditContract"
                            mapContractParams={this.mapContractParams.bind(this)}

                            code={this.state.code}
                            wallet={this.state.wallet}
                            conditions={this.state.conditions}
                            contract={this.props.contract}
                            onSourceEdit={this.onSourceEdit.bind(this)}
                            onWalletEdit={this.onWalletEdit.bind(this)}
                            onConditionsEdit={this.onConditionsEdit.bind(this)}
                            onContractActivation={this.onContractActivation.bind(this)}
                        />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default Edit;