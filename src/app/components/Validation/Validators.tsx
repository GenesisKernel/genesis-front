// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

export interface IValidator {
    name: string;
    params?: any;
    validate: (value: string) => boolean;
}

export interface IValidatorGenerator {
    (...args: any[]): IValidator;
}

// Validator name must be lowercase because of how Protypo works on the server side
// If you will write your validator using different case - it will not work properly
export const required: IValidator = {
    name: 'required',
    validate: (value: string) => {
        const type = typeof value;

        if (null === value) {
            return false;
        }

        switch (type) {
            case 'string': return value && !!value.length;
            case 'undefined': return false;
            default: throw new Error(`Unrecognized value type "${typeof value}"`);
        }
    }
};

export const minlength: IValidatorGenerator = (count: number | string) => {
    return {
        name: 'minlength',
        validate: (value: string) => {
            if ('string' !== typeof value) {
                throw new Error(`Unrecognized value type "${typeof value}"`);
            }

            // Do not affect empty strings. 'required' must do this job
            return value.length === 0 || parseInt(count.toString(), 10) <= value.length;
        }
    };
};

export const maxlength: IValidatorGenerator = (count: number | string) => {
    return {
        name: 'maxlength',
        validate: (value: string) => {
            if ('string' !== typeof value) {
                throw new Error(`Unrecognized value type "${typeof value}"`);
            }

            return parseInt(count.toString(), 10) >= value.length;
        }
    };
};

export const compare: IValidatorGenerator = (compareValue: any) => {
    return {
        name: 'compare',
        validate: (value: any) => {
            return compareValue === value;
        }
    };
};