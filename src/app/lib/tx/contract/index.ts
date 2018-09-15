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

import msgpack from 'msgpack-lite';
import * as convert from 'lib/tx/convert';
import { Int64BE } from 'int64-buffer';
import { privateToPublic, address, sign } from 'lib/crypto';
import { encodeLengthPlusData, concatBuffer } from '../convert';
import { ISchema } from 'lib/tx/schema';
import { IField } from 'lib/tx/contract/field';

export interface IContractContext {
    id: number;
    schema: ISchema;
    keyID: Int64BE;
    ecosystemID: number;
    roleID: number;
    fields: IContractParam[];
}

export interface IContractParam {
    name: string;
    type: string;
    value: object;
}

export default class Contract {
    // DEPRECATED
    private readonly _requestID: string = '';

    private _context: IContractContext;
    private _time: number;
    private _tokenEcosystem: number = 0;
    private _maxSum: string;
    private _payOver: string;
    private _signedBy: string = '0';
    private _publicKey: ArrayBuffer;
    private _binSignatures: ArrayBuffer;
    private _fields: {
        name: string,
        proto: IField<object>
    }[];

    constructor(context: IContractContext) {
        this._context = context;
        this._time = Math.floor((new Date()).getTime() / 1000);
        this._fields = this._context.fields.map(l => {
            const Field = this._context.schema.fields[l.type];
            const field = new Field();
            field.set(l.value);

            return {
                name: l.name,
                proto: field
            };
        });
    }

    getStringForSign() {
        const fields = this._fields.map(v =>
            v.proto.forSign()
        ).join(',');

        const signParts = [
            this._requestID, this._context.id, this._time,
            this._context.keyID, this._context.ecosystemID,
            this._tokenEcosystem, this._maxSum, this._payOver, this._signedBy
        ];

        if (fields.length) {
            signParts.push(fields);
        }
        return signParts.join(',');
    }

    sign(privateKey: string) {
        const publicKey = privateToPublic(privateKey);
        const forSign = this.getStringForSign();
        this._publicKey = convert.toArrayBuffer(publicKey);
        this._context.keyID = new Int64BE(address(publicKey));
        this._binSignatures = encodeLengthPlusData(convert.toArrayBuffer(sign(forSign, privateKey)));
    }

    serialize() {
        const params = this._fields.map(l => l.proto.get());
        const codec = msgpack.createCodec({
            binarraybuffer: true,
            preset: true
        });

        const txBuffer = msgpack.encode(
            {
                Header: {
                    Type: this._context.id,
                    Time: this._time,
                    EcosystemID: this._context.ecosystemID,
                    KeyID: this._context.keyID,
                    RoleID: this._context.roleID,
                    NetworkID: this._context.schema.network,
                    PublicKey: this._publicKey,
                    BinSignatures: this._binSignatures
                },
                Params: params
            },
            {
                codec
            }
        );

        return concatBuffer(this._context.schema.header, txBuffer);
    }

    setParam(key: string, value: any) {
        const field = this._fields[key];
        if (!field) {
            throw new Error(`Unknown contract field: ${key}`);
        }
        field.set(value);
    }
}