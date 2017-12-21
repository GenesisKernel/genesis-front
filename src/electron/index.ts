import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
// import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

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

    //   installExtension(REACT_DEVELOPER_TOOLS)
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log('An error occurred: ', err));
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
