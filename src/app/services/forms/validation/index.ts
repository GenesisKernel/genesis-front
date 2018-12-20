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

interface IValidatorFn<T> {
    (value: T | undefined): boolean;
}

interface IValidatorGeneratorFn<P, T> {
    (params: P): IValidatorFn<T>;
}

export interface IValidator<T> extends IValidatorFn<T> {
    type: string;
}

export interface IValidatorGenerator<P, T> {
    (params: P): IValidator<T>;
}

interface ICreateValidatorFn {
    <T>(name: string, validator: IValidatorFn<T>): IValidator<T>;
}

export const createValidator: ICreateValidatorFn = <T>(name: string, validationFn: IValidatorFn<T>) => {
    const validator = function (value?: T) {
        return validationFn(value);
    };
    validator.type = name;
    return validator;
};

interface ICreateValidatorGeneratorFn {
    <P, T>(name: string, generator: IValidatorGeneratorFn<P, T>): IValidatorGenerator<P, T>;
}

export const createGenerator: ICreateValidatorGeneratorFn = <P, T>(name: string, generationFn: IValidatorGeneratorFn<P, T>) => {
    const validator = (params: P) => {
        return createValidator(name, generationFn(params));
    };
    return validator;
};

export type TValidationState =
    'VALID' | 'INVALID';

export type TValidationResult<T> =
    IValidationSuccess<T> | IValidationFailure<T>;

export interface IValidationSuccess<T> {
    valid: true;
    value: T | undefined;
}

export interface IValidationFailure<T> {
    valid: false;
    value: T | undefined;
    validator: string;
}

export const validate: <T>(value?: T, validators?: IValidator<T> | IValidator<T>[]) => TValidationResult<T> =
    <T>(value?: T, validators?: IValidator<T> | IValidator<T>[]) => {
        if (undefined !== validators) {
            const checks = Array.isArray(validators) ? validators : [validators];
            for (let check of checks) {
                if (!check(value)) {
                    return {
                        valid: false,
                        value,
                        validator: check.type
                    };
                }
            }
        }

        return {
            valid: true,
            value
        };
    };