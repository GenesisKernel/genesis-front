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

export interface IRoleButtonProps {
    className?: string;
    badge: number;
    onClick: () => void;
}

const StyledRoleButton = themed.button`
    background: transparent;
    border: solid 1px #4c7dbd;
    border-radius: 2px;
    outline: none;
    font-size: 14px;
    color: #4c7dbd;
    height: 25px;
    line-height: 23px;
    padding: 0;
    vertical-align: top;

    &:hover {
        background: #e9e9e9;
    }
    
    .button-content {
        padding: 0 6px;
        float: left;
        height: 100%;
    }

    .button-badge {
        float: right;
        font-weight: bold;
        height: 100%;
        padding: 0 5px;
        color: #ea4f4f;
    }
`;

const RoleButton: React.SFC<IRoleButtonProps> = (props) => (
    <StyledRoleButton className={props.className} onClick={props.onClick}>
        <div className="button-content">{props.children}</div>
        {0 !== props.badge && (
            <div className="button-badge">{props.badge}</div>
        )}
    </StyledRoleButton>
);

export default RoleButton;