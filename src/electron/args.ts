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

import * as commander from 'commander';
import { IInferredArguments } from 'apla/gui';

// Normalize electron launch arguments
const argv = process.argv.slice();
const executable = argv.shift();
if (!argv[0] || argv[0] && argv[0] !== '.') {
    argv.unshift('');
}
argv.unshift(executable);

const command = commander
    .option('-n, --full-node <url>', null, (value, stack) => {
        stack.push(value);
        return stack;
    }, [])
    .option('-k, --private-key <key>')
    .option('-d, --dry')
    .option('-x, --offset-x <value>', null, parseInt)
    .option('-y, --offset-y <value>', null, parseInt)
    .option('-s, --socket-url <url>', null)
    .option('-u, --disable-full-nodes-sync', null)
    .parse(argv);

const args: IInferredArguments = {
    privateKey: command.privateKey,
    fullNode: command.fullNode,
    dry: command.dry,
    offsetX: command.offsetX,
    offsetY: command.offsetY,
    socketUrl: command.socketUrl,
    disableFullNodesSync: command.disableFullNodesSync
};

export default args;