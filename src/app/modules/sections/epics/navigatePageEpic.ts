// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as queryString from 'query-string';
import { Action } from 'redux';
import { push } from 'react-router-redux';
import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { navigatePage } from '..//actions';
import { modalShow, modalClose, modalPage } from 'modules/modal/actions';
import { LEGACY_PAGES } from 'lib/legacyPages';
import { isType } from 'typescript-fsa';

const navigatePageEpic: Epic = (action$, store) => action$.ofAction(navigatePage.started)
    .flatMap(action => Observable.if(
        () => !!action.payload.confirm,
        Observable.merge(
            Observable.of(modalShow({
                id: 'NAVIGATE',
                type: 'TX_CONFIRM',
                params: action.payload.confirm
            })),
            action$.ofAction(modalClose)
                .take(1)
                .flatMap(modalPayload => {
                    if ('RESULT' === modalPayload.payload.reason) {
                        return Observable.of(action);
                    }
                    else {
                        return Observable.of(navigatePage.failed({
                            params: action.payload,
                            error: null
                        }));
                    }
                })
        ),
        Observable.of(action)

    )).flatMap(action => {
        if (isType(action, navigatePage.started)) {
            const state = store.getState();
            const sectionName = (LEGACY_PAGES[action.payload.name] && LEGACY_PAGES[action.payload.name].section) || action.payload.section || state.sections.section;
            const section = state.sections.sections[sectionName];
            const params = queryString.stringify(action.payload.params);

            if (action.payload.popup) {
                return Observable.of<Action>(
                    modalPage({
                        name: action.payload.name,
                        title: action.payload.popup.title,
                        width: action.payload.popup.width,
                        params: action.payload.params
                    }),
                    navigatePage.failed({
                        params: action.payload,
                        error: null
                    })
                );
            }
            else {
                return Observable.of<Action>(
                    push(`/${sectionName}/${action.payload.name || section.defaultPage}${params ? '?' + params : ''}`),
                    navigatePage.done({
                        params: action.payload,
                        result: {
                            section: sectionName
                        }
                    })
                );
            }

        }
        else {
            return Observable.of(action);
        }
    });

export default navigatePageEpic;