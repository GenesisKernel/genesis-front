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

declare module 'genesis/api' {
    import { TProtypoElement } from 'genesis/protypo';

    interface IUIDResponse {
        uid: string;
        token: string;
    }

    interface ILoginRequest {
        publicKey: string;
        signature: string;
        expire?: number;
        ecosystem?: string;
        role?: number;
    }

    interface ILoginResponse {
        token: string;
        refresh: string;
        notify_key: string;
        timestamp: string;
        key_id: string;
        ecosystem_id: string;
        address: string;
        expiry: number;
        isnode: boolean;
        isowner: boolean;
        roles: {
            role_id: number;
            role_name: string;
        }[];
    }

    interface IRefreshRequest {
        token: string;
        expire?: number;
    }

    interface IRefreshResponse {
        token: string;
        refresh: string;
        expiry: number;
    }

    interface INotificationsRequest {
        id: string;
        ecosystem: string;
    }

    interface ISystemParamsRequest {
        names: string[];
    }

    interface ISystemParamsResponse {
        list: {
            name: string;
            value: string;
            conditions: string;
        }[];
    }

    type TConfigRequest =
        'centrifugo'

    interface IContractRequest {
        name: string;
    }

    interface IContractResponse {
        name: string;
        active: boolean;
        tableid: number;
        fields: {
            name: string;
            htmltype: string;
            type: string;
            tags: string;
        }[];
    }

    interface IContractsResponse {
        count: number;
        list: {
            id: string;
            name: string;
            value: string;
            wallet_id: string;
            address: string;
            conditions: string;
            token_id: string;
            active: string;
        }[];
    }

    interface IParamRequest {
        name: string;
    }

    interface IParamResponse {
        id: string;
        name: string;
        value: string;
        conditions: string;
    }

    interface IParamsRequest {
        names?: string[];
    }

    interface IParamsResponse {
        list: IParamResponse[];
    }

    interface IRowRequest {
        id: string;
        table: string;
        columns?: string[];
    }

    interface IRowResponse {
        id: string;
        value: {
            [key: string]: any;
        };
    }

    interface ITableRequest {
        name: string;
    }

    interface ITemplateRequest {
        name: string;
    }

    interface ITemplateResponse {
        id: number;
        name: string;
        value: string;
        conditions: string;
    }

    interface IPageResponse extends ITemplateResponse {
        menu: string;
    }

    interface IBlockResponse extends ITemplateResponse {

    }

    interface IMenuResponse extends ITemplateResponse {

    }

    type TContentType =
        'page' | 'block' | 'menu';

    interface IContentRequest {
        type: TContentType;
        name: string;
        locale: string;
        params: {
            [key: string]: any;
        };
    }

    interface IContentResponse {
        menu: string;
        tree: TProtypoElement[];
        menutree?: TProtypoElement[];
    }

    interface IContentTestRequest {
        template: string;
        locale: string;
        params: {
            [key: string]: any;
        };
    }

    interface IContentJsonRequest {
        template: string;
        locale: string;
        source?: boolean;
    }

    interface IContentJsonResponse {
        tree: TProtypoElement[];
    }

    interface ISegmentRequest {
        offset?: number;
        limit?: number;
    }

    interface ITableResponse {
        name: string;
        insert: string;
        new_column: string;
        update: string;
        conditions: string;
        read?: string;
        filter?: string;
        columns: {
            name: string;
            type: string;
            perm: string;
            index: string;
        }[];
    }

    interface ITablesResponse {
        count: string;
        list: {
            name: string;
            count: string;
        }[];
    }

    interface IDataRequest extends ISegmentRequest {
        name: string;
        columns?: string[];
    }

    interface IDataResponse {
        count: string;
        list: {
            id: string;
            [key: string]: string;
        }[];
    }

    interface IHistoryRequest extends ISegmentRequest {
        id: string;
        table: string;
    }

    interface IHistoryResponse {
        list: {
            [key: string]: string;
        }[];
    }

    type TTxParams = {
        [key: string]: any;
    };

    interface ITxCallRequest {
        requestID: string;
        time: string;
        signature: string;
        pubkey: string;
    }

    interface ITxCallResponse {
        hash: string;
    }

    interface ITxPrepareRequest {
        name: string;
        params: TTxParams;
    }

    interface ITxPrepareResponse {
        request_id: string;
        forsign: string;
        time: string;
        signs?: {
            forsign: string;
            field: string;
            title: string;
            params: {
                name: string;
                text: string;
            }[];
        }[];
    }

    interface ITxStatusRequest {
        hash: string;
    }

    interface ITxStatusResponse {
        blockid: string;
        result: string;
        errmsg?: {
            type: string;
            error: string;
        };
    }

    interface ITxCallBatchRequest {
        requestID: string;
        time: string;
        signatures: string[];
        pubkey: string;
    }

    interface ITxCallBatchResponse {
        hashes: string[];
    }

    interface ITxPrepareBatchRequest {
        contracts: ITxPrepareRequest[];
    }

    interface ITxPrepareBatchResponse {
        request_id: string;
        forsign: string[];
        time: string;
        signs?: {
            forsign: string;
            field: string;
            title: string;
            params: {
                name: string;
                text: string;
            }[];
        }[];
    }

    interface ITxStatusBatchRequest {
        hashes: string[];
    }

    interface ITxStatusBatchResponse {
        results: {
            [hash: string]: ITxStatusResponse;
        };
    }
}