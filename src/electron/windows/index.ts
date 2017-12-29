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

import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import menu from '../menu';

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

export const spawnWindow = (wnd: BrowserWindow, name: string) => {
    if (window) {
        window.close();
        window.destroy();
    }

    if (process.platform === 'darwin') {
        wnd.setMenu(menu);
    }

    // wnd.webContents.openDevTools();
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