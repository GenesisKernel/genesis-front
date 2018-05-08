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
}