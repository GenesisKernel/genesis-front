// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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

import stringType from './types/string';
import stringArrayType from './types/stringArray';
import booleanType from './types/boolean';
import numberType from './types/number';
import SchemaError from './errors';

export type TSchemaType =
    'string' | 'string[]' |
    'boolean' |
    'number';

export interface ISchemaValue<T> {
    type: TSchemaType;
    defaultValue: T;
}

export interface ISchemaShape<T> {
    type: 'object';
    shape: TValidationSchema<T>;
}

export type TValidationSchema<T> = {
    [K in keyof T]-?: ISchemaValue<T[K]> | ISchemaShape<T[K]>;
};

export type TSchemaValueType<T> = {
    name: TSchemaType;
    isDefined: (value: any) => boolean;
    tryGetValue: (value: any, defaultValue: T, ...fallbackValues: any[]) => T;
};

const schemaValueTypes: { [K in TSchemaType]: TSchemaValueType<any> } = {
    'string': stringType,
    'string[]': stringArrayType,
    'boolean': booleanType,
    'number': numberType
};

class ValidationSchema<T> {
    private _schema: TValidationSchema<T>;

    constructor(schema: TValidationSchema<T>) {
        this._schema = schema;
    }

    protected visitObject = <TSchema>(schema: TValidationSchema<TSchema>, value: any, ...fallbackValues: any[]) => {
        const result: { [K in keyof TSchema]?: TSchema[K] } = {};

        for (let key in schema) {
            if (this._schema.hasOwnProperty(key)) {
                result[key] = this.visitValue(schema, key, value[key], ...fallbackValues) as TSchema[typeof key];
            }
        }

        return result as { [K in keyof TSchema]: TSchema[K] };
    }

    protected visitValue = <K extends keyof TSchema, TSchema>(schema: TValidationSchema<TSchema>, key: K, value: any, ...fallbackValues: any[]) => {
        const valueSchema = schema[key];

        if ('object' === valueSchema.type) {
            const resultSchema = valueSchema as ISchemaShape<TSchema[K]>;
            return this.visitObject(resultSchema.shape, value || {});
        }
        else if (valueSchema.type in schemaValueTypes) {
            const resultSchema = valueSchema as ISchemaValue<TSchema[K]>;
            return schemaValueTypes[resultSchema.type].tryGetValue(value, resultSchema.defaultValue, ...fallbackValues) as TSchema[K];
        }
        else {
            throw SchemaError.UnknownType;
        }
    }

    public tryGetValue = <K extends keyof T>(key: K, value: any, ...fallbackValues: any[]) => {
        return this.visitValue(this._schema, key, value, ...fallbackValues);
    }

    public deserialize = (candidate: any) => {
        return this.visitObject(this._schema, candidate);
    }
}

export default ValidationSchema;