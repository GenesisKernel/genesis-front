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
import { Button, ButtonProps } from 'react-bootstrap';
import { contractExec } from 'modules/tx/actions';

interface ITxButtonProps extends ButtonProps {
    contractName: string;
    contractParams?: { [name: string]: any };
}

interface ITxButtonStateProps {
    transactions: Map<string, { block: string, error: string }>;
}

interface ITxButtonDispatchProps {
    contractExec: typeof contractExec.started;
}

class TxButton extends React.Component<ITxButtonProps & ITxButtonStateProps & ITxButtonDispatchProps> {
    private _uuid: string;

    componentDidMount() {
        this._uuid = uuid.v4();
    }

    onClick(e: React.MouseEventHandler<Button>) {
        this.props.onClick && this.props.onClick.apply(this, arguments);
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
            <Button {...this.props} onClick={this.onClick.bind(this)} disabled={pending}>
                {transaction && !pending ?
                    (
                        transaction.block || 'ERROR'
                    ) : (
                        this.props.children
                    )
                }
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