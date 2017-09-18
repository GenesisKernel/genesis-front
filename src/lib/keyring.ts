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

import * as CryptoJS from 'crypto-js';
import * as KJUR from 'jsrsasign';

export interface IWalletData {
    encKey: string;
    encrypt: string;
    public: string;
    address: string;
    stateID: number;
    citizenID: number;
}

export default class Keyring {
    publicKey: string;
    encKey: string;
    privateKey: string;
    accounts: IWalletData[] = [];
    signAlg = 'SHA256withECDSA';
    curveName = 'secp256r1';

    constructor(password: string, publicKey: string, encKey: string) {
        this.publicKey = publicKey;
        this.privateKey = this.decrypt(encKey, password);
    }

    decrypt(encKey: string, password: string): string {
        const decrypted = CryptoJS.AES.decrypt(encKey, password).toString(CryptoJS.enc.Hex);
        let privateKey = '';

        for (let i = 0; i < decrypted.length; i += 2) {
            const byte = parseInt(decrypted.substr(i, 2), 16);
            privateKey += String.fromCharCode(byte);
        }

        return privateKey;
    }

    verify(data: string = 'APLA'): boolean {
        const encryptedData = this.sign(data);
        const signature = new KJUR.crypto.Signature({
            alg: this.signAlg,
            prov: 'cryptojs/jsrsa'
        });

        signature.init({ xy: this.publicKey, curve: this.curveName });
        signature.updateString(data);
        return signature.verify(encryptedData);
    }

    sign(data: string, privateKey: string = this.privateKey): string {
        const signature = new KJUR.crypto.Signature({ alg: this.signAlg });
        signature.init({ d: this.privateKey, curve: this.curveName });
        signature.updateString(data);
        return signature.sign();
    }
}