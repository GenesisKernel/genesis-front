/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { renderSection } from '../actions';
import { Reducer } from 'modules';

const closeSectionHandler: Reducer<typeof renderSection, State> = (state, payload) => {
    return state.sections[payload] ? {
        ...state,
        sections: {
            ...state.sections,
            [payload]: {
                ...state.sections[payload],
                visible: false
            }
        }
    } : state;
};

export default closeSectionHandler;