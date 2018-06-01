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

declare module 'genesis/tx' {
    type TTxError =
        'error' |
        'info' |
        'warning' |
        'panic' |
        'E_CONTRACT' |
        'E_INVALID_PASSWORD' |
        'E_INVALIDATED' |
        'E_SERVER';

    interface ITxResult {
        block: string;
        result: string;
    }

    interface ITxError {
        type: TTxError;
        error: string;
        params?: any[];
    }

    type TTransactionStatus =
        ITransaction | ITransactionCollection;

    interface ITransaction {
        type: 'single';
        uuid: string;
        contract: string;
        block: string;
        result?: string;
        error?: ITxError;
    }

    interface ITransactionCollection {
        type: 'collection';
        uuid: string;
        pending: number;
        error?: ITxError;
        transactions: ITransaction[];
    }

    type TTransactionRequest =
        ITransactionCall | ITransactionBatchCall;

    interface ITransactionRequest {
        uuid: string;
        silent?: boolean;
        confirm?: ITransactionConfirm;
    }

    interface ITransactionCall extends ITransactionRequest {
        name: string;
        params: {
            [key: string]: any;
        };
    }

    interface ITransactionBatchCall extends ITransactionRequest {
        contracts: {
            name: string;
            params: {
                [key: string]: any;
            }[];
        }[];
    }

    interface ITransactionConfirm {
        type?: string;
        title?: string;
        text?: string;
        confirmButton?: string;
        cancelButton?: string;
    }

    interface IExecutionCall {
        tx: ITransactionCall;
        requestID?: string;
        privateKey?: string;
        signature?: string;
        time?: string;
    }
}
