/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { renderSection } from '../actions';
import { Reducer } from 'modules';

const switchSectionHandler: Reducer<typeof renderSection, State> = (state, payload) => {
    return state.sections[payload] ? {
        ...state,
        section: payload
    } : state;
};

export default switchSectionHandler;