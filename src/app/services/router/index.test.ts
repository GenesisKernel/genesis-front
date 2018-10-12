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

import * as routerService from './';

const SECTION_MATCHER = '(/)(:section)(/)(:page)(/)';

test('Section route full match', () => {
    expect(routerService.matchRoute(SECTION_MATCHER, '/home/default_page')).toMatchObject({
        parts: {
            section: 'home',
            page: 'default_page'
        },
        query: {}
    });
});

test('Section route full match with query', () => {
    expect(routerService.matchRoute(SECTION_MATCHER, '/home/default_page?param1=val1&param2=val2')).toMatchObject({
        parts: {
            section: 'home',
            page: 'default_page'
        },
        query: {
            param1: 'val1',
            param2: 'val2'
        }
    });
});

test('Section route full match with trailing slash', () => {
    expect(routerService.matchRoute(SECTION_MATCHER, '/home/default_page/')).toMatchObject({
        parts: {
            section: 'home',
            page: 'default_page'
        },
        query: {}
    });
});

test('Section route full match with trailing slash and query', () => {
    expect(routerService.matchRoute(SECTION_MATCHER, '/home/default_page/?param1=val1&param2=val2')).toMatchObject({
        parts: {
            section: 'home',
            page: 'default_page',
        },
        query: {
            param1: 'val1',
            param2: 'val2'
        }
    });
});

test('Section route without page', () => {
    expect(routerService.matchRoute(SECTION_MATCHER, '/home')).toMatchObject({
        parts: {
            section: 'home',
            page: undefined
        },
        query: {}
    });
});

test('Section route without page with trailing slash', () => {
    expect(routerService.matchRoute(SECTION_MATCHER, '/home/')).toMatchObject({
        parts: {
            section: 'home',
            page: undefined
        },
        query: {}
    });
});

test('Section route empty match', () => {
    expect(routerService.matchRoute(SECTION_MATCHER, '')).toMatchObject({
        parts: {
            section: undefined,
            page: undefined
        },
        query: {}
    });
});

test('Section route empty match with trailing slash', () => {
    expect(routerService.matchRoute(SECTION_MATCHER, '/')).toMatchObject({
        parts: {
            section: undefined,
            page: undefined
        },
        query: {}
    });
});