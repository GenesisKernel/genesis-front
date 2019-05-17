/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IRootState } from 'modules';
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { txExec } from '../actions';
import { modalShow } from '../../modal/actions';
import { navigatePage } from '../../sections/actions';

export const txExecFailedEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(txExec.failed)
        .filter(l => !l.payload.params.silent)
        .map(action => {
            if (action.payload.error.id && action.payload.params.errorRedirects) {
                const errorRedirect = action.payload.params.errorRedirects[action.payload.error.id];
                if (errorRedirect) {
                    return navigatePage.started({
                        name: errorRedirect.pagename,
                        params: errorRedirect.pageparams,
                        force: true
                    });
                }
            }
            return modalShow({
                id: 'TX_ERROR',
                type: 'TX_ERROR',
                params: action.payload.error
            });
        });

export default txExecFailedEpic;