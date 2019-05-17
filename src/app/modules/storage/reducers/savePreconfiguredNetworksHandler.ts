/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { savePreconfiguredNetworks } from '../actions';
import { Reducer } from 'modules';
import { INetwork } from 'apla/auth';

const savePreconfiguredNetworksHandler: Reducer<typeof savePreconfiguredNetworks, State> = (state, payload) => {
    const preconfigured = payload.map(network => {
        const saved = state.networks.find(l => l.uuid === network.uuid);

        if (saved) {
            return {
                ...saved,
                ...network,
                fullNodes: [
                    ...(network.disableSync ? [] : saved.fullNodes),
                    ...network.fullNodes
                ].filter((value, index, self) => self.indexOf(value) === index)
            } as INetwork;
        }
        else {
            return network;
        }
    });

    return {
        ...state,
        networks: [
            ...state.networks.filter(l => !preconfigured.find(p => p.uuid === l.uuid)),
            ...preconfigured
        ]
    };
};

export default savePreconfiguredNetworksHandler;