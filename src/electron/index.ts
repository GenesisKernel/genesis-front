import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import * as path from 'path';
import * as url from 'url';

// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
require('module').globalPaths.push(__dirname);
let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
    const ENV = process.env.NODE_ENV || 'production';
    const PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http';
    const PORT = parseInt(process.env.PORT || '', 10) || 3000;
    const HOST = process.env.HOST || '127.0.0.1';

    const appUrl =
        ENV !== 'production'
            ? `${PROTOCOL}://${HOST}:${PORT}`
            : url.format({
                pathname: path.join(__dirname, '..', 'app', 'index.html'),
                protocol: 'file:',
                slashes: true,
            });

    mainWindow = new BrowserWindow({
        width: 640,
        height: 524,
        minWidth: 640,
        minHeight: 524,
        frame: false
    });
    mainWindow.loadURL(appUrl);
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    if (process.platform === 'darwin') {
        const template: MenuItemConstructorOptions[] = [{
            label: 'Apla',
            submenu: [
                { label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit(); } }
            ]
        }, {
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
        }];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
        mainWindow.setMenu(menu);
    }
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});