/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BrowserWindow } from 'electron';
import config from '../config';
import calcScreenOffset from '../util/calcScreenOffset';

export default () => {
    const options = {
        minWidth: 800,
        minHeight: 600,
        frame: false,
        backgroundColor: '#3d2c77',
        resizable: true,
        show: false,
        maximized: config.get('maximized') || false,
        ...calcScreenOffset(config.get('dimensions') || { width: 800, height: 600 })
    };

    const window = new BrowserWindow(options);

    window.on('close', () => {
        config.set('dimensions', window.getBounds());
        config.set('maximized', window.isMaximized() || window.isMaximized);
    });

    return window;
};