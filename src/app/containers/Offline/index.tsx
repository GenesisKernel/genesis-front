// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import { IRootState } from 'modules';
import { checkOnline } from 'modules/engine/actions';

interface IOfflineProps {
    isConnecting: boolean;
    isConnected: boolean;
    checkOnline?: typeof checkOnline.started;
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
            <div className="abs-center ng-scope">
                <div className="text-center mv-lg">
                    <h1 className="mb-lg">
                        <sup>
                            <em className="fa fa-cog fa-2x text-muted fa-spin text-info" />
                        </sup>
                        <em className="fa fa-cog fa-5x text-muted fa-spin text-purple" />
                        <em className="fa fa-cog fa-lg text-muted fa-spin text-success" />
                    </h1>
                    <div className="text-white text-bold text-lg mb-lg">
                        <FormattedMessage id="general.service.offline" defaultMessage="Service offline" />
                    </div>
                    <p className="lead text-white">
                        {this.props.isConnecting && (
                            <FormattedMessage id="general.service.connecting" defaultMessage="Connecting..." />
                        )}
                        {!this.props.isConnecting && (
                            <FormattedMessage id="general.service.connecting.retry.in" defaultMessage="Retrying in {seconds} sec" values={{ seconds: this.state.seconds }} />
                        )}
                    </p>
                    <div className="text-white">
                        <Button bsStyle="link" onClick={this.props.isConnecting ? null : this.props.checkOnline.bind(this)}>
                            <FormattedMessage id="general.service.retry" defaultMessage="Retry now" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    isConnecting: state.engine.isConnecting,
    isConnected: state.engine.isConnected,
});

const mapDispatchToProps = {
    checkOnline: checkOnline.started
};

export default connect(mapStateToProps, mapDispatchToProps)(Offline);