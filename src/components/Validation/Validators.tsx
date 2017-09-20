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
    (value: string): boolean;
}

export const required: IValidator = (value: string) => {
    const type = typeof value;

    if (null === value) {
        return false;
    }

    switch (type) {
        case 'string': return value && !!value.length;
        case 'undefined': return false;
        default: throw new Error(`Unrecognized value type "${typeof value}"`);
    }
};

export const minLength = (count: number) => {
    return ((value: string) => {
        if ('string' !== typeof value) {
            throw new Error(`Unrecognized value type "${typeof value}"`);
        }

        return count <= value.length;
    }) as IValidator;
};

export const compare = (compareValue: any) => {
    return ((value: any) => {
        return compareValue === value;
    }) as IValidator;
};