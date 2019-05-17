/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import queryString from 'query-string';
import { Epic } from 'modules';
import { push } from 'connected-react-router';
import { renderSection } from '../actions';

const renderSectionEpic: Epic = (action$, store) => action$.ofAction(renderSection)
    .map(action => {
        const state = store.getState();
        const section = state.sections.sections[action.payload];
        const params = section.page ? queryString.stringify(section.page.params) : '';
        return push(`/${section.name}/${section.page ? section.page.name : ''}${params ? '?' + params : ''}`);
    });

export default renderSectionEpic;