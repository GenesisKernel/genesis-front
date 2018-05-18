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
        data: {
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

    execContracts(params: { contracts: { name: string, data: { [key: string]: any }[] }[] }) {
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