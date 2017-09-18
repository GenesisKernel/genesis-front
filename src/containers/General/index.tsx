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
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Col, Row } from 'react-bootstrap';
import { IRootState } from 'modules';
import { actions } from 'modules/engine';

import Splash from 'components/Splash';
import Background from 'components/Background';
import Auth from './containers/Auth';
import Install from './containers/Install';
import Offline from './containers/Offline';

interface IGeneralProps {
    locale: string;
    isLoading: boolean;
    isLoggingIn: boolean;
    isConnected: boolean;
    isInstalled: boolean;
    uid: string;
    setLoading: (value: boolean) => any;
    identity: () => any;
    navigate: (url: string) => any;
}

class General extends React.Component<IGeneralProps> {
    componentDidMount() {
        this.props.identity();
    }

    componentWillReceiveProps(props: IGeneralProps) {
        if (props.isLoading && !props.isLoggingIn) {
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
        if (this.props.isLoading || this.props.isLoggingIn) {
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
                        <Route exact path="/auth" component={Auth} />
                        <Route path="/install" component={Install} />
                        <Route exact path="/offline" component={Offline} />
                    </Col>
                </Row>
            );
        }
    }
}

const mapStateToProps = (state: IRootState) => ({
    locale: state.engine.locale,
    isLoading: state.engine.isLoading,
    isConnected: state.engine.isConnected,
    isInstalled: state.engine.isInstalled,
    isLoggingIn: state.engine.isLoggingIn,
    uid: state.engine.uid
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setLoading: (value: boolean) => dispatch(actions.setLoading(value)),
    identity: () => dispatch(actions.identity.started(null)),
    navigate: (url: string) => dispatch(push(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(General);