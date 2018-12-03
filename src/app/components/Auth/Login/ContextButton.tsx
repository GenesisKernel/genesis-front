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
import styled from 'styled-components';

export interface IContextButtonProps {
    className?: string;
    icon: string;
    description: React.ReactNode;
    onClick: () => void;
}

const ContextButton: React.SFC<IContextButtonProps> = props => (
    <button className={props.className} onClick={props.onClick}>
        <div className="button-icon">
            <em className={props.icon} />
        </div>
        <div>
            <div className="button-label">
                {props.children}
            </div>
            <div className="button-desc">{props.description}</div>
        </div>
    </button>
);

export default styled(ContextButton)`
    display: block;
    width: 100%;
    height: 40px;
    color: #4085dc;
    border: 0;
    background: 0;
    padding: 0;
    margin: 10px 0 15px 0;
    text-align: left;

    &:hover {
        color: #76a6e2;
    }

    .button-icon {
        vertical-align: top;
        text-align: center;
        float: left;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 22px;
        margin-right: 5px;
    }

    .button-label {
        font-size: 16px;
    }

    .button-desc {
        color: #909FA7;
    }
`;