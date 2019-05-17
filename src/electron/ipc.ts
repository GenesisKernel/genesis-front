// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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

import { ipcMain, Event } from 'electron';
import { spawnWindow } from './windows/index';
import config from './config';
import args from './args';
import * as _ from 'lodash';

export let state: any = null;
let saveState = () => null as any;

if (!args.dry) {
    try {
        state = JSON.parse(config.get('persistentData'));
    }
    catch {
        // Suppress errors
    }

    saveState = _.throttle(() => {
        config.set('persistentData', JSON.stringify({
            storage: state.storage,
            engine: {
                guestSession: state.engine.guestSession,
            },
            auth: {
                isAuthenticated: state.auth.isAuthenticated,
                isDefaultWallet: state.auth.isDefaultWallet,
                session: state.auth.session,
                id: state.auth.id,
                wallet: state.auth.wallet
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

ipcMain.on('getArgs', (e: Event) => {
    e.returnValue = args;
});