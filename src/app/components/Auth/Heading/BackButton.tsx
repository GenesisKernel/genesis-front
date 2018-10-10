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

import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import platform from 'lib/platform';

export interface IBackButtonProps {
    className?: string;
    returnUrl?: string;
    onClick?: () => void;
}

const BackButton: React.SFC<IBackButtonProps> = props => props.returnUrl ?
    (
        <Link to={props.returnUrl} className={props.className}>
            <em className="button-icon icon-arrow-left" />
            <div className="button-title">
                <FormattedMessage id="general.back" defaultMessage="Back" />
            </div>
        </Link>
    ) : (
        <button type="button" className={props.className} onClick={props.onClick}>
            <em className="button-icon icon-arrow-left" />
            <div className="button-title">
                <FormattedMessage id="general.back" defaultMessage="Back" />
            </div>
        </button>
    );

export default styled(BackButton) `
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
    }
`;