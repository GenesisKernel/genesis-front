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

import React from 'react';
import { INetwork } from 'apla/auth';

export interface INetworkButtonProps {
    active?: boolean;
    disabled?: boolean;
    static?: boolean;
    network: INetwork;
    onConnect: () => void;
    onRemove: () => void;
}

const NetworkButton: React.SFC<INetworkButtonProps> = props => (
    <div>
        <div style={{ display: 'inline-block' }}>
            <div>[{props.network.id}] {props.network.name}</div>
        </div>
        <div style={{ display: 'inline-block', verticalAlign: 'middle', fontSize: 24, fontWeight: 'bold' }}>{props.network.fullNodes.length}</div>
        <div style={{ display: 'inline-block', verticalAlign: 'middle', fontSize: 24, fontWeight: 'bold' }}>
            {props.active && 'CURRENT'}
        </div>
        <div style={{ display: 'inline-block', float: 'right' }}>
            <button disabled={props.disabled || props.active} onClick={props.onConnect}>Connect</button>
            {!props.static && (
                <button onClick={props.onRemove} disabled={props.disabled}>Remove</button>
            )}
        </div>
    </div>
);

export default NetworkButton;