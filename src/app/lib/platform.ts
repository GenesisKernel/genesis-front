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

import { IInferredArguments } from 'genesis/gui';

export type TPlatformType =
    'desktop' | 'web' | 'win32' | 'linux' | 'darwin';

export type TTargetType =
    'desktop' | 'web';

const isElectron = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
const target: TTargetType = isElectron ? 'desktop' : 'web';

let os: NodeJS.Platform | 'web' = 'web';
let args: IInferredArguments = {};

const requireModule = (moduleName: string) => {
    const electron = (window as Window & { require: NodeRequire }).require('electron');
    return electron.remote.require(moduleName);
};

interface IPlatformModule {
    select: <T>(platforms: { [K in TPlatformType]?: T }) => T | undefined;
    target: <T>(targets: { [K in TTargetType]: T }) => T;
    on: (platformType: TPlatformType, callback: () => void) => void;
    getElectron: () => typeof Electron;
    require: NodeRequire;
    args: IInferredArguments;
}

const platform: IPlatformModule = {
    // Platform.select will return only 1 value depending on which platform
    // this application runs. If 'desktop' is specified instead of providing
    // extact platform name - it will be returned instead
    select: platforms => {
        if (isElectron && os in platforms) {
            return platforms[os as TPlatformType];
        }
        else {
            return platforms[target];
        }
    },

    target: targets => {
        return targets[target];
    },

    on: (platformType, callback) => {
        if (platformType === target) {
            callback();
        }
    },

    getElectron: () => {
        return (window as Window & { require: NodeRequire }).require('electron');
    },

    require: requireModule as NodeRequire,

    args
};

if (isElectron) {
    const electron = platform.getElectron();
    const process: NodeJS.Process = platform.require('process');
    os = process.platform;
    // TODO: refactoring
    // platform.args = electron.ipcRenderer.sendSync('getArgs') || {};
}

export default platform;