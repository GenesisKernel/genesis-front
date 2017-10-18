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
import * as uuid from 'uuid';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { Button, Sizes } from 'react-bootstrap';
import { contractExec } from 'modules/tx/actions';

interface ITxButtonProps {
    className?: string;
    bsClass?: string;
    active?: boolean;
    block?: boolean;
    bsStyle?: string;
    bsSize?: Sizes;
    componentClass?: React.ReactType;
    disabled?: boolean;
    contractName: string;
    contractParams?: { [name: string]: any };
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onExec?: (block: string, error: string) => void;
}

interface ITxButtonStateProps {
    transactions: Map<string, { block: string, error: string }>;
}

interface ITxButtonDispatchProps {
    contractExec: typeof contractExec.started;
}

class TxButton extends React.Component<ITxButtonProps & ITxButtonStateProps & ITxButtonDispatchProps> {
    private _uuid: string;
    private _pending: boolean;

    componentWillReceiveProps(props: ITxButtonProps & ITxButtonStateProps & ITxButtonDispatchProps) {
        const transaction = props.transactions.get(this._uuid);
        if (this._pending && this.props.onExec && transaction && (transaction.block || transaction.error)) {
            this._pending = false;
            this.props.onExec(transaction.block, transaction.error);
        }
    }

    onClick(e: React.MouseEventHandler<Button>) {
        this._pending = true;
        if (this.props.onClick) {
            this.props.onClick.apply(this, arguments);
        }

        this._uuid = uuid.v4();

        this.props.contractExec({
            uuid: this._uuid,
            name: this.props.contractName,
            params: this.props.contractParams,
        });
    }

    render() {
        const transaction = this.props.transactions.get(this._uuid);
        const pending = transaction && !transaction.block && !transaction.error;

        return (
            <Button
                onClick={this.onClick.bind(this)}
                disabled={pending || this.props.disabled}
                className={this.props.className}
                bsClass={this.props.bsClass}
                active={this.props.active}
                block={this.props.block}
                bsStyle={this.props.bsStyle}
                bsSize={this.props.bsSize}
                componentClass={this.props.componentClass}
            >
                {this.props.children}
            </Button>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    transactions: state.tx.transactions
});

const mapDispatchToProps = {
    contractExec: contractExec.started
};

export default connect<ITxButtonStateProps, ITxButtonDispatchProps, void>(mapStateToProps, mapDispatchToProps)(TxButton);