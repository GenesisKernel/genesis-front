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

import { ipcMain, Event } from 'electron';
import { spawnWindow } from './windows/index';
import config from './config';
import * as _ from 'lodash';

export let state: any = null;
let saveState = () => null as any;

if (!process.argv || !process.argv.find(l => '--nosave' === l)) {
    try {
        state = JSON.parse(config.get('persistentData'));
    }
    catch {
        // Suppress errors
    }

    saveState = _.throttle(() => {
        config.set('persistentData', JSON.stringify({
            storage: state.storage,
            auth: {
                isAuthenticated: state.auth.isAuthenticated,
                isEcosystemOwner: state.auth.isEcosystemOwner,
                sessionToken: state.auth.sessionToken,
                refreshToken: state.auth.refreshToken,
                socketToken: state.auth.socketToken,
                id: state.auth.id,
                account: state.auth.account,
                timestamp: state.auth.timestamp
            }
        }));
    }, 1000, { leading: true });
}

ipcMain.on('setState', (e: Event, updatedState: any) => {
    state = updatedState;
    saveState();
});

ipcMain.on('getState', (e: Event) => {
    e.returnValue = state;
});

ipcMain.on('switchWindow', (e: Event, wnd: string) => {
    e.returnValue = null;
    spawnWindow(wnd);
});