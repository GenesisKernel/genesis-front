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

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Heading from 'components/Auth/Heading';

export interface IAddNetworkProps {
    pending: boolean;
    onSubmit?: (params: { name: string, networkID?: number, apiHost: string }) => void;
}

interface IAddNetworkState {
    name: string;
    autoDiscovery: boolean;
    networkID: number;
    apiHost: string;
}

class AddNetwork extends React.Component<IAddNetworkProps, IAddNetworkState> {
    state: IAddNetworkState = {
        name: '',
        autoDiscovery: false,
        networkID: 1,
        apiHost: ''
    };

    onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: e.target.value
        });
    }

    onDiscoveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            autoDiscovery: e.target.checked
        });
    }

    onNetworkIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            networkID: e.target.valueAsNumber
        });
    }

    onApiHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            apiHost: e.target.value
        });
    }

    onSubmit = () => {
        this.props.onSubmit({
            name: this.state.name,
            networkID: this.state.autoDiscovery ? undefined : this.state.networkID,
            apiHost: this.state.apiHost
        });
    }

    render() {
        return (
            <LocalizedDocumentTitle title="auth.login" defaultTitle="Login">
                <div className={classNames('desktop-flex-col desktop-flex-stretch')}>
                    <Heading returnUrl="/networks">NL_ADD_NETWORK</Heading>

                    <div className="text-left">
                        <h4>Name</h4>
                        <div>
                            <input type="text" value={this.state.name} onChange={this.onNameChange} />
                        </div>
                        <h4>Network ID</h4>
                        <div>
                            <div style={{ display: 'inline-block' }}>
                                <input type="number" value={this.state.networkID} disabled={this.state.autoDiscovery} onChange={this.onNetworkIDChange} />
                            </div>
                            <div style={{ display: 'inline-block' }}>
                                <input type="checkbox" checked={this.state.autoDiscovery} onChange={this.onDiscoveryChange} />
                            </div>
                        </div>
                        <h4>Discovery node host</h4>
                        <div>
                            <input type="text" value={this.state.apiHost} onChange={this.onApiHostChange} />
                        </div>

                        <button onClick={this.onSubmit} disabled={this.props.pending}>NL_ADD</button>
                    </div>
                </div>
            </LocalizedDocumentTitle>
        );
    }
}

export default AddNetwork;