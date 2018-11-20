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

import Route from 'route-parser';
import querystring from 'query-string';
import { history } from 'store';

export interface IRouteMatch {
    parts: {
        [name: string]: string;
    };
    query: {
        [param: string]: string;
    };
}

export const matchRoute = (path: string, match: string): IRouteMatch | undefined => {
    const route = new Route(path).match(match);
    if (!route) {
        return undefined;
    }

    return {
        parts: route,
        query: querystring.parseUrl(match).query
    };
};

export const generateRoute = (path: string, params?: { [name: string]: string }) => {
    const query = params ? querystring.stringify(params) : '';
    return `${path}${query && '?' + query}`;
};

export const navigate = (path: string, params?: { [key: string]: any }) => {
    history.push({
        pathname: path,
        search: params ? querystring.stringify(params) : ''
    });
};