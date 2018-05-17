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

export function isSimpleBody(body: string): boolean {
    return typeof body === 'string' && body.indexOf('(') === -1;
}

export function quoteValueIfNeeded(value: string): string {
    const quote = value.indexOf(',') >= 0;
    return (quote ? '"' : '') + value + (quote ? '"' : '');
}

// export function pushNotEmpty(arr: string[], value: string) {
//     if (value) {
//         params.push(value);
//     }
// }

export function getParamsStr(name: string, obj: Object) {
    let paramsArr = [];
    for (let param in obj) {
        if (obj.hasOwnProperty(param)) {
            paramsArr.push(param + '=' + (obj[param] && obj[param].text || ''));
        }
    }
    return name + ': ' + '"' + paramsArr.join(',') + '"';
}