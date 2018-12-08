const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const menuTemplate = [
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

const path = require('path');
const isDev = require('electron-is-dev');

const menu = Menu.buildFromTemplate(menuTemplate);
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        frame: false,
        backgroundColor: '#17437b',
        resizable: true,
        show: false
    });

    if ('darwin' === process.platform) {
        Menu.setApplicationMenu(menu);
    }

    mainWindow.setMenu(menu);
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.on('ready', createWindow);

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