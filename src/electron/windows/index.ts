/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';
import menu from '../menu';
import generalWindow from './general';
import mainWindow from './main';

export let window: BrowserWindow;
export let windowName: string;

const ENV = process.env.NODE_ENV || 'production';
const PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http';
const PORT = parseInt(process.env.PORT || '', 10) || 3000;
const HOST = process.env.HOST || '127.0.0.1';

export const appUrl =
    ENV !== 'production'
        ? `${PROTOCOL}://${HOST}:${PORT}`
        : url.format({
            pathname: path.join(__dirname, '../../', 'app', 'index.html'),
            protocol: 'file:',
            slashes: true,
        });

export const spawnWindow = (name: string) => {
    if (window && windowName === name) {
        return;
    }

    let wnd: BrowserWindow;
    switch (name) {
        case 'general':
            wnd = generalWindow();
            break;

        case 'main':
            wnd = mainWindow();
            break;

        default:
            return;
    }

    if (window) {
        window.close();
        window.destroy();
    }

    if (process.platform === 'darwin') {
        Menu.setApplicationMenu(menu);
        wnd.setMenu(menu);
    }

    wnd.loadURL(appUrl);
    wnd.once('ready-to-show', () => {
        wnd.show();
    });

    wnd.on('closed', () => {
        window = null;
        windowName = null;
    });

    window = wnd;
    windowName = name;
};