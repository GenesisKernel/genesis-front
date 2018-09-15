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

export interface IContractParam {
    name: string;
    type: string;
    value: object;
}

export default class Contract {
    // DEPRECATED
    private readonly _requestID: string = '';

    private _id: number = 279;
    private _schema: ISchema;
    private _time: number;
    private _keyID: Int64BE = new Int64BE('-4266021234179922125', 10);
    private _ecosystemID: number = 1;
    private _roleID: number = 0;
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

    constructor(id: number, schema: ISchema, fields: IContractParam[]) {
        this._id = id;
        this._schema = schema;
        this._time = Math.floor((new Date()).getTime() / 1000);
        this._fields = fields.map(l => {
            const Field = schema.fields[l.type];
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
            this._requestID, this._id, this._time,
            this._keyID, this._ecosystemID,
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
        this._keyID = new Int64BE(address(publicKey));
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
                    Type: this._id,
                    Time: this._time,
                    EcosystemID: this._ecosystemID,
                    KeyID: this._keyID,
                    RoleID: this._roleID,
                    NetworkID: this._schema.network,
                    PublicKey: this._publicKey,
                    BinSignatures: this._binSignatures
                },
                Params: params
            },
            {
                codec
            }
        );

        return concatBuffer(this._schema.header, txBuffer);
    }

    setParam(key: string, value: any) {
        const field = this._fields[key];
        if (!field) {
            throw new Error(`Unknown contract field: ${key}`);
        }
        field.set(value);
    }
}