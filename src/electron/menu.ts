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

import { MenuItemConstructorOptions, app, Menu } from 'electron';
import { window } from './windows';

const template: MenuItemConstructorOptions[] = [
    {
        label: 'Genesis',
        submenu: [
            { label: 'Quit', accelerator: 'Command+Q', click: app.quit }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
            { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
            { type: 'separator' },
            { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
            { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Toggle Developer Tools', click: () => {
                    if (window) {
                        window.webContents.openDevTools({
                            mode: 'detach'
                        });
                    }
                }
            }
        ]
    }
];

export default Menu.buildFromTemplate(template);