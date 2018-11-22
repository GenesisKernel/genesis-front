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

import ValidationSchema from './';

interface ISettingsMock {
    stringParam: string;
    stringArrayParam: string[];
    booleanParam: boolean;
}

const createSchemaMock = () =>
    new ValidationSchema<ISettingsMock>({
        stringParam: {
            type: 'string',
            defaultValue: ''
        },
        stringArrayParam: {
            type: 'string[]',
            defaultValue: []
        },
        booleanParam: {
            type: 'boolean',
            defaultValue: false
        }
    });

test('String value', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('stringParam', 'test')).toMatch('test');
});

test('String invalid value fallback to proposal', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('stringParam', 123, 'PROPOSAL')).toMatch('PROPOSAL');
});

test('String invalid value fallback to multiple proposals', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('stringParam', 123, 12345678, 'PROPOSAL')).toMatch('PROPOSAL');
});

test('String invalid value fallback to default', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('stringParam', 123)).toMatch('');
});

test('String array value', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('stringArrayParam', ['test'])).toEqual(['test']);
});

test('String array invalid value fallback to proposal', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('stringArrayParam', 'test', ['PROPOSAL'])).toEqual(['PROPOSAL']);
});

test('String array invalid value fallback to multiple proposals', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('stringArrayParam', 123, [], 12345678, ['PROPOSAL'])).toEqual(['PROPOSAL']);
});

test('String array invalid value fallback to default', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('stringArrayParam', 'test')).toEqual([]);
});

test('Boolean value', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('booleanParam', true)).toEqual(true);
});

test('Boolean invalid value fallback to proposal', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('booleanParam', 123, true)).toEqual(true);
});

test('Boolean invalid value fallback to multiple proposals', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('booleanParam', 123, 12345678, true)).toEqual(true);
});

test('Boolean invalid value fallback to default', () => {
    const schema = createSchemaMock();
    expect(schema.tryGetValue('booleanParam', 123)).toEqual(false);
});

test('Complex deserialization with truthy values', () => {
    const schema = createSchemaMock();
    expect(schema.deserialize({
        stringParam: 'hello',
        stringArrayParam: ['world'],
        booleanParam: true
    })).toEqual({
        stringParam: 'hello',
        stringArrayParam: ['world'],
        booleanParam: true
    });
});

test('Complex deserialization with falsy values', () => {
    const schema = createSchemaMock();
    expect(schema.deserialize({
        stringParam: 123,
        stringArrayParam: 456,
        booleanParam: 789
    })).toEqual({
        stringParam: '',
        stringArrayParam: [],
        booleanParam: false
    });
});

test('Complex deserialization with missing values', () => {
    const schema = createSchemaMock();
    expect(schema.deserialize({})).toEqual({
        stringParam: '',
        stringArrayParam: [],
        booleanParam: false
    });
});