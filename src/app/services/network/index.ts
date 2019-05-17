/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
            fullNodes = [network.apiHost];
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