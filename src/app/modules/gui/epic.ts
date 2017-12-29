// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { IRootState } from 'modules';
import * as actions from './actions';
import platform from 'lib/platform';

export const switchWindowEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.switchWindow.started)
        .map(action => {
            platform.on('desktop', () => {
                const Electron = require('electron');
                Electron.ipcRenderer.sendSync('switchWindow', action.payload.window);
            });

            return actions.switchWindow.done({
                params: action.payload,
                result: action.payload.window
            });
        });

export default combineEpics(
    switchWindowEpic
);