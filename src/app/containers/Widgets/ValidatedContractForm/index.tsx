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

import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { OrderedMap } from 'immutable';
import { IRootState } from 'modules';
import { txCall } from 'modules/tx/actions';
import { TTransactionStatus, ITransaction } from 'genesis/tx';
import * as uuid from 'uuid';

import Validation from 'components/Validation';

interface IValidatedContractFormProps {
    silent?: boolean;
    className?: string;
    contractName: string;
    mapContractParams: (values: { [key: string]: any }) => { [key: string]: any };
    onExec?: (block: string, error?: { type: string, error: string }) => void;
}

interface IValidatedContractFormStateProps {
    transactions: OrderedMap<string, TTransactionStatus>;
}

interface IValidatedContractFormDispatchProps {
    callContract: typeof txCall;
}

class ValidatedContractForm extends React.Component<IValidatedContractFormProps & IValidatedContractFormStateProps & IValidatedContractFormDispatchProps & InjectedIntlProps> {
    private _uuid: string;
    private _pending: boolean;

    componentDidMount() {
        this._uuid = uuid.v4();
    }

    componentWillReceiveProps(props: IValidatedContractFormProps & IValidatedContractFormStateProps & IValidatedContractFormDispatchProps) {
        const transaction = props.transactions.get(this._uuid) as ITransaction;
        if (this._pending && transaction && (transaction.block || transaction.error)) {
            this._pending = false;

            if (transaction.error) {
                this._uuid = uuid.v4();
            }

            if (this.props.onExec) {
                this.props.onExec(transaction.block, transaction.error);
            }
        }
    }

    onSubmit(values: { [key: string]: any }) {
        const params = this.props.mapContractParams(values);
        this._pending = true;
        this.props.callContract({
            uuid: this._uuid,
            name: this.props.contractName,
            silent: this.props.silent,
            params
        });
    }

    render() {
        const transaction = this.props.transactions.get(this._uuid) as ITransaction;
        const pending = transaction && !transaction.block && !transaction.error;

        return (
            <Validation.components.ValidatedForm className={this.props.className} onSubmitSuccess={this.onSubmit.bind(this)} pending={pending}>
                {this.props.children}
            </Validation.components.ValidatedForm>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    transactions: state.tx.transactions
});

const mapDispatchToProps = {
    callContract: txCall
};

const LocalizedValidatedContractForm = injectIntl(ValidatedContractForm);
export default connect<IValidatedContractFormStateProps, IValidatedContractFormDispatchProps, IValidatedContractFormProps>(mapStateToProps, mapDispatchToProps)(LocalizedValidatedContractForm);