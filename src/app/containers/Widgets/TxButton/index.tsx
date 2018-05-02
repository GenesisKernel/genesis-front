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