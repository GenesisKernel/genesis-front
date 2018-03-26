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

import urlTemplate from 'url-template';

export type TRequestMethod =
    'get' |
    'post';

export interface IRequestOptions {
    connection?: string;
    headers?: {
        [key: string]: string;
    };
}

export interface IEndpointFactory {
    <T>(method: TRequestMethod, endpoint: string, options?: IRequestOptions, transformer?: (response: any) => T): IParameterLessEndpoint<T>;
    <T, P>(method: TRequestMethod, endpoint: string, options?: IRequestOptions, transformer?: (response: any) => T): IEndpoint<P, T>;
}

export interface IEndpoint<P, R> {
    (params: P): Promise<R>;
}

export interface IParameterLessEndpoint<R> {
    (): Promise<R>;
}

export interface IRequestTransport {
    (method: TRequestMethod, endpoint: string, options?: IRequestOptions): Promise<{ body: any }>;
    (method: TRequestMethod, endpoint: string, body: { [key: string]: any }, options?: IRequestOptions): Promise<{ body: any }>;
}

export interface IAPIOptions {
    apiURL: string;
    transport: IRequestTransport;
    requestOptions?: IRequestOptions;
}

class GenesisAPI {
    private _defaultOptions: IRequestOptions = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    private _transport: IRequestTransport = null;
    private _apiUrl = '://127.0.0.1:7079/api/v2';
    private _session = '';

    constructor(options: IAPIOptions) {
        this._apiUrl = options.apiURL;
        this._transport = options.transport;

        if (options.requestOptions) {
            this._defaultOptions = options.requestOptions;
        }
    }

    protected setEndpoint: IEndpointFactory = <P, T>(method: TRequestMethod, endpoint: string, options: IRequestOptions = {}, transformer?: (response: any) => T) => {
        return async (params?: P) => {
            // TODO: Set request timeout
            const requestOptions: IRequestOptions = {
                ...this._defaultOptions,
                ...options
            };

            let json: any = null;
            let requestEndpoint = urlTemplate.parse(endpoint).expand(params || {});

            try {
                const response = await this._transport(method, `${this._apiUrl}/${requestEndpoint}`, params, {
                    connection: 'Keep-Alive',
                    headers: {
                        ...requestOptions.headers
                    }
                });
                json = transformer ? transformer(response.body) : response.body;
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
                return json as T;
            }
        };
    }

    protected setSecuredEndpoint: IEndpointFactory = <T>(method: TRequestMethod, endpoint: string, options: IRequestOptions = {}, transformer?: (response: any) => T) => {
        const extendedOptions: IRequestOptions = {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${this._session}`
            }
        };
        return this.setEndpoint(method, endpoint, extendedOptions, transformer);
    }

    public getUid = this.setEndpoint<{ uid: string, token: string }>('get', 'getuid');

    // txStatus: (session: string, hash: string) => securedRequest(`txstatus/${hash}`, session, null, { method: 'GET' }) as Promise<ITxStatusResponse>,
}

export default GenesisAPI;