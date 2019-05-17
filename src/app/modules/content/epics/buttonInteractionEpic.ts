/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { Observable } from 'rxjs/Observable';
import { buttonInteraction } from 'modules/content/actions';
import { isType } from 'typescript-fsa';
import { txCall, txExec } from 'modules/tx/actions';
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
            if (isType(action, buttonInteraction) && action.payload.contracts.length) {
                if (store.getState().auth.isDefaultWallet) {
                    return Observable.of(modalShow({
                        id: 'TX_ERROR',
                        type: 'TX_ERROR',
                        params: {
                            type: 'E_GUEST_VIOLATION'
                        }
                    }));
                }

                return Observable.merge(
                    Observable.of(txCall({
                        uuid: action.payload.uuid,
                        silent: action.payload.silent,
                        contracts: action.payload.contracts,
                        errorRedirects: action.payload.errorRedirects
                    })),
                    action$.filter(l =>
                        isType(l, txExec.done) || isType(l, txExec.failed)

                    ).filter((l: ReturnType<typeof txExec.done> | ReturnType<typeof txExec.failed>) =>
                        action.payload.uuid === l.payload.params.uuid

                    ).take(1).flatMap(result => {
                        if (isType(result, txExec.done)) {
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