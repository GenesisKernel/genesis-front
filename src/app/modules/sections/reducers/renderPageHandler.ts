/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { renderPage } from '../actions';
import { Reducer } from 'modules';

const renderPageHandler: Reducer<typeof renderPage.started, State> = (state, payload) => ({
    ...state,
    sections: {
        ...state.sections,
        [payload.section]: {
            ...state.sections[payload.section],
            force: false,
            pending: true,
            visible: true
        }
    }
});

export default renderPageHandler;