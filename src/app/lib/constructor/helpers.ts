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

declare const window: Window & { clipboardData: any };

export function isSimpleBody(body: string): boolean {
    return typeof body === 'string' && body.indexOf('(') === -1;
}

export function quoteValueIfNeeded(value: string): string {
    const quote = value.indexOf(',') >= 0;
    return (quote ? '"' : '') + value + (quote ? '"' : '');
}

export function getParamsStr(name: string, obj: Object) {
    let paramsArr = [];
    for (let param in obj) {
        if (obj.hasOwnProperty(param)) {
            paramsArr.push(param + '=' + (obj[param] && obj[param].text || ''));
        }
    }
    return name + ': ' + '"' + paramsArr.join(',') + '"';
}

export function OnPasteStripFormatting(elem: any, e: any) {
    let text: string;
    if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
        e.preventDefault();
        text = e.originalEvent.clipboardData.getData('text/plain');
        window.document.execCommand('insertText', false, text);
    }
    else if (e.clipboardData && e.clipboardData.getData) {
        e.preventDefault();
        text = e.clipboardData.getData('text/plain');
        window.document.execCommand('insertText', false, text);
    }
}