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
import { Route } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { IRootState } from 'modules';
import { setLoading, identity, navigate } from 'modules/engine/actions';
import { reauthenticate } from 'modules/auth/actions';
import storage from 'lib/storage';

import Splash from 'components/Splash';
import Background from 'components/Background';
import Auth from './containers/Auth';
import Install from './containers/Install';
import Offline from './containers/Offline';

interface IGeneralProps {
    locale: string;
    isLoading: boolean;
    isConnecting: boolean;
    isConnected: boolean;
    isInstalled: boolean;
    isLoggingIn: boolean;
    uid: string;
    setLoading?: typeof setLoading;
    identity?: typeof identity.started;
    navigate?: typeof navigate;
    reauthenticate?: typeof reauthenticate.started;
}

class General extends React.Component<IGeneralProps> {
    componentDidMount() {
        const privateKey = storage.settings.load('privateKey');
        const publicKey = storage.settings.load('publicKey');
        if (privateKey && publicKey) {
            this.props.reauthenticate({
                privateKey,
                publicKey
            });
        }
        else {
            this.props.identity(null);
        }
    }

    componentWillReceiveProps(props: IGeneralProps) {
        if (props.isLoading && !props.isConnecting && !props.isLoggingIn) {
            this.props.setLoading(false);

            if (!props.isConnected) {
                this.props.navigate('/offline');
            }
            else if (!props.isInstalled) {
                this.props.navigate('/install');
            }
            else {
                this.props.navigate('/auth');
            }
        }
    }

    render() {
        if (this.props.isLoading && (this.props.isConnecting || this.props.isLoggingIn)) {
            return (
                <Splash />
            );
        }
        else {
            return (
                <Row>
                    <Background />
                    <Col lg={5} md={6} xs={12} className="no-float align-middle">
                        {/*<LangSelector onSelect={() => { }} selectedIndex={0} values={[{ title: 'English(US)', image: '' }]} />*/}
                        <Route path="/auth" component={Auth} />
                        <Route path="/install" component={Install} />
                        <Route exact path="/offline" component={Offline} />
                    </Col>
                </Row>
            );
        }
    }
}

const mapStateToProps = (state: IRootState) => ({
    isLoggingIn: state.auth.isLoggingIn,
    locale: state.engine.locale,
    isLoading: state.engine.isLoading,
    isConnected: state.engine.isConnected,
    isInstalled: state.engine.isInstalled,
    isConnecting: state.engine.isConnecting,
    uid: state.engine.uid
});

const mapDispatchToProps = {
    navigate,
    setLoading,
    identity: identity.started,
    reauthenticate: reauthenticate.started
};

export default connect(mapStateToProps, mapDispatchToProps)(General);