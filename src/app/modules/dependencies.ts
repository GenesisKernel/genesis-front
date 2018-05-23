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

import GenesisAPI from 'lib/genesisAPI';
import CodeGenerator, { setIds, convertToTreeData, findTagById, copyObject, idGenerator, updateChildrenText, html2childrenTags, Properties } from 'lib/constructor';
import getConstructorTemplate from 'lib/constructor/templates';
import resolveTagHandler from 'lib/constructor/tags';
import 'whatwg-fetch';

export const apiEndpoint = 'api/v2';

export interface IStoreDependencies {
    api: IAPIDependency;
    defaultKey: string;
    constructorModule: IConstructorDependenies;
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

        }).then(response => response.json()).then(body => ({ body })).catch(e => {
            throw e && e.response && e.response.data ? e.response.data.error : null;
        }),
        apiHost: params.apiHost,
        apiEndpoint,
        session: params.sessionToken
    }),
    defaultKey: 'e5a87a96a445cb55a214edaad3661018061ef2936e63a0a93bdb76eb28251c1f',
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
    }
};

export default storeDependencies;