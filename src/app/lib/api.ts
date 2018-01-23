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

import needle, { NeedleOptions } from 'needle';
import platform from 'lib/platform';

export let apiUrl = platform.args().API_URL || process.env.REACT_APP_API_URL || 'http://127.0.0.1:7079/api/v2';
export let socketUrl = platform.args().SOCKET_URL || process.env.REACT_APP_SOCKET_URL || 'ws://127.0.0.1:8000';
export const SESSION_DURATION_DEFAULT = 60 * 60 * 24 * 30;

const defaultOptions: NeedleOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};

export const overrideSettings = (settings: { apiUrl?: string, socketUrl?: string }) => {
    if (settings.apiUrl) {
        apiUrl = settings.apiUrl;
    }
    if (settings.socketUrl) {
        socketUrl = settings.socketUrl;
    }
};

export interface IResponse extends IAPIError {

}

export interface IAPIError {
    error: string;
    msg: string;
}

export interface IProtypoElement {
    tag: string;
    text?: string;
    attr?: { [key: string]: string };
    children?: IProtypoElement[];
}

export interface IInstallParams {
    type: string;
    log_level: string;
    first_load_blockchain_url?: string;
    db_host: string;
    db_port: number;
    db_name: string;
    db_user: string;
    db_pass: string;
    generate_first_block: number;
    first_block_dir?: string;
    centrifugo_url?: string;
    centrifugo_secret?: string;
}

export interface IRefreshResponse {
    token: string;
    refresh: string;
    expiry: number;
}

export interface IInstallResponse {
    success: boolean;
}

export interface IGetUidResponse extends IResponse {
    uid: string;
    token: string;
}

export interface ILoginResponse extends IResponse {
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
}

export interface ISignTestResponse extends IResponse {
    signature: string;
    pubkey: string;
}

export interface IProtypoElement {
    tag: string;
    id?: string;
    text?: string;
    attr?: { [key: string]: string };
    children?: IProtypoElement[];
}

export interface IContentResponse extends IResponse {
    menu: string;
    tree: IProtypoElement[];
    menutree?: IProtypoElement[];
}

