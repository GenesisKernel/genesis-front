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

let apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:7079/api/v2';
const defaultOptions: RequestInit = {
    method: 'POST'
};

export const overrideSettings = (settings: { apiUrl: string }) => {
    apiUrl = settings.apiUrl;
};

export interface IResponse extends IAPIError {

}

export interface IAPIError {
    error: string;
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
}

export interface IRefreshResponse {
    token: string;
    refresh: string;
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
    state: string;
    wallet: string;
    address: string;
    expiry: Date;
}

export interface ISignTestResponse extends IResponse {
    signature: string;
    pubkey: string;
}

export interface IContentResponse extends IResponse {
    menu: string;
    tree: string;
}

export interface ITableResponse extends IResponse {
    name: string;
    insert: string;
    new_column: string;
    update: string;
    conditions: string;
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
    menus: [IDBValue & { name: string }];
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
    time: number;
}

export interface ITxExecResponse extends IResponse {
    hash: string;
}

export interface ITxStatusResponse extends IResponse {
    blockid: string;
    result: string;
    errmsg: string;
}

export interface IParameterResponse extends IResponse {
    name: string;
    value: string;
    conditions: string;
}

export interface IDBValue {
    id: string;
}

const request = async (endpoint: string, body: { [key: string]: any }, options?: RequestInit) => {
    // TODO: Set request timeout
    const requestUrl = `${apiUrl}/${endpoint}`;
    let requestBody: URLSearchParams = null;

    if (body) {
        requestBody = new URLSearchParams();
        for (let name in body) {
            if (body.hasOwnProperty(name)) {
                requestBody.append(name, body[name]);
            }
        }
    }
    const requestOptions = Object.assign({}, defaultOptions, { body: requestBody }, options) as RequestInit;
    const response = await fetch(requestUrl, requestOptions);

    let json: any = null;

    try {
        json = await response.json();
    }
    catch (e) {
        throw {
            error: 'E_INVALID_JSON'
        };
    }

    if (json.error) {
        throw json;
    }

    return json;
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
    refresh: (token: string) => request('refresh', { token }) as Promise<IRefreshResponse>,

    // Level 1
    getUid: () => request('getuid', null, { method: 'GET', body: null }) as Promise<IGetUidResponse>,
    signTest: (forSign: string, privateKey: string, publicKey: string) => request('signtest/', {
        private: privateKey,
        forsign: forSign,
        pubkey: publicKey
    }) as Promise<ISignTestResponse>,
    login: (session: string, publicKey: string, signature: string, expirySeconds: number = 36000, state: number = 0) => securedRequest('login', session, {
        pubkey: publicKey.slice(2),
        signature,
        state,
        expire: expirySeconds
    }).then((result: ILoginResponse) => ({
        ...result,
        expiry: new Date(Date.now() + expirySeconds * 1000)
    })) as Promise<ILoginResponse>,

    // Level 2
    row: (session: string, table: string, id: string, columns?: string) => securedRequest(`row/${table}/${id}?columns=${columns || ''}`, session, null, { method: 'GET' }) as Promise<IRowResponse>,
    contentMenu: (session: string, name: string) => securedRequest(`content/menu/${name}`, session, null) as Promise<IContentResponse>,
    contentPage: (session: string, name: string, params: { [key: string]: any }) => securedRequest(`content/page/${name}`, session, params) as Promise<IContentResponse>,
    contentTest: (session: string, template: string) => securedRequest('content', session, { template }) as Promise<IContentResponse>,
    table: (session: string, name: string) => securedRequest(`table/${name}`, session, null, { method: 'GET' }) as Promise<ITableResponse>,
    tables: (session: string, offset?: number, limit?: number) => securedRequest(`tables?offset=${offset || 0}&limit=${limit || 0}`, session, null, { method: 'GET' }) as Promise<ITablesResponse>,
    list: (session: string, name: string, offset?: number, limit?: number, columns?: string) => securedRequest(`list/${name}?offset=${offset || 0}&limit=${limit || 0}&columns=${columns || ''}`, session, null, { method: 'GET' }) as Promise<IListResponse>,
    page: (session: string, id: string) => Promise.all([
        api.row(session, 'pages', id),
        api.list(session, 'menu', 0, 0),
    ]).then(results => ({
        page: results[0].value,
        menus: results[1].list
    })) as Promise<IPageResponse>,
    pages: (session: string) => Promise.all([
        api.list(session, 'pages', 0, 0, 'name'),
        api.list(session, 'menu', 0, 0, 'name'),
        api.list(session, 'blocks', 0, 0, 'name'),
    ]).then(results => ({
        pages: results[0].list,
        menus: results[1].list,
        blocks: results[2].list,
    })) as Promise<IInterfacesResponse>,
    contract: (session: string, name: string) => securedRequest(`contract/${name}`, session, null, { method: 'GET' }) as Promise<IContractResponse>,
    contracts: (session: string, offset?: number, limit?: number) => securedRequest(`contracts?offset=${offset || 0}&limit=${limit || 0}`, session, null, { method: 'GET' }) as Promise<IContractsResponse>,
    parameter: (session: string, name: string) => securedRequest(`ecosystemparam/${name}`, session, null, { method: 'GET' }) as Promise<IParameterResponse>,
    parameters: (session: string, params: string[]) => securedRequest(`ecosystemparams?names=${(params || []).join(',')}`, session, null, { method: 'GET' }).then(r => r.list) as Promise<IParameterResponse[]>,

    txPrepare: (session: string, name: string, params: { [key: string]: any }) => securedRequest(`prepare/${name}`, session, params) as Promise<ITxPrepareResponse>,
    txExec: (session: string, name: string, params: { [key: string]: any }) => securedRequest(`contract/${name}`, session, params).then((result: ITxExecResponse) => {
        return new Promise((resolve, reject) => {
            const resolver = () => {
                api.txStatus(session, result.hash).then(status => {
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
    txStatus: (session: string, hash: string) => securedRequest(`txstatus/${hash}`, session, null, { method: 'GET' }) as Promise<ITxStatusResponse>
};

export default api;