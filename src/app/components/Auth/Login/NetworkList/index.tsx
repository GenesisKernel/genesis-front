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
import classNames from 'classnames';
import { INetwork, INetworkEndpoint } from 'apla/auth';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import ContextButton from '../ContextButton';
import HeadingNetwork from 'containers/Auth/HeadingNetwork';
import NetworkListView from './NetworkListView';
import { FormattedMessage } from 'react-intl';

export interface INetworkListProps {
    pending: boolean;
    current?: INetworkEndpoint;
    networks: INetwork[];
    preconfiguredNetworks: INetwork[];
    onAddNetwork?: () => void;
    onConnect?: (uuid: string) => void;
    onRemove?: (network: INetwork) => void;
}

const NetworkList: React.SFC<INetworkListProps> = props => (
    <LocalizedDocumentTitle title="auth.login" defaultTitle="Login">
        <div className={classNames('desktop-flex-col desktop-flex-stretch')}>
            <HeadingNetwork returnUrl="/">
                <FormattedMessage id="general.networks" defaultMessage="Networks" />
            </HeadingNetwork>

            <div className="text-left" style={{ margin: -15, marginBottom: 15 }}>
                <NetworkListView
                    pending={props.pending}
                    current={props.current && props.current.uuid}
                    preconfiguredNetworks={props.preconfiguredNetworks}
                    networks={props.networks}
                    onConnect={props.onConnect}
                    onRemove={props.onRemove}
                />
            </div>
            <div>
                <ContextButton
                    icon="icon-plus"
                    onClick={props.onAddNetwork}
                    description={<FormattedMessage id="general.network.add.desc" defaultMessage="Specify connection details and connect to another network not listed there" />}
                >
                    <FormattedMessage id="general.network.add" defaultMessage="Add network" />
                </ContextButton>
            </div>
        </div>
    </LocalizedDocumentTitle>
);

export default NetworkList;