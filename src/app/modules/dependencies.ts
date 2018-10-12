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

import GenesisAPI from 'lib/genesisAPI';
import * as routerService from 'services/router';
import CodeGenerator, { setIds, convertToTreeData, findTagById, copyObject, idGenerator, updateChildrenText, html2childrenTags } from 'lib/constructor';
import Properties from 'lib/constructor/properties';
import getConstructorTemplate from 'lib/constructor/templates';
import resolveTagHandler from 'lib/constructor/tags';
import 'whatwg-fetch';

export const apiEndpoint = 'api/v2';

export interface IStoreDependencies {
    api: IAPIDependency;
    defaultKey: string;
    defaultPassword: string;
    constructorModule: IConstructorDependenies;
    routerService: typeof routerService;
}

export interface IAPIDependency {
    (options: { apiHost: string, sessionToken?: string }): GenesisAPI;
}

interface IConstructorDependenies {
    setIds: typeof setIds;
    convertToTreeData: typeof convertToTreeData;
    findTagById: typeof findTagById;
    copyObject: typeof copyObject;
    getConstructorTemplate: typeof getConstructorTemplate;
    idGenerator: typeof idGenerator;
    updateChildrenText: typeof updateChildrenText;
    html2childrenTags: typeof html2childrenTags;
    resolveTagHandler: typeof resolveTagHandler;
    CodeGenerator: typeof CodeGenerator;
    Properties: typeof Properties;
}

const storeDependencies: IStoreDependencies = {
    api: (params: { apiHost: string, sessionToken?: string } = { apiHost: null }) => new GenesisAPI({
        transport: request => fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: request.body

        }).then(response =>
            Promise.all([
                response.clone().json(),
                response.clone().text()

            ]).then(result => ({
                json: result[0],
                body: result[1]

            }))

        ).catch(e => {
            throw e && e.response && e.response.data ? e.response.data.error : null;
        }),
        apiHost: params.apiHost,
        apiEndpoint,
        session: params.sessionToken
    }),
    defaultKey: 'e5a87a96a445cb55a214edaad3661018061ef2936e63a0a93bdb76eb28251c1f',
    defaultPassword: 'genesis',
    constructorModule: {
        setIds,
        convertToTreeData,
        findTagById,
        copyObject,
        getConstructorTemplate,
        idGenerator,
        updateChildrenText,
        html2childrenTags,
        resolveTagHandler,
        CodeGenerator,
        Properties
    },

    routerService
};

export default storeDependencies;