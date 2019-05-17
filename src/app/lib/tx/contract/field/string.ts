/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import IField from './';

class String implements IField<string> {
    private _value: string = '';

    set(value: string) {
        this._value = value ? value.toString() : '';
    }

    get() {
        return this._value;
    }
}

export default String;