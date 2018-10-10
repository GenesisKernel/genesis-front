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
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';

import LocalizedDocumentTitle from 'components/DocumentTitle/LocalizedDocumentTitle';
import Heading from 'components/Auth/Heading';

export interface IOfflineProps {
    isConnecting: boolean;
    isConnected: boolean;
    checkOnline?: (params: null) => void;
}

interface IOfflineState {
    seconds: number;
}

class Offline extends React.Component<IOfflineProps, IOfflineState> {
    private _interval: number;

    constructor(props: IOfflineProps) {
        super(props);
        this.state = {
            seconds: 60
        };
    }

    componentDidMount() {
        this.resetTimer();
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    componentWillReceiveProps(props: IOfflineProps) {
        this.resetTimer();
    }

    resetTimer() {
        if (this._interval) {
            clearInterval(this._interval);
        }
        this.setState({ seconds: 60 });
        this._interval = setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        const seconds = this.state.seconds - 1;

        if (0 >= seconds) {
            this.props.checkOnline(null);
        }
        else {
            this.setState({
                seconds
            });
        }
    }

    render() {
        return (
            <LocalizedDocumentTitle title="general.service.offline" defaultTitle="Service offline">
                <div className="desktop-flex-col desktop-flex-stretch">
                    <Heading>
                        <FormattedMessage id="general.service.offline" defaultMessage="Service offline" />
                    </Heading>
                    <div className="text-center mv-lg">
                        <h1 className="mb-lg">
                            <sup>
                                <em className="fa fa-cog fa-2x text-muted fa-spin text-info" />
                            </sup>
                            <em className="fa fa-cog fa-5x text-muted fa-spin text-purple" />
                            <em className="fa fa-cog fa-lg text-muted fa-spin text-success" />
                        </h1>
                        <div className="text-bold text-lg mb-lg">
                            <FormattedMessage id="general.service.offline" defaultMessage="Service offline" />
                        </div>
                        <p className="lead">
                            {this.props.isConnecting && (
                                <FormattedMessage id="general.service.connecting" defaultMessage="Connecting..." />
                            )}
                            {!this.props.isConnecting && (
                                <FormattedMessage id="general.service.connecting.retry.in" defaultMessage="Retrying in {seconds} sec" values={{ seconds: this.state.seconds }} />
                            )}
                        </p>
                        <div>
                            <Button bsStyle="link" onClick={this.props.isConnecting ? null : this.props.checkOnline}>
                                <FormattedMessage id="general.service.retry" defaultMessage="Retry now" />
                            </Button>
                        </div>
                    </div>
                </div>
            </LocalizedDocumentTitle>
        );
    }
}

export default Offline;