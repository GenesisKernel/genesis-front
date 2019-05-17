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
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import NetworkError from 'services/network/errors';

import Error from './Error';

export interface IOfflineProps {
    error: NetworkError;
}

const Offline: React.SFC<IOfflineProps> = props => (
    <div>
        {props.error && (
            <Error error={props.error} />
        )}
        {!props.error && (
            <div style={{ padding: 30 }}>
                <i className="fa fa-chain-broken text-primary" style={{ fontSize: 128 }} />
                <h3>
                    <FormattedMessage id="general.network.notconnected" defaultMessage="Not connected" />
                </h3>
                <div className="text-muted">
                    <FormattedMessage id="general.network.notconnected.desc" defaultMessage="Please connect to a network to begin using Apla. You can manage networks by clicking on the connection indicator in the top right corner of this window" />
                </div>
                <div style={{ marginTop: 25 }}>
                    <Link to="/networks" className="btn btn-primary">
                        <FormattedMessage id="general.network.connect" defaultMessage="Connect" />
                    </Link>
                </div>
            </div>
        )}
    </div>
);

export default Offline;