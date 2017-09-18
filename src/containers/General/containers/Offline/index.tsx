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
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { Panel, Button } from 'react-bootstrap';
import { IRootState } from 'modules';
import { actions } from 'modules/engine';

interface IOfflineProps {
    isLoggingIn: boolean;
    isConnected: boolean;
    identity: () => any;
    navigate: (url: string) => any;
    setLoading: (value: boolean) => any;
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
        else if (!props.isLoggingIn) {
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
            this.props.identity();
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
                {this.props.isLoggingIn && (<h4>NL_CONNECTING...</h4>)}
                {!this.props.isLoggingIn && (<h4>NL_Retry in {this.state.seconds} sec</h4>)}
                <div>
                    <Button disabled={this.props.isLoggingIn} onClick={this.props.identity.bind(this)}>NL_RETRY</Button>
                </div>
            </Panel>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    isLoggingIn: state.engine.isLoggingIn,
    isConnected: state.engine.isConnected,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    identity: () => dispatch(actions.identity.started(null)),
    navigate: (url: string) => dispatch(push(url)),
    setLoading: (value: boolean) => dispatch(actions.setLoading(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Offline);