/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { navigatePage } from '../actions';
import { Reducer } from 'modules';

const navigatePageDoneHandler: Reducer<typeof navigatePage.done, State> = (state, payload) => ({
    ...state,
    section: payload.result.section,
    sections: {
        ...state.sections,
        [payload.result.section]: {
            ...state.sections[payload.result.section],
            page: state.sections[payload.result.section].page,
            force: payload.params.force,
            pending: false
        }
    }
});

export default navigatePageDoneHandler;