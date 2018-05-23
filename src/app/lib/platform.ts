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

export type TPlatformType =
    'desktop' | 'web' | 'win32' | 'linux' | 'darwin';

const isElectron = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
const platform: TPlatformType = isElectron ? 'desktop' : 'web';
let os: NodeJS.Platform = null;

if (isElectron) {
    const process: NodeJS.Process = require('process');
    os = process.platform;
}

export default {
    // Platform.select will return only 1 value depending on which platform
    // this application runs. If 'desktop' is specified instead of providing
    // extact platform name - it will be returned instead
    select: function <T>(platforms: {
        desktop?: T,
        web?: T,
        win32?: T,
        linux?: T,
        darwin?: T
    }): T {
        if (isElectron && platforms[os]) {
            return platforms[os];
        }
        else {
            return platforms[platform];
        }
    },

    on: (platformType: TPlatformType, callback: () => void) => {
        if (platformType === platform) {
            callback();
        }
    },

    args: () => {
        if (isElectron) {
            const electron = require('electron');
            const args: { [key: string]: string } = {};
            (electron.remote.process.argv || []).forEach((arg: string) => {
                const tokens = arg.split('=', 2);
                args[tokens[0]] = tokens[1];
            });
            return args;
        }
        else {
            return {};
        }
    }
};