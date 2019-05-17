/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { isType } from 'typescript-fsa';
import { Observable } from 'rxjs/Observable';
import { modalClose } from '../actions';
import { navigatePage } from 'modules/sections/actions';

const closeModalOnInteractionEpic: Epic = (action$, store, { api }) => action$.filter(action => isType(action, navigatePage.started))
    .flatMap(action => {
        const state = store.getState();

        return Observable.if(
            () => state.modal.type && !state.modal.result,
            Observable.of(modalClose({
                reason: 'CANCEL',
                data: null
            })),
            Observable.empty<never>()
        );
    });

export default closeModalOnInteractionEpic;