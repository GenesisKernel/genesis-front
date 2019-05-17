/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { switchWindow } from '../actions';
import platform from 'lib/platform';

const switchWindowEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(switchWindow.started)
        .map(action => {
            platform.on('desktop', () => {
                const Electron = require('electron');
                Electron.ipcRenderer.sendSync('switchWindow', action.payload);
            });

            return switchWindow.done({
                params: action.payload,
                result: action.payload
            });
        });

export default switchWindowEpic;