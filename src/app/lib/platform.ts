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
    }
};