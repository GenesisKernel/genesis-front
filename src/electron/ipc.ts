/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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