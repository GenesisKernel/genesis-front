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

import GenesisAPI, { IRequestTransport, TRequestMethod, IRequestOptions } from './';

interface IMockTransportResponse {
    method: TRequestMethod;
    endpoint: string;
    body: { [key: string]: any };
    options?: IRequestOptions;
}

const apiPassthroughTransportMock: IRequestTransport = (method: TRequestMethod, endpoint: string, body: { [key: string]: any } = {}, options?: IRequestOptions) => {
    return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                body: {
                    method,
                    endpoint,
                    body,
                    options
                }
            });
        }, 0);
    });
};

const apiJsonTransportMock: IRequestTransport = (method: TRequestMethod, endpoint: string, body: { [key: string]: any } = {}, options?: IRequestOptions) => {
    return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve({ body });
        }, 0);
    });
};

test('Url slug parsing', () => {
    const TEST_URL = '://test_url.com';
    const TEST_ROUTE = 'test_route';

    class MockAPI extends GenesisAPI {
        public slugEndpoint = this.setEndpoint<IMockTransportResponse, { slug: string }>('get', `${TEST_ROUTE}/{slug}`);
        public complexSlugEndpoint = this.setEndpoint<IMockTransportResponse, { a: string, b: string }>('get', `${TEST_ROUTE}/{a}/${TEST_ROUTE}/{b}/test`);
        public postSlugEndpoint = this.setEndpoint<IMockTransportResponse, { slug: string, some: 1, more: true, params: 'hello' }>('post', `${TEST_ROUTE}/{slug}`);
    }

    const api = new MockAPI({
        apiURL: TEST_URL,
        transport: apiPassthroughTransportMock
    });

    return Promise.all([
        api.slugEndpoint({ slug: 'test0123456789' }).then(l => {
            expect(l.endpoint).toEqual(`${TEST_URL}/${TEST_ROUTE}/test0123456789`);
        }),
        api.complexSlugEndpoint({ a: '../../test', b: '-12345-' }).then(l => {
            expect(l.endpoint).toEqual(`${TEST_URL}/${TEST_ROUTE}/${encodeURIComponent('../../test')}/${TEST_ROUTE}/-12345-/test`);
        }),
        api.postSlugEndpoint({ slug: 'test0123456789', some: 1, more: true, params: 'hello' }).then(l => {
            expect(l.endpoint).toEqual(`${TEST_URL}/${TEST_ROUTE}/test0123456789`);
        })
    ]);
});

test('Content transformer', () => {
    class MockAPI extends GenesisAPI {
        public transformEndpoint = this.setEndpoint<number[], number[]>('get', 'test', {}, (response: number[]) => response.reverse());
    }

    const api = new MockAPI({
        apiURL: '://test_url.com',
        transport: apiJsonTransportMock
    });

    const testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return api.transformEndpoint(testArray).then(l => {
        expect(l).toEqual(testArray.reverse());
    });
});