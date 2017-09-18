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

// FIXME - Stub value
const apiRoot = 'http://127.0.0.1:7079/api/v2';
const defaultOptions: RequestInit = {
    method: 'POST'
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

export interface IInstallResponse {
    success: boolean;
}

export interface IGetUidResponse extends IResponse {
    uid: string;
    token: string;
}

export interface ILoginResponse extends IResponse {
    address: string;
}

export interface ISignTestResponse extends IResponse {
    signature: string;
    pubkey: string;
}

const request = async (endpoint: string, body: { [key: string]: any } = {}, options?: RequestInit) => {
    // TODO: Set request timeout
    const requestUrl = `${apiRoot}/${endpoint}`;
    const requestBody = new URLSearchParams();

    for (let name in body) {
        if (body.hasOwnProperty(name)) {
            requestBody.append(name, body[name]);
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

const securedRequest = async (endpoint: string, session: string, body: { [key: string]: any } = {}, options?: RequestInit) => {
    const extendedOptions = Object.assign({}, options, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    });
    return await request(endpoint, body, extendedOptions);
};

export default {
    // Level 0
    install: async (params: IInstallParams) => await request('install', params) as Promise<IInstallResponse>,

    // Level 1
    getUid: async () => await request('getuid', null, { method: 'GET', body: null }) as Promise<IGetUidResponse>,
    signTest: async (forSign: string, privateKey: string, publicKey: string) => await request('signtest/', {
        private: privateKey,
        forsign: forSign,
        pubkey: publicKey
    }) as Promise<ISignTestResponse>,

    // Level 2
    login: async (session: string, publicKey: string, signature: string, state: number = 0) => await securedRequest('login', session, {
        pubkey: publicKey,
        signature,
        state
    }) as Promise<ILoginResponse>
};