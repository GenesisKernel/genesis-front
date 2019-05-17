/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Epic } from 'modules';
import { switchWindow } from '../actions';
import { login, loginGuest } from 'modules/auth/actions';
import { isType } from 'typescript-fsa';

const switchWindowOnLoginEpic: Epic =
    (action$, store) => action$.filter(action => isType(action, login.done) || isType(action, loginGuest.done))
        .map(action =>
            switchWindow.started('main')
        );

export default switchWindowOnLoginEpic;