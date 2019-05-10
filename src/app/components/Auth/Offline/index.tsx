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
import { FormattedMessage } from 'react-intl';
import NetworkError from 'services/network/errors';

export interface IOfflineProps {
    error: NetworkError;
}

const Offline: React.SFC<IOfflineProps> = props => (
    <div className="text-center mv-lg">
        <h1 className="mb-lg">
            <sup>
                <em className="fa fa-cog fa-2x text-muted fa-spin text-info" />
            </sup>
            <em className="fa fa-cog fa-5x text-muted fa-spin text-purple" />
            <em className="fa fa-cog fa-lg text-muted fa-spin text-success" />
        </h1>
        <div className="text-bold text-lg mb-lg">
            <FormattedMessage id={`general.network.error.${props.error}`} defaultMessage="Network is unreachable" />
        </div>
    </div>
);

export default Offline;