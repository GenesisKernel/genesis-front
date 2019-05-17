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
import { FormattedMessage } from 'react-intl';
import { Col } from 'react-bootstrap';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import HeadingNetwork from 'containers/Auth/HeadingNetwork';
import Validation from 'components/Validation';

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

    onNameChange = (name: string) => {
        this.setState({
            name
        });
    }

    onDiscoveryChange = (autoDiscovery: boolean) => {
        this.setState({
            autoDiscovery
        });
    }

    onNetworkIDChange = (networkID: number) => {
        this.setState({
            networkID
        });
    }

    onApiHostChange = (apiHost: string) => {
        this.setState({
            apiHost
        });
    }

    onSubmit = (payload: any) => {
        this.props.onSubmit({
            name: payload.name,
            networkID: payload.discovery ? undefined : parseInt(payload.id, 10),
            apiHost: payload.url
        });
    }

    render() {
        return (
            <LocalizedDocumentTitle title="auth.login" defaultTitle="Login">
                <div className={classNames('desktop-flex-col desktop-flex-stretch')}>
                    <HeadingNetwork returnUrl="/networks">
                        <FormattedMessage id="general.network.add" defaultMessage="Add network" />
                    </HeadingNetwork>
                    <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit}>
                        <fieldset>
                            <p className="text-center">
                                <FormattedMessage id="general.network.add.help" defaultMessage="Enter network parameters. If connection succeeds it will be added to the list of configured networks" />
                            </p>
                        </fieldset>
                        <fieldset>
                            <Validation.components.ValidatedFormGroup for="name">
                                <Col md={3} className="clearfix">
                                    <div className="pull-left">
                                        <FormattedMessage id="general.network.name" defaultMessage="Name" />
                                    </div>
                                    <div className="pull-right visible-sm visible-xs">
                                        <Validation.components.ValidationMessage for="name" />
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <div>
                                        <Validation.components.ValidatedControl
                                            onChange={e => this.onNameChange((e.target as HTMLInputElement).value)}
                                            value={this.state.name}
                                            name="name"
                                            validators={[Validation.validators.required]}
                                        />
                                    </div>
                                </Col>
                            </Validation.components.ValidatedFormGroup>
                        </fieldset>
                        <fieldset>
                            <Validation.components.ValidatedFormGroup for="id">
                                <Col md={3} className="clearfix">
                                    <div className="pull-left">
                                        <FormattedMessage id="general.network.id.short" defaultMessage="ID" />
                                    </div>
                                    <div className="pull-right visible-sm visible-xs">
                                        <Validation.components.ValidationMessage for="id" />
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <div className="text-left">
                                        <Validation.components.ValidatedControl
                                            onChange={e => this.onNetworkIDChange((e.target as HTMLInputElement).valueAsNumber)}
                                            value={String(this.state.networkID)}
                                            type="number"
                                            name="id"
                                            key={String(this.state.autoDiscovery)}
                                            disabled={this.state.autoDiscovery}
                                            validators={this.state.autoDiscovery ? [] : [Validation.validators.required]}
                                        />
                                        <Validation.components.ValidatedCheckbox
                                            onChange={e => this.onDiscoveryChange((e.target as HTMLInputElement).checked)}
                                            checked={this.state.autoDiscovery}
                                            name="discovery"
                                            title={
                                                <FormattedMessage id="general.network.id.auto" defaultMessage="Automatic discovery" />
                                            }
                                        />
                                    </div>
                                </Col>
                            </Validation.components.ValidatedFormGroup>
                        </fieldset>
                        <fieldset>
                            <Validation.components.ValidatedFormGroup for="url">
                                <Col md={3} className="clearfix">
                                    <div className="pull-left">
                                        <FormattedMessage id="general.network.url" defaultMessage="Node URL" />
                                    </div>
                                    <div className="pull-right visible-sm visible-xs">
                                        <Validation.components.ValidationMessage for="url" />
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <div className="text-left">
                                        <Validation.components.ValidatedControl
                                            onChange={e => this.onApiHostChange((e.target as HTMLInputElement).value)}
                                            value={this.state.apiHost}
                                            name="url"
                                            validators={[Validation.validators.required]}
                                        />
                                    </div>
                                </Col>
                            </Validation.components.ValidatedFormGroup>
                        </fieldset>

                        <div className="text-right">
                            <Validation.components.ValidatedSubmit bsStyle="primary" disabled={this.props.pending}>
                                <FormattedMessage id="process.continue" defaultMessage="Continue" />
                            </Validation.components.ValidatedSubmit>
                        </div>
                    </Validation.components.ValidatedForm>
                </div>
            </LocalizedDocumentTitle>
        );
    }
}

export default AddNetwork;