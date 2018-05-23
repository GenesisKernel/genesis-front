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

import * as React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export interface IRoleButtonProps {
    className?: string;
    id: number;
    name: string;
    notifications: number;
    onSelect: () => void;
}

const RoleButton: React.SFC<IRoleButtonProps> = props => (
    <Button className={props.className} block bsStyle="default" onClick={props.onSelect}>
        <div className="media-box text-left">
            <div>
                <p className="pl m0">
                    {props.name}
                </p>
            </div>
            {props.notifications ? (
                <div className="notifications">
                    {props.notifications}
                </div>
            ) : null}
        </div>
    </Button>
);

export default styled(RoleButton) `
    position: relative;
    border: solid 1px transparent;
    padding: 0;
    height: 46px;
    overflow: hidden;
    padding-right: 45px;
    position: relative;

    .notifications {
        text-align: center;
        position: absolute;
        right: 10px;
        top: 10px;
        bottom: 10px;
        width: 25px;
        line-height: 25px;
        background: #d87272;
        color: #fff;
    }
`;