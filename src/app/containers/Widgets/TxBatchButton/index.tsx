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
import { OrderedMap } from 'immutable';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { txCall } from 'modules/tx/actions';
import { TTransactionStatus, ITransactionCollection } from 'genesis/tx';
import { navigatePage } from 'modules/content/actions';

import TxBatchButton, { ITxButtonConfirm } from 'components/TxBatchButton';

interface ITxBatchButtonContainerProps {
    disabled?: boolean;
    className?: string;
    contracts: {
        name: string;
        params: {
            [key: string]: any
        }[]
    }[];
    confirm?: ITxButtonConfirm;
    page?: string;
    pageParams?: { [key: string]: any };
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onExec?: (success: boolean) => void;
}

interface ITxBatchButtonContainerState {
    transactions: OrderedMap<string, TTransactionStatus>;
}

interface ITxBatchButtonContainerDispatch {
    execContracts: typeof txCall;
    navigatePage: typeof navigatePage.started;
}

class TxBatchButtonContainer extends React.Component<ITxBatchButtonContainerProps & ITxBatchButtonContainerState & ITxBatchButtonContainerDispatch> {
    private _uuid: string;

    execContracts(params: { contracts: { name: string, params: { [key: string]: any }[] }[] }) {
        this._uuid = uuid.v4();
        this.props.execContracts({
            uuid: this._uuid,
            contracts: params.contracts,
            confirm: this.props.confirm
        });
    }

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

    onNavigate(page: string, params: { [key: string]: any } | (() => { [key: string]: any })) {
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
            name: page,
            params: pageParams,
            confirm: this.props.confirm,
            force: true
        });
    }

    render() {
        const transaction = this.props.transactions.get(this._uuid) as ITransactionCollection;
        const isPending = !!transaction && !!transaction.pending;
        const isError = !!transaction && transaction.transactions.find(l => !!l.error);

        return (
            <TxBatchButton
                contracts={this.props.contracts}
                disabled={this.props.disabled}
                className={this.props.className}
                status={isError ? 'ERROR' : isPending ? 'PENDING' : 'DONE'}
                execContracts={this.execContracts.bind(this)}
                onExec={this.props.onExec}
                navigate={this.onNavigate.bind(this)}
            >
                {this.props.children}
            </TxBatchButton>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    transactions: state.tx.transactions
});

const mapDispatchToProps = {
    execContracts: txCall,
    navigatePage: navigatePage.started
};

export default connect<ITxBatchButtonContainerState, ITxBatchButtonContainerDispatch, ITxBatchButtonContainerProps>(mapStateToProps, mapDispatchToProps)(TxBatchButtonContainer);