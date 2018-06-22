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

import { screen, Rectangle } from 'electron';
import args from '../args';

export default function calcScreenOffset(sourceRect: { width: number, height: number }): Rectangle {
    const x = args.offsetX;
    const y = args.offsetY;

    if (x === x && y === y) {
        const primaryDisplay = screen.getPrimaryDisplay();
        const resultX = Math.round((primaryDisplay.workArea.width / 2) - (sourceRect.width / 2) + x);
        const resultY = Math.round((primaryDisplay.workArea.height / 2) - (sourceRect.height / 2) + y);

        return {
            x: resultX,
            y: resultY,
            width: sourceRect.width,
            height: sourceRect.height
        };
    }
    else {
        return {
            x: null,
            y: null,
            width: sourceRect.width,
            height: sourceRect.height
        };
    }
}