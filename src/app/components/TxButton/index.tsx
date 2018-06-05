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
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface ITxButtonConfirm {
    icon: string;
    title: string;
    text: string;
    confirmButton: string;
    cancelButton: string;
}

export interface ITxButtonProps {
    disabled?: boolean;
    pending?: boolean;
    className?: string;
    contractName?: string;
    contractParams?: { [key: string]: any } | (() => { [key: string]: any });
    contractStatus?: { block: string, error?: { type: string, error: string } };
    confirm?: ITxButtonConfirm;
    page?: string;
    pageParams?: { [key: string]: any };
    execContract: (contractName: string, contractParams: { [key: string]: any }, confirm?: ITxButtonConfirm) => void;
    navigate: (page: string, params: { [key: string]: any }, confirm?: ITxButtonConfirm) => void;
    onExec?: (block: string, error?: { type: string, error: string }) => void;
}

class TxButton extends React.Component<ITxButtonProps & InjectedIntlProps> {
    componentWillReceiveProps(props: ITxButtonProps) {
        // Received non-empty transaction status, proceed to actions
        if (!props.pending && props.contractStatus && this.props.contractStatus !== props.contractStatus) {
            if (props.contractStatus.block) {
                if (this.props.page) {
                    this.props.navigate(this.props.page, this.props.pageParams);
                }
            }

            if (this.props.onExec) {
                this.props.onExec(props.contractStatus.block, props.contractStatus.error);
            }
        }
    }

    onClick() {
        if (this.props.contractName) {
            this.props.execContract(this.props.contractName, this.props.contractParams, this.props.confirm);
        }
        else if (this.props.page) {
            this.props.navigate(this.props.page, this.props.pageParams, this.props.confirm);
        }
    }

    render() {
        return (
            <button
                type="button"
                onClick={this.onClick.bind(this)}
                disabled={this.props.disabled || this.props.pending}
                className={this.props.className}
            >
                {this.props.children}
            </button>
        );
    }
}

export default injectIntl(TxButton);