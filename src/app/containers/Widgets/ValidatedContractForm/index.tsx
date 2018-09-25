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
import uuid from 'uuid';
import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';
import { IRootState } from 'modules';
import { txCall } from 'modules/tx/actions';
import { ITransaction } from 'genesis/tx';

import Validation from 'components/Validation';

interface IValidatedContractFormProps {
    silent?: boolean;
    className?: string;
    onExec?: (block: string, error?: { type: string, error: string }) => void;
    contract?: string;
    contractParams?: { [key: string]: any } | (() => { [key: string]: any });
}

interface IValidatedContractFormStateProps {
    transactions: OrderedMap<string, ITransaction>;
}

interface IValidatedContractFormDispatchProps {
    txCall: typeof txCall;
}

class ValidatedContractForm extends React.Component<IValidatedContractFormProps & IValidatedContractFormStateProps & IValidatedContractFormDispatchProps> {
    private _uuid: string = null;

    componentWillReceiveProps(props: IValidatedContractFormProps & IValidatedContractFormStateProps & IValidatedContractFormDispatchProps) {
        const oldTransaction = this.props.transactions.get(this._uuid);
        const newTransaction = props.transactions.get(this._uuid);
        const oldDone = oldTransaction && (oldTransaction.block || oldTransaction.error);
        const newDone = newTransaction && (newTransaction.block || newTransaction.error);

        if (!oldDone && newDone) {
            if (props.onExec) {
                props.onExec(newTransaction.block, newTransaction.error);
            }
        }
    }

    onSubmit = () => {
        this._uuid = uuid.v4();

        const contractParams = 'function' === typeof this.props.contractParams ?
            this.props.contractParams() :
            this.props.contractParams;

        if (null === contractParams) {
            return;
        }

        this.props.txCall({
            uuid: this._uuid,
            silent: this.props.silent,
            contracts: [{
                name: this.props.contract,
                params: [contractParams]
            }]
        });
    }

    render() {
        const transaction = this.props.transactions.get(this._uuid);
        const pending = transaction && !transaction.block && !transaction.error;

        return (
            <Validation.components.ValidatedForm className={this.props.className} onSubmitSuccess={this.onSubmit} pending={pending}>
                {this.props.children}
            </Validation.components.ValidatedForm>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    transactions: state.tx.transactions
});

const mapDispatchToProps = {
    txCall
};

export default connect<IValidatedContractFormStateProps, IValidatedContractFormDispatchProps, IValidatedContractFormProps>(mapStateToProps, mapDispatchToProps)(ValidatedContractForm);