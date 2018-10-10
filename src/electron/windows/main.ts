// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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