// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
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

import { BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';
import menu from '../menu';
import generalWindow from './general';
import mainWindow from './main';

export let window: BrowserWindow | undefined;
export let windowName: string | undefined;

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
        window = undefined;
        windowName = undefined;
    });

    window = wnd;
    windowName = name;
};