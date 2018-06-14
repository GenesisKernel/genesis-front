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

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { buttonInteraction } from 'modules/content/actions';
import { isType } from 'typescript-fsa';
import { ITransactionCall } from 'genesis/tx';
import { txCall, txExecBatch, txExec } from 'modules/tx/actions';
import { modalShow, modalClose, modalPage } from 'modules/modal/actions';
import { navigatePage } from 'modules/sections/actions';

const buttonInteractionEpic: Epic = (action$, store, { api }) => action$.ofAction(buttonInteraction)
    // Show confirmation window if there is any
    .flatMap(rootAction => {
        return Observable.if(
            () => !!rootAction.payload.confirm,
            Observable.merge(
                Observable.of(modalShow({
                    id: rootAction.payload.uuid,
                    type: 'TX_CONFIRM',
                    params: rootAction.payload.confirm
                })),
                action$.ofAction(modalClose).take(1).flatMap(modalPayload => Observable.if(
                    () => 'RESULT' === modalPayload.payload.reason,
                    Observable.of(rootAction),
                    Observable.empty<never>()
                ))
            ),
            Observable.of(rootAction)

        ).flatMap(action => {
            if (isType(action, buttonInteraction)) {
                if (action.payload.contracts || action.payload.contract) {
                    return Observable.merge(
                        Observable.of(txCall(action.payload)),
                        action$.filter(l => {
                            if (action.payload.contract) {
                                return isType(l, txExec.done) || isType(l, txExec.failed);
                            }
                            else if (action.payload.contracts) {
                                return isType(l, txExecBatch.done) || isType(l, txExecBatch.failed);
                            }
                            else {
                                return false;
                            }

                        }).filter(l => {
                            const tx = l as any as { payload: { params: { tx: ITransactionCall } } };
                            return action.payload.uuid === tx.payload.params.tx.uuid;

                        }).take(1).flatMap(result => {
                            if (isType(result, txExecBatch.done) || isType(result, txExec.done)) {
                                return Observable.of(action);
                            }
                            else {
                                return Observable.empty<never>();
                            }
                        })
                    );
                }
                else {
                    return Observable.of(action);
                }
            }
            else {
                return Observable.of(action);
            }

        }).flatMap(action => {
            if (isType(action, buttonInteraction)) {
                if (action.payload.page) {
                    if (action.payload.popup) {
                        return Observable.of(modalPage({
                            name: action.payload.page.name,
                            params: action.payload.page.params,
                            title: action.payload.popup.title,
                            width: action.payload.popup.width
                        }));
                    }
                    else {
                        return Observable.of(navigatePage.started({
                            name: action.payload.page.name,
                            params: action.payload.page.params,
                            force: true
                        }));
                    }
                }
                else {
                    return Observable.empty<never>();
                }
            }
            else {
                return Observable.of(action);
            }
        });
    });

export default buttonInteractionEpic;