/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { saveNavigationSize } from '../actions';
import { Reducer } from 'modules';

const saveNavigationSizeHandler: Reducer<typeof saveNavigationSize, State> = (state, payload) => ({
    ...state,
    navigationSize: Math.max(
        payload,
        200
    )
});

export default saveNavigationSizeHandler;