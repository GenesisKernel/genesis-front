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
import themed from 'components/Theme/themed';

export interface ISecurityWarningProps {
    className?: string;
    close: () => void;
}

const SecurityWarning: React.SFC<ISecurityWarningProps> = props => (
    <div className={props.className}>
        <div>
            {props.children}
            <a href="#" onClick={() => props.close()}><em className="icon icon-close" /></a>
        </div>
    </div>
);

export default themed(SecurityWarning)`    
    background: ${props => props.theme.securityWarningBackground};
    color: ${props => props.theme.securityWarningForeground};
    position: fixed;
    top: 5px;
    left: 50%;
    margin-left: -150px;
    width: 300px;
    padding: 10px 25px 10px 20px;
    line-height: 20px;
    z-index: 20000;
    div {
        position: relative;
    }
    a {
        position: absolute;
        right: -5px;
        top: 50%;
        line-height: 20px;
        margin-top: -10px;
        color: ${props => props.theme.securityWarningForeground};
        text-decoration: none;
    }
`;
