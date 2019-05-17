/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import msgpack from 'msgpack-lite';
import * as convert from 'lib/tx/convert';
import { Int64BE } from 'int64-buffer';
import { privateToPublic, address, sign, Sha256 } from 'lib/crypto';
import { encodeLengthPlusData, concatBuffer } from '../convert';
import { ISchema } from 'lib/tx/schema';
import IField from 'lib/tx/contract/field';

export interface IContractContext {
    id: number;
    schema: ISchema;
    ecosystemID: number;
    networkID: number;
    fields: {
        [name: string]: IContractParam;
    };
}

export interface IContractParam {
    type: string;
    value: object;
}

export default class Contract {
    private _context: IContractContext;
    private _keyID: Int64BE;
    private _time: number;
    private _publicKey: ArrayBuffer;
    private _fields: {
        [name: string]: IField;
    } = {};

    constructor(context: IContractContext) {
        this._context = context;
        this._time = Math.floor((new Date()).getTime() / 1000);
        Object.keys(context.fields).forEach(name => {
            const param = context.fields[name];
            const Field = this._context.schema.fields[param.type];
            const field = new Field();
            field.set(param.value);
            this._fields[name] = field;
        });
    }

    async sign(privateKey: string) {
        const publicKey = privateToPublic(privateKey);
        this._publicKey = convert.toArrayBuffer(publicKey);
        this._keyID = new Int64BE(address(publicKey));

        const data = this.serialize();
        const txHash = await Sha256(data);
        const resultHash = await Sha256(txHash);
        const hexHash = await convert.toHex(resultHash);
        const signature = convert.toArrayBuffer(sign(hexHash, privateKey));

        return {
            hash: hexHash,
            data: concatBuffer(
                this._context.schema.header,
                concatBuffer(
                    encodeLengthPlusData(data),
                    encodeLengthPlusData(signature)
                )
            )
        };
    }

    serialize() {
        const params: { [name: string]: object } = {};
        const codec = msgpack.createCodec({
            binarraybuffer: true,
            preset: true
        });

        Object.keys(this._fields).forEach(name => {
            params[name] = this._fields[name].get();
        });

        const txBuffer = msgpack.encode(
            {
                Header: {
                    ID: this._context.id,
                    Time: this._time,
                    EcosystemID: this._context.ecosystemID,
                    KeyID: this._keyID,
                    NetworkID: this._context.networkID,
                    PublicKey: this._publicKey
                },
                Params: params
            },
            {
                codec
            }
        );

        return txBuffer;
    }
}