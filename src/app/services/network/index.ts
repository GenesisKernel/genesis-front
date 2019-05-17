// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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

import { INetworkEndpoint } from 'apla/auth';
import AplaAPI from 'lib/aplaAPI';
import keyring from 'lib/keyring';
import NetworkError from './errors';

export const discover = async (network: INetworkEndpoint, key: string, networkID?: number) => {
    const client = new AplaAPI({
        apiHost: network.apiHost
    });

    try {
        var uid = await client.getUid();
    }
    catch {
        throw NetworkError.Offline;
    }

    if ('number' === typeof networkID && uid.networkID !== networkID) {
        throw NetworkError.IDMismatch;
    }

    try {
        const tempClient = client.authorize(uid.token);
        const loginResult = await tempClient.login({
            publicKey: keyring.generatePublicKey(key),
            signature: keyring.sign(uid.uid, key)
        });
        const securedClient = client.authorize(loginResult.token);
        const socketUrl: string | undefined = await client.getConfig({ name: 'centrifugo' }).catch(e => undefined);
        const fullNodesPlain = (await securedClient.getSystemParams({ names: ['full_nodes'] }))
            .list
            .find(l => 'full_nodes' === l.name)
            .value;

        try {
            var fullNodes: string[] = JSON.parse(fullNodesPlain)
                .map((l: any) => l.api_address);
        }
        catch {
            fullNodes = [];
        }

        return {
            networkID: uid.networkID,
            socketUrl,
            loginResult,
            fullNodes
        };
    }
    catch {
        throw NetworkError.ServerMisconfiguration;
    }
};