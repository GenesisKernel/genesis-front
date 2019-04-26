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
import classNames from 'classnames';
import platform from 'lib/platform';
import { Link } from 'react-router-dom';

export interface IOptionButtonProps {
    className?: string;
    icon: string;
    navigateUrl: string;
}

const OptionButton: React.SFC<IOptionButtonProps> = props => (
    <Link to={props.navigateUrl} className={props.className}>
        <em className={classNames('button-icon', props.icon)} />
        <div className="button-title">
            {props.children}
        </div>
    </Link>
);

export default styled(OptionButton)`
    text-decoration: none !important;
    border: 0;
    background: 0;
    padding: 0;
    color: ${platform.select({ desktop: '#4085dc', web: '#fff' })};
    font-size: 14px;

    &:hover {
        color: #76a6e2;
    }

    .button-icon {
        margin-right: 5px;
    }

    .button-title {
        vertical-align: top;
        display: inline-block;
        line-height: 40px;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;