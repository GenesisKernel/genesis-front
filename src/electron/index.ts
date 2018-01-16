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

require('module').globalPaths.push(__dirname);

import { app } from 'electron';
import { spawnWindow, window } from './windows/index';
import generalWindow from './windows/general';
import mainWindow from './windows/main';
import { state } from './ipc';

app.on('ready', () => {
    spawnWindow(generalWindow(), 'general');
});

app.on('window-all-closed', () => {
    if ('darwin' !== process.platform) {
        app.quit();
    }
});

app.on('activate', () => {
    if (null === window) {
        if (state && state.auth.isAuthenticated) {
            spawnWindow(mainWindow(), 'main');
        }
        else {
            spawnWindow(generalWindow(), 'general');
        }
    }
});