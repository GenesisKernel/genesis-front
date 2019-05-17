/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { generateSeed } from '../actions';
import keyring from 'lib/keyring';

const authorizeEpic: Epic = (action$, store) => action$.ofAction(generateSeed.started)
    .map(action =>
        generateSeed.done({
            params: action.payload,
            result: keyring.generateSeed()
        })
    );

export default authorizeEpic;