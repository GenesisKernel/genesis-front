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
            data: {
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
