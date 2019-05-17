/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { closeSection, renderSection } from '..//actions';
import { Observable } from 'rxjs/Observable';

const closeSectionEpic: Epic = (action$, store) => action$.ofAction(closeSection)
    .flatMap(action => {
        const state = store.getState();
        if (action.payload === state.sections.section) {
            return Observable.of(renderSection('home'));
        }
        else {
            return Observable.empty<never>();
        }
    });

export default closeSectionEpic;