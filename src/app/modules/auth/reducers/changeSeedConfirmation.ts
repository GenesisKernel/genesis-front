/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { changeSeed } from '../actions';
import { Reducer } from 'modules';

const changeSeedConfirmationHandler: Reducer<typeof changeSeed, State> = (state, payload) => ({
    ...state,
    seedConfirm: payload
});

export default changeSeedConfirmationHandler;