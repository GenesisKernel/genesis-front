/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { renderLegacyPage } from '../actions';
import { Reducer } from 'modules';

const renderLegacyPageHandler: Reducer<typeof renderLegacyPage.started, State> = (state, payload) => ({
    ...state,
    sections: {
        ...state.sections,
        [payload.section]: {
            ...state.sections[payload.section],
            force: false,
            pending: true
        }
    }
});

export default renderLegacyPageHandler;