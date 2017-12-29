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

import { ipcMain, Event } from 'electron';
import { spawnWindow } from './windows/index';
import generalWindow from './windows/general';
import mainWindow from './windows/main';

export type TState = {
    [key: string]: any;
    auth: {
        isAuthenticated: boolean;
    };
};

export let state: TState = null;

ipcMain.on('setState', (e: Event, updatedState: TState) => {
    state = updatedState;
});

ipcMain.on('getState', (e: Event) => {
    e.returnValue = state;
});

ipcMain.on('switchWindow', (e: Event, wnd: string) => {
    switch (wnd) {
        case 'general':
            spawnWindow(generalWindow(), wnd);
            break;

        case 'main':
            spawnWindow(mainWindow(), wnd);
            break;

        default:
            break;
    }
});