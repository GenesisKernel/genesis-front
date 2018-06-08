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
        params: {
            [key: string]: any
        }[]
    }[];
    status: 'PENDING' | 'DONE' | 'ERROR';
    page?: string;
    pageParams?: { [key: string]: any };
    execContracts: (params: { contracts: { name: string, params: { [key: string]: any }[] }[] }) => void;
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