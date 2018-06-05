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
import * as uuid from 'uuid';
import { OrderedMap } from 'immutable';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { txCall } from 'modules/tx/actions';
import { TTransactionStatus, ITransaction } from 'genesis/tx';
import { navigatePage } from 'modules/content/actions';

import TxButton, { ITxButtonConfirm } from 'components/TxButton';

interface ITxButtonContainerProps {
    className?: string;
    contractName?: string;
    contractParams?: { [name: string]: any } | (() => { [name: string]: any });
    confirm?: ITxButtonConfirm;
    page?: string;
    pageParams?: { [key: string]: any };
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onExec?: (block: string, error?: { type: string, error: string }) => void;
}

interface ITxButtonStateProps {
    transactions: OrderedMap<string, TTransactionStatus>;
}

interface ITxButtonDispatchProps {
    callContract: typeof txCall;
    navigatePage: typeof navigatePage.started;
}

class TxButtonContainer extends React.Component<ITxButtonContainerProps & ITxButtonStateProps & ITxButtonDispatchProps> {
    private _uuid: string;

    prepareParams(params: { [key: string]: any }) {
        const result: { [key: string]: any } = {};
        for (let itr in params) {
            if (params.hasOwnProperty(itr)) {
                const param = params[itr];
                // Arrays
                if (Array.isArray(param)) {
                    result[`${itr}[]`] = param.length;
                    param.forEach((p, i) => {
                        result[`${itr}[${i}]`] = p;
                    });
                }
                else {
                    result[itr] = param;
                }
            }
        }
        return result;
    }

    onExecContract(name: string, params: { [name: string]: any } | (() => { [name: string]: any }), confirm?: ITxButtonConfirm) {
        this._uuid = uuid.v4();

        let contractParams = {};
        if ('function' === typeof this.props.contractParams) {
            contractParams = this.props.contractParams();

            // Stop executing contract if provided parameters were invalid
            if (null === contractParams) {
                return;
            }
            else {
                contractParams = this.prepareParams(contractParams);
            }
        }
        else {
            contractParams = this.props.contractParams;
        }

        this.props.callContract({
            uuid: this._uuid,
            confirm,
            name: this.props.contractName,
            params: contractParams
        });
    }

    onNavigate(page: string, params: { [key: string]: any } | (() => { [key: string]: any }), confirm?: ITxButtonConfirm) {
        let pageParams = {};
        if ('function' === typeof params) {
            pageParams = (this.props.pageParams as Function)();

            // Stop redirection if provided parameters were invalid
            if (null === pageParams) {
                return;
            }
            else {
                pageParams = this.prepareParams(pageParams);
            }
        }
        else {
            pageParams = params;
        }

        this._uuid = uuid.v4();
        this.props.navigatePage({
            confirm,
            name: page,
            params: pageParams,
            force: true
        });
    }

    render() {
        const transaction = this.props.transactions.get(this._uuid) as ITransaction;
        const pending = transaction && !transaction.block && !transaction.error;
        const contractStatus = transaction && { block: transaction.block, error: transaction.error };

        return (
            <TxButton
                {...this.props}
                pending={pending}
                disabled={this.props.disabled}
                className={this.props.className}
                contractName={this.props.contractName}
                contractParams={this.props.contractParams}
                contractStatus={contractStatus}
                execContract={this.onExecContract.bind(this)}
                onExec={this.props.onExec}
                navigate={this.onNavigate.bind(this)}
            >
                {this.props.children}
            </TxButton>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    transactions: state.tx.transactions
});

const mapDispatchToProps = {
    callContract: txCall,
    navigatePage: navigatePage.started
};

export default connect<ITxButtonStateProps, ITxButtonDispatchProps, ITxButtonContainerProps>(mapStateToProps, mapDispatchToProps)(TxButtonContainer);