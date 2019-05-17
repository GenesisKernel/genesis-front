/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'apla/tx' {
    type TTxError =
        'error' |
        'info' |
        'warning' |
        'panic' |
        'E_GUEST_VIOLATION' |
        'E_CONTRACT' |
        'E_SERVER';

    interface ITxResult {
        block: string;
        result: string;
    }

    interface IErrorRedirect {
        pagename: string;
        pageparams?: {
            [key: string]: any;
        };
    }

    interface ITxError {
        errorRedirects?: IErrorRedirect;
        id?: string;
        type: TTxError;
        error: string;
        params?: any[];
    }

    interface ITxStatus extends ITxResult, ITxError { }

    interface ITransactionParam {
        type: string;
        value: object;
    }

    type TTransactionStatus =
        'pending' | 'done' | 'error';

    interface ITransactionCollection {
        status: TTransactionStatus;
        error?: ITxError;
        stack: ITransaction[];
    }

    interface ITransaction {
        name: string,
        hash: string,
        status: ITxStatus;
        params: {
            [name: string]: ITransactionParam;
        };
    }

    interface ITransactionCall {
        uuid: string;
        silent?: boolean;
        contracts: {
            name: string;
            params: {
                [key: string]: any;
            }[];
        }[];
        errorRedirects?: {
            [key: string]: IErrorRedirect
        }
    }
}
