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
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { INetwork } from 'apla/auth';

import Table from 'components/Table';

export interface INetworkListViewProps {
    pending?: boolean;
    current?: string;
    preconfiguredNetworks: INetwork[];
    networks: INetwork[];
    onConnect?: (uuid: string) => void;
    onRemove?: (network: INetwork) => void;
}

interface INetworkActionsProps {
    disabled?: boolean;
    onConnect?: () => void;
    onRemove?: () => void;
}

const NetworkActions: React.SFC<INetworkActionsProps> = props => (
    <div style={{ whiteSpace: 'nowrap' }}>
        {props.onConnect && (
            <button className="btn btn-link p0 mr" disabled={props.disabled} onClick={props.onConnect}>
                <FormattedMessage id="general.network.connect" defaultMessage="Connect" />
            </button>
        )}
        {props.onRemove && (
            <button className="btn btn-link p0" disabled={props.disabled} onClick={props.onRemove}>
                <FormattedMessage id="general.network.remove" defaultMessage="Remove" />
            </button>
        )}
    </div>
);

const NetworkName: React.SFC<{ name: string, current: boolean }> = props => (
    <div>
        {props.current && (
            <b>(<FormattedMessage id="general.network.current" defaultMessage="Current" />)&nbsp;</b>
        )}
        {props.name}
    </div>
);

class NetworkListView extends React.Component<INetworkListViewProps & InjectedIntlProps> {
    buildRow = (network: INetwork, preconfigured?: boolean) => [
        <b key={network.uuid} style={{ whiteSpace: 'nowrap' }}>{network.id}</b>,
        <NetworkName key={network.uuid} name={network.name} current={this.props.current === network.uuid} />,
        network.fullNodes.length,
        (
            <NetworkActions
                key={network.uuid}
                disabled={this.props.pending || this.props.current === network.uuid}
                onConnect={() => this.props.onConnect(network.uuid)}
                onRemove={preconfigured ? undefined : () => this.props.onRemove(network)}
            />
        )
    ]

    render() {
        return (
            <Table
                bordered
                hover
                columns={[
                    { title: this.props.intl.formatMessage({ id: 'general.network.id.short', defaultMessage: 'ID' }), width: 5 },
                    { title: this.props.intl.formatMessage({ id: 'general.network.name', defaultMessage: 'Name' }) },
                    { title: this.props.intl.formatMessage({ id: 'general.network.full_nodes', defaultMessage: 'Nodes' }), width: 1 },
                    { title: this.props.intl.formatMessage({ id: 'general.network.actions', defaultMessage: 'Actions' }), width: 1 }
                ]}
                data={[
                    ...this.props.preconfiguredNetworks.map(network => this.buildRow(network, true)),
                    ...this.props.networks.map(network => this.buildRow(network))
                ]}
            />
        );
    }
}

export default injectIntl(NetworkListView);