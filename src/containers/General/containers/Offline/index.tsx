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
import { Panel, Button } from 'react-bootstrap';
import { IRootState } from 'modules';
import { identity, navigate, setLoading } from 'modules/engine/actions';

interface IOfflineProps {
    isConnecting: boolean;
    isConnected: boolean;
    identity?: typeof identity.started;
    navigate?: typeof navigate;
    setLoading?: typeof setLoading;
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

    componentWillMount() {
        this.resetTimer();
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    componentWillReceiveProps(props: IOfflineProps) {
        if (props.isConnected) {
            this.props.setLoading(true);
            this.props.navigate('/');
        }
        else if (!props.isConnecting) {
            this.resetTimer();
        }
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
            this.props.identity(null);
        }
        else {
            this.setState({
                seconds
            });
        }
    }

    render() {
        return (
            <Panel bsStyle="info" header="NL_APLA" className="text-center">
                <h2>NL_SERVICE_OFFLINE</h2>
                {this.props.isConnecting && (<h4>NL_CONNECTING...</h4>)}
                {!this.props.isConnecting && (<h4>NL_Retry in {this.state.seconds} sec</h4>)}
                <div>
                    <Button disabled={this.props.isConnecting} onClick={this.props.identity.bind(this)}>NL_RETRY</Button>
                </div>
            </Panel>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    isConnecting: state.engine.isConnecting,
    isConnected: state.engine.isConnected,
});

const mapDispatchToProps = {
    navigate,
    setLoading,
    identity: identity.started,
};

export default connect(mapStateToProps, mapDispatchToProps)(Offline);