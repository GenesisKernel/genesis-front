/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { navigationToggle } from '../actions';
import { Reducer } from 'modules';

const navigationToggleHandler: Reducer<typeof navigationToggle, State> = (state, payload) => ({
    ...state,
    sections: {
        ...state.sections,
        [state.section]: {
            ...state.sections[state.section],
            menuVisible: !state.sections[state.section].menuVisible
        }
    }
});

export default navigationToggleHandler;