/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import queryString from 'query-string';
import { Action } from 'redux';
import { push } from 'connected-react-router';
import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { navigatePage } from '../actions';
import { LEGACY_PAGES } from 'lib/legacyPages';

const navigatePageEpic: Epic = (action$, store) => action$.ofAction(navigatePage.started)
    .flatMap(action => {
        const state = store.getState();
        const sectionName = (LEGACY_PAGES[action.payload.name] && LEGACY_PAGES[action.payload.name].section) || action.payload.section || state.sections.section;
        const section = state.sections.sections[sectionName];
        const params = queryString.stringify(action.payload.params);

        return Observable.of<Action>(
            push(`/${sectionName}/${action.payload.name || section.defaultPage}${params ? '?' + params : ''}`),
            navigatePage.done({
                params: action.payload,
                result: {
                    section: sectionName
                }
            })
        );
    });

export default navigatePageEpic;