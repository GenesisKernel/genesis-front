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
import * as SockJS from 'sockjs-client';
import * as Centrifuge from 'centrifuge';
import { OrderedSet, OrderedMap } from 'immutable';

export interface IWsProps {
    socketToken: string;
    userID: string;
    timestamp: string;
}

interface IWsState {
    centrifuge: any;
    channel: string;
    messages: OrderedSet<string>;
    subscriptions: OrderedMap<string, any>;
    user: string;
    token: string;
}

class Ws extends React.Component<IWsProps, IWsState> {
    constructor(props: IWsProps) {
        super(props);
        this.state = {
            centrifuge: null,
            messages: OrderedSet(),
            subscriptions: OrderedMap(),
            channel: '',
            user: props.userID,
            token: props.socketToken
        };
    }

    onReceive(channel: string, message: any) {
        this.setState({
            messages: this.state.messages.add(`[${channel}]: ${JSON.stringify(message, null, 3)}`)
        });
    }

    onUserChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            user: e.target.value
        });
    }

    onTokenChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            token: e.target.value
        });
    }

    onChannelChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            channel: e.target.value
        });
    }

    onRemoveSub(value: string) {
        this.state.subscriptions.get(value).unsubscribe();
        this.setState({
            subscriptions: this.state.subscriptions.remove(value)
        });
    }

    onConnect() {
        const centrifuge = new Centrifuge({
            //url: 'https://centrifugo.apla.io:8000/connection',
            url: 'http://127.0.0.1:8000/connection',
            user: this.state.user,
            timestamp: this.props.timestamp,
            token: this.state.token,

            //user: '-1219938594668552577',
            //timestamp: '1510669367',
            //token: '6a7bb28fc1a7f6b10be545b6c7abe78df2c9b4e12fd0d49b922af4c1546465f2',

            sockJS: SockJS
        });

        centrifuge.on('connect', (context: any) => {
            this.setState({
                centrifuge
            });
            console.log('CONNECTED');
            this.onReceive('SYSTEM', 'Connected');
        });

        centrifuge.on('disconnect', (context: any) => {
            console.log('DISCONNECTED');
            this.onReceive('SYSTEM', 'Disconnected or unable to authorize');
        });

        centrifuge.on('error', (error: any) => {
            console.log('ERROR', error);
            this.onReceive('ERROR', error);
        });

        centrifuge.connect();
    }

    onDisconnect() {
        this.state.centrifuge.disconnect();
        this.setState({
            centrifuge: null,
            subscriptions: OrderedMap<string, any>()
        });
    }

    onSubscribe() {
        const subscription = this.state.centrifuge.subscribe(this.state.channel, (message: any) => {
            this.onReceive(this.state.channel, message);
        });

        this.setState({
            subscriptions: this.state.subscriptions.set(this.state.channel, subscription)
        });
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col col-md-8">
                        <div className="panel panel-primary">
                            <div className="panel-heading">Config</div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label>User</label>
                                    <input className="form-control" type="text" value={this.state.user} onChange={this.onUserChange.bind(this)} />
                                </div>
                                <div className="form-group">
                                    <label>Token</label>
                                    <input className="form-control" type="text" value={this.state.token} onChange={this.onTokenChange.bind(this)} />
                                </div>
                                <div className="panel-footer clearfix">
                                    <button className="btn btn-primary pull-left" disabled={this.state.centrifuge} onClick={this.onConnect.bind(this)}>Connect</button>
                                    <button className="btn btn-primary pull-right" disabled={!this.state.centrifuge} onClick={this.onDisconnect.bind(this)}>Disconnect</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-4">
                        <div className="panel panel-primary">
                            <div className="panel-heading">Subscriptions</div>
                            <div className="panel-body">
                                {this.state.subscriptions.map((l, index) => (
                                    <div className="clearfix" key={index}>
                                        <div className="pull-left">{l}</div>
                                        <button className="pull-right" onClick={this.onRemoveSub.bind(this, l)}>[x]</button>
                                    </div>
                                )).toArray()}
                                <hr />
                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control" type="text" value={this.state.channel} onChange={this.onChannelChange.bind(this)} />
                                </div>
                            </div>
                            <div className="panel-footer text-right">
                                <button className="btn btn-primary" disabled={!this.state.centrifuge || !this.state.channel} onClick={this.onSubscribe.bind(this)}>Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">Output</div>
                            <div className="panel-body">
                                {this.state.messages.map((l, index) => (
                                    <div key={index}>{l}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ws;