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
import NetworkButton from './NetworkButton';
import HeadingNetwork from 'containers/Auth/HeadingNetwork';

export interface INetworkListProps {
    pending: boolean;
    current?: INetworkEndpoint;
    networks: INetwork[];
    onAddNetwork?: () => void;
    onConnect?: (uuid: string) => void;
    onRemove?: (network: INetwork) => void;
}

const NetworkList: React.SFC<INetworkListProps> = props => (
    <LocalizedDocumentTitle title="auth.login" defaultTitle="Login">
        <div className={classNames('desktop-flex-col desktop-flex-stretch')}>
            <HeadingNetwork returnUrl="/">
                NL_NETWORKS
            </HeadingNetwork>

            <div className="text-left">
                {/* <div><b>Configured network</b></div>
                <NetworkButton network={props.defaultNetwork} onConnect={() => props.onConnect('DEFAULT')} />
                <hr /> */}

                <div><b>Network list</b></div>
                <hr />
                {props.networks.map(network => (
                    <div key={network.uuid}>
                        <NetworkButton
                            network={network}
                            active={props.current && props.current.uuid === network.uuid}
                            disabled={props.pending}
                            onConnect={() => props.onConnect(network.uuid)}
                            onRemove={() => props.onRemove(network)}
                        />
                        <hr />
                    </div>
                ))}

                <ContextButton icon="icon-plus" onClick={props.onAddNetwork} description="NL_ADD_NETWORK">
                    <span>NL_ADD_NETWORK</span>
                </ContextButton>
                <ContextButton icon="icon-refresh" onClick={() => null} description="NL_SYNC">
                    <span>NL_SYNC</span>
                </ContextButton>
            </div>
        </div>
    </LocalizedDocumentTitle>
);

export default NetworkList;