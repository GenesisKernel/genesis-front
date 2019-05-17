/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { mergeFullNodes } from '../actions';
import { Reducer } from 'modules';

const mergeFullNodesHandler: Reducer<typeof mergeFullNodes, State> = (state, payload) => {
    const network = state.networks.find(l => payload.uuid === l.uuid);

    if (!network) {
        return state;
    }

    const fullNodes = network.disableSync ? network.fullNodes : [
        ...network.fullNodes,
        ...payload.fullNodes
    ].filter((value, index, self) => self.indexOf(value) === index);

    return {
        ...state,
        networks: [
            ...state.networks.filter(l => l.uuid !== network.uuid),
            {
                ...network,
                fullNodes
            }
        ]
    };
};

export default mergeFullNodesHandler;