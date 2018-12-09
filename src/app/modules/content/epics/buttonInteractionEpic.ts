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

import { Epic, ofAction } from 'modules';
import { buttonInteraction } from 'modules/content/actions';
import { isType, Action } from 'typescript-fsa';
import { txCall, txExec } from 'modules/tx/actions';
import { modalShow, modalClose, modalPage } from 'modules/modal/actions';
import { flatMap, take, filter, catchError } from 'rxjs/operators';
import { merge, of, empty } from 'rxjs';
import { push } from 'connected-react-router';

const buttonInteractionEpic: Epic = (action$, store, { api, routerService }) => action$.ofAction(buttonInteraction).pipe(
    // Show confirmation window if there is any
    flatMap(action => {
        if (action.payload.confirm) {
            return merge(
                of(modalShow({
                    type: 'TX_CONFIRM',
                    params: action.payload.confirm
                })),
                action$.ofAction(modalClose).pipe(
                    take(1),
                    flatMap(modalPayload => {
                        // TODO: refactoring
                        return of(action);
                    })
                )
            );
        }
        else {
            return of(action);
        }
    }),

    // Perform contract exection if there is any
    flatMap(action => {
        if (isType(action, buttonInteraction) && action.payload.contracts.length) {
            return merge(
                of(txCall({
                    uuid: action.payload.uuid,
                    silent: action.payload.silent,
                    contracts: action.payload.contracts,
                    errorRedirects: action.payload.errorRedirects
                })),
                action$.pipe(
                    ofAction(txExec.done, txExec.failed),
                    filter(l => action.payload.uuid === l.payload.params.uuid),
                    take(1),
                    flatMap(result => {
                        if (isType(result, txExec.done)) {
                            return of(action);
                        }
                        else {
                            return empty();
                        }
                    })
                )
            );
        }
        else {
            return of(action);
        }
    }),

    // Perform page redirection if there is any
    flatMap(action => {
        if (isType(action, buttonInteraction)) {
            if (action.payload.page) {
                if (action.payload.popup) {
                    return of(modalPage({
                        name: action.payload.page.name,
                        section: action.payload.page.section,
                        params: action.payload.page.params,
                        title: action.payload.popup.title,
                        width: action.payload.popup.width
                    }));
                }
                else {
                    // TODO: refactoring
                    const redirectUrl = routerService.generateRoute(`/${action.payload.page.section}/${action.payload.page.name}`, action.payload.page.params);
                    return of<Action<any>>(
                        push(redirectUrl, { from: action.payload.from })
                    );
                }
            }
            else {
                return empty();
            }
        }
        else {
            return of<Action<any>>(action);
        }
    }),
    catchError(e => empty())
);

export default buttonInteractionEpic;