// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as queryString from 'query-string';
import { Action } from 'redux';
import { push } from 'react-router-redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { navigatePage } from 'modules/content/actions';
import { modalShow, modalClose } from 'modules/modal/actions';
import { LEGACY_PAGES } from 'lib/legacyPages';

const navigatePageEpic: Epic = (action$, store) => action$.ofAction(navigatePage.started)
    .flatMap(action => {
        const navigate = () => {
            const state = store.getState();
            const sectionName = (LEGACY_PAGES[action.payload.name] && LEGACY_PAGES[action.payload.name].section) || action.payload.section || state.content.section;
            const section = state.content.sections[sectionName];
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
        };

        if (action.payload.confirm) {
            return Observable.merge(
                Observable.of(modalShow({
                    id: 'NAVIGATE',
                    type: 'TX_CONFIRM',
                    params: action.payload.confirm
                })),
                action$.ofAction(modalClose)
                    .take(1)
                    .flatMap(modalPayload => {
                        if ('RESULT' === modalPayload.payload.reason) {
                            return navigate();
                        }
                        else {
                            return Observable.of(navigatePage.failed({
                                params: action.payload,
                                error: null
                            }));
                        }
                    })
            );
        }
        else {
            return navigate();
        }
    });

export default navigatePageEpic;