export interface ITableResponse extends IResponse {
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

export interface ITablesResponse extends IResponse {
    count: string;
    list: {
        name: string;
        count: string;
    }[];
}

export interface IHistoryResponse extends IResponse {
    list: {
        [key: string]: string;
    }[];
}

export interface IListResponse extends IResponse {
    count: string;
    list: [IDBValue & {
        [key: string]: string;
    }];
}

export interface IInterfacesResponse extends IResponse {
    menus: [IDBValue & { name: string }];
    pages: [IDBValue & { name: string }];
    blocks: [IDBValue & { name: string }];
}

export interface IPageResponse extends IResponse {
    page: IDBValue & { name: string };
    menus: [IDBValue & { name: string, value: string, conditions: string }];
}

export interface IContractResponse extends IResponse {
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

export interface IContractsResponse extends IResponse {
    count: number;
    list: IContract[];
}

export interface IContract extends IDBValue {
    name: string;
    value: string;
    wallet_id: string;
    address: string;
    conditions: string;
    token_id: string;
    active: string;
}

export interface IRowResponse extends IResponse {
    value: {
        [key: string]: any;
    } & IDBValue;
}

export interface ITxPrepareResponse extends IResponse {
    forsign: string;
    signs?: {
        forsign: string;
        field: string;
        title: string;
        params: {
            name: string;
            text: string;
        }[];
    }[];
    values: {

    };
    time: string;
}

export interface ITxExecResponse extends IResponse {
    hash: string;
}

export interface ITxStatusResponse extends IResponse {
    blockid: string;
    result: string;
    errmsg?: {
        type: string;
        error: string;
    };
}

export interface IParameterResponse extends IResponse {
    id: string;
    name: string;
    value: string;
    conditions: string;
}

export interface ITabListResponse {
    tabList: {
        id: string;
        type: string;
        name?: string;
        visible?: boolean;
    }[];

}

export interface ICreateVDEResponse extends IResponse {
    result: boolean;
}

export interface IDBValue {
    id: string;
}

// Woodleg to support old versions that were returning plain-string object
const transformContent = (value: IContentResponse) => {
    if ('string' === typeof value.menutree) {
        value.menutree = JSON.parse(value.menutree);
    }
    if ('string' === typeof value.tree) {
        value.tree = JSON.parse(value.tree);
    }
    return value;
};

const request = async (endpoint: string, body: { [key: string]: any }, options?: NeedleOptions) => {
    // TODO: Set request timeout
    const requestOptions = Object.assign({}, defaultOptions, { baseUrl: apiUrl, uri: endpoint, form: body }, options) as NeedleOptions;
    let json: any = null;

    try {
        const response = await needle(requestOptions.method as any, `${apiUrl}/${endpoint}`, body, {
            connection: 'Keep-Alive',
            method: requestOptions.method,
            headers: {
                ...requestOptions.headers
            }
        });
        json = response.body;
    }
    catch (e) {
        // TODO: Not possible to catch with any other way
        if (e.message && ('Failed to fetch' === e.message || -1 !== e.message.indexOf('ECONNREFUSED'))) {
            json = { error: 'E_OFFLINE' };
        }
        else {
            json = { error: e };
        }
    }

    if (json.error) {
        throw json;
    }
    else {
        return json;
    }
};

const securedRequest = async (endpoint: string, session: string, body: { [key: string]: any }, options?: RequestInit, mapper?: (response: any) => any) => {
    const extendedOptions = Object.assign({}, options, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    });
    const response = await request(endpoint, body, extendedOptions);
    if (mapper) {
        return mapper(response);
    }
    else {
        return response;
    }
};

const api = {
    // Level 0
    install: (params: IInstallParams) => request('install', params) as Promise<IInstallResponse>,

    // Level 1
    getUid: () => request('getuid', null, { method: 'GET' }) as Promise<IGetUidResponse>,
    signTest: (forSign: string, privateKey: string, publicKey: string) => request('signtest/', {
        private: privateKey,
        forsign: forSign,
        pubkey: publicKey
    }) as Promise<ISignTestResponse>,
    login: (session: string, publicKey: string, signature: string, expirySeconds: number = SESSION_DURATION_DEFAULT, ecosystem: string = '1') => securedRequest('login', session, {
        pubkey: publicKey.slice(2),
        signature,
        ecosystem,
        expire: expirySeconds
    }).then((result: ILoginResponse) => ({
        ...result,
        expiry: expirySeconds
    })) as Promise<ILoginResponse>,
    refresh: (session: string, token: string, expirySeconds: number = SESSION_DURATION_DEFAULT) => securedRequest('refresh', session, { token }).then((result: IRefreshResponse) => ({
        ...result,
        expiry: expirySeconds
    })) as Promise<IRefreshResponse>,

    // Level 2
    row: (session: string, table: string, id: string, columns?: string, vde = false) => securedRequest(`row/${table}/${id}?columns=${columns || ''}&vde=${vde}`, session, null, { method: 'GET' }) as Promise<IRowResponse>,
    contentMenu: (session: string, name: string) => securedRequest(`content/menu/${name}`, session, null)
        .then(transformContent),
    contentPage: (session: string, name: string, params: { [key: string]: any }, vde = false) => securedRequest(`content/page/${name}`, session, { ...params, vde })
        .then(transformContent),
    contentTest: (session: string, template: string) => securedRequest('content', session, { template })
        .then(transformContent),
    table: (session: string, name: string, vde?: boolean) => securedRequest(`table/${name}?vde=${vde}`, session, null, { method: 'GET' }) as Promise<ITableResponse>,
    tables: (session: string, offset?: number, limit?: number, vde = false) => securedRequest(`tables?offset=${offset || 0}&limit=${limit || 1000}&vde=${vde}`, session, null, { method: 'GET' }) as Promise<ITablesResponse>,
    history: (session: string, table: string, id: string) => securedRequest(`history/${table}/${id}`, session, null, { method: 'GET' }) as Promise<IHistoryResponse>,
    list: (session: string, name: string, offset?: number, limit?: number, columns?: string[], vde = false) => securedRequest(`list/${name}?offset=${offset || 0}&limit=${limit || 1000}&columns=${columns ? columns.join(',') : ''}&vde=${vde}`, session, null, { method: 'GET' }) as Promise<IListResponse>,
    page: (session: string, id: string, vde = false) => Promise.all([
        api.row(session, 'pages', id, undefined, vde),
        api.list(session, 'menu', 0, 0, undefined, vde),
    ]).then(results => ({
        page: results[0].value,
        menus: results[1].list
    })) as Promise<IPageResponse>,
    pages: (session: string, vde = false) => Promise.all([
        api.list(session, 'pages', 0, 0, ['name'], vde),
        api.list(session, 'menu', 0, 0, ['name'], vde),
        api.list(session, 'blocks', 0, 0, ['name'], vde),
    ]).then(results => ({
        pages: results[0].list,
        menus: results[1].list,
        blocks: results[2].list,
    })) as Promise<IInterfacesResponse>,
    contract: (session: string, name: string) => securedRequest(`contract/${name}`, session, null, { method: 'GET' }) as Promise<IContractResponse>,
    contracts: (session: string, vde = false, offset?: number, limit?: number) => securedRequest(`contracts?offset=${offset || 0}&limit=${limit || 1000}&vde=${vde}`, session, null, { method: 'GET' }) as Promise<IContractsResponse>,
    parameter: (session: string, name: string, vde = false) => securedRequest(`ecosystemparam/${name}?vde=${vde}`, session, null, { method: 'GET' }) as Promise<IParameterResponse>,
    parameters: (session: string, params: string[], vde = false) => securedRequest(`ecosystemparams?names=${(params || []).join(',')}&vde=${vde}`, session, null, { method: 'GET' }).then(r => r.list) as Promise<IParameterResponse[]>,
    createVDE: (session: string) => securedRequest('vde/create', session, null) as Promise<ICreateVDEResponse>,

    txPrepare: (session: string, name: string, params: { [key: string]: any }, vde = false) => securedRequest(`prepare/${name}`, session, { ...params, vde }) as Promise<ITxPrepareResponse>,
    txExec: (session: string, name: string, params: { [key: string]: any }, vde = false) => securedRequest(`contract/${name}`, session, { ...params, vde }).then((result: ITxExecResponse) => {
        if (vde) {
            return {
                blockid: vde && 'VDE',
                errmsg: !vde && 'ERROR',
            };
        }

        return new Promise((resolve, reject) => {
            const resolver = () => {
                api.txStatus(session, result.hash, vde).then(status => {
                    if (status.errmsg) {
                        reject(status);
                    }
                    else if (status.blockid) {
                        resolve(status);
                    }
                    else {
                        setTimeout(resolver, 1500);
                    }
                }).catch(e => {
                    reject(e);
                });
            };
            resolver();
        });
    }) as Promise<ITxStatusResponse>,
    txStatus: (session: string, hash: string, vde = false) => securedRequest(`txstatus/${hash}?vde=${vde}`, session, null, { method: 'GET' }) as Promise<ITxStatusResponse>,

    updNotificator: (session: string, ids: { id: string, ecosystem: string }[]) =>
        securedRequest('updnotificator', session, {
            ids: JSON.stringify(ids)
        }) as Promise<any>,

    // Utilities
    resolveData: (name: string) =>
        apiUrl + name,

    resolveTextData: (link: string) =>
        needle('get', `${apiUrl}${link}`)
            .then(response => response.body) as Promise<string>
};

export default api;