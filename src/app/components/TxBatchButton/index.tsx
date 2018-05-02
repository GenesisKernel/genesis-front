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

export interface ITxButtonConfirm {
    icon: string;
    title: string;
    text: string;
    confirmButton: string;
    cancelButton: string;
}

export interface ITxButtonProps {
    disabled?: boolean;
    className?: string;
    contracts: {
        name: string;
        data: {
            [key: string]: any
        }[]
    }[];
    status: 'PENDING' | 'DONE' | 'ERROR';
    page?: string;
    pageParams?: { [key: string]: any };
    execContracts: (params: { contracts: { name: string, data: { [key: string]: any }[] }[] }) => void;
    navigate: (page: string, params: { [key: string]: any }) => void;
    onExec?: (success: boolean) => void;
}

class TxBatchButton extends React.Component<ITxButtonProps> {
    componentWillReceiveProps(props: ITxButtonProps) {
        if ('PENDING' === this.props.status && 'PENDING' !== props.status) {
            if ('DONE' === props.status) {
                if (props.page) {
                    props.navigate(props.page, props.pageParams);
                }

                if (props.onExec) {
                    props.onExec(true);
                }
            }
            else if ('ERROR' === props.status) {
                if (props.onExec) {
                    props.onExec(false);
                }
            }
        }
    }

    onClick() {
        this.props.execContracts({
            contracts: this.props.contracts
        });
    }

    render() {
        return (
            <button
                type="button"
                onClick={this.onClick.bind(this)}
                disabled={this.props.disabled || 'PENDING' === this.props.status}
                className={this.props.className}
            >
                {this.props.children}
            </button>
        );
    }
}

export default TxBatchButton;