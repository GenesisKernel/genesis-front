/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import IField from './';
import { toMoney } from 'lib/tx/convert';

class Money implements IField<string, string> {
    private _value: string = '';

    set(value: string) {
        const intermediary = value ? value.toString().replace(',', '.') : '0';
        this._value = toMoney(intermediary);
    }

    get() {
        return this._value;
    }
}

export default Money;