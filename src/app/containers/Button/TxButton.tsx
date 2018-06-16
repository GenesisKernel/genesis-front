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
import { ITransaction } from 'genesis/tx';
import { OrderedMap } from 'immutable';
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { buttonInteraction } from 'modules/content/actions';

import Button from 'components/Button';

export interface ITxButtonProps {
    disabled?: boolean;
    silent?: boolean;
    className?: string;

    // Called first
    confirm?: {
        icon: string;
        title: string;
        text: string;
        confirmButton: string;
        cancelButton: string;
    };

    // Executed after confirm if approved
    contracts?: {
        name: string;
        params: {
            [key: string]: any
        }[]
    }[];

    // Executed after batch
    contract?: string;
    contractParams?: { [key: string]: any } | (() => { [key: string]: any });

    // Redirect if all previous actions succeeded
    page?: string;
    pageParams?: { [key: string]: any } | (() => { [key: string]: any });

    // Page must be rendered within a modal dialog
    popup?: {
        title?: string;
        width?: number;
    };
}

interface ITxButtonState {
    transactions: OrderedMap<string, ITransaction>;
}

interface ITxButtonDispatch {
    buttonInteraction: typeof buttonInteraction;
}

class TxButton extends React.Component<ITxButtonProps & ITxButtonState & ITxButtonDispatch> {
    private _uuid: string = null;

    onClick = () => {
        this._uuid = uuid.v4();

        const contractParams = 'function' === typeof this.props.contractParams ?
            this.props.contractParams() :
            this.props.contractParams;

        if (null === contractParams) {
            return;
        }
        const pageParams = 'function' === typeof this.props.pageParams ?
            this.props.pageParams() :
            this.props.pageParams;

        if (null === pageParams) {
            return;
        }

        this.props.buttonInteraction({
            uuid: this._uuid,
            silent: this.props.silent,
            confirm: this.props.confirm,
            popup: this.props.popup,
            contract: this.props.contract ? {
                name: this.props.contract,
                params: contractParams
            } : null,
            contracts: this.props.contracts,
            page: this.props.page ? {
                name: this.props.page,
                params: pageParams
            } : null
        });
    }

    isPending = () => {
        const tx = this.props.transactions.get(this._uuid);
        if (tx) {
            if (tx.contract) {
                return !tx.error && !tx.block;
            }
            else if (tx.batch) {
                return 0 < tx.batch.pending;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <Button onClick={this.onClick} disabled={this.props.disabled || this.isPending()} className={this.props.className}>
                {this.props.children}
            </Button>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    transactions: state.tx.transactions
});

const mapDispatchToProps = {
    buttonInteraction
};

export default connect<ITxButtonState, ITxButtonDispatch, ITxButtonProps>(mapStateToProps, mapDispatchToProps)(TxButton);