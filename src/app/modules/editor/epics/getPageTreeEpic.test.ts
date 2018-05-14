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
import 'rxjs';
import 'lib/external/fsa';
// import { Observable } from 'rxjs/Observable';
// import getPageTreeEpic from './getPageTreeEpic';
// import { getPageTree } from '../actions';
// import { ActionsObservable } from 'redux-observable';
// import constructorModule from 'lib/constructor';
import GenesisAPI, { IRequestTransport,  } from 'lib/genesisAPI';
// import { IContentTestRequest } from 'genesis/api';

describe('getPageTreeEpic', () => {
    it('gets page tree json', () => {

        const paramTestingAPIHost = 'http://test_Url.com';
        const paramTestingAPIEndpoint = 'api/v2';

        const paramsTransportMock: IRequestTransport = request => {
            return new Promise<any>((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        body: {
                            __requestUrl: request.url,
                            body: {'tree': []}
                        }
                    });
                }, 0);
            });
        };

        const paramTestingAPIMock = () => new GenesisAPI({
            apiHost: paramTestingAPIHost,
            apiEndpoint: paramTestingAPIEndpoint,
            transport: paramsTransportMock
        });

        const testRequest = {
            template: '',
            locale: 'en-US',
            source: true
        };

        paramTestingAPIMock().contentJson(testRequest).then((response: any) => {
            expect(response).toEqual({
                __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/content`,
                body: {
                    tree: []
                }
            });
        });

        // const apiFail = (session: string) => {
        //     return {
        //         contentJson: ({
        //             template: string,
        //             locale: string,
        //             source: boolean
        //         }) => Observable.of({})
        //     }
        // };
        //
        // const action$ = ActionsObservable.of<Action>(getPageTree.started(null));
        //
        // const expectedOutputActionFail = getPageTree.failed({
        //     params: null,
        //     error: undefined
        // });
        //
        // const state = {
        //     editor: {
        //         tabIndex: 0,
        //         tabs: [{
        //             value: ''
        //         }]
        //     },
        //     storage: {
        //         locale: 'en'
        //     },
        //     auth: {
        //         session: ''
        //     }
        // };
        //
        // const store = {
        //     getState: () => state
        // };
        //
        // getPageTreeEpic(action$, store, { constructorModule, api: apiFail })
        //     .toArray()
        //     .subscribe(actualOutputActions => {
        //         expect(actualOutputActions).toEqual([expectedOutputActionFail]);
        //     });
    });
});