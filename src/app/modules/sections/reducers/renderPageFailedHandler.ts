/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { renderPage } from '../actions';
import { Reducer } from 'modules';

const renderPageFailedHandler: Reducer<typeof renderPage.failed, State> = (state, payload) => ({
    ...state,
    sections: {
        ...state.sections,
        [payload.params.section]: {
            ...state.sections[payload.params.section],
            page: {
                params: payload.params.params,
                name: payload.params.name,
                content: null,
                error: payload.error
            },
            pending: false
        }
    }
});

export default renderPageFailedHandler;