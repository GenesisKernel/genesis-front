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
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IntlProvider } from 'react-intl';
import { reauthenticate } from 'modules/auth/actions';
import { navigate, checkOnline, setLoading } from 'modules/engine/actions';
import storage from 'lib/storage';
import * as classnames from 'classnames';

import Splash from 'components/Splash';
import Offline from 'containers/Offline';
import Main from 'containers/Main';
import General from 'containers/General';

interface IAppProps {
    locale: string;
    isAuthenticated: boolean;
    isCollapsed: boolean;
    isLoggingIn: boolean;
    isLoading: boolean;
    isConnected: boolean;
    isInstalled: boolean;
    isConnecting: boolean;
    navigate?: typeof navigate;
    setLoading?: typeof setLoading;
    reauthenticate?: typeof reauthenticate;
    checkOnline?: typeof checkOnline.started;
}

class App extends React.Component<IAppProps> {
    componentDidMount() {
        if (!this.props.isConnecting && this.props.isLoading) {
            this.props.checkOnline(null);
        }
    }

    componentWillReceiveProps(props: IAppProps) {
        if (null === this.props.isConnected && null !== props.isConnected) {
            if (props.isConnected) {
                const privateKey = storage.settings.load('privateKey');
                const publicKey = storage.settings.load('publicKey');
                if (privateKey && publicKey) {
                    this.props.reauthenticate({
                        privateKey,
                        publicKey
                    });
                }
            }
            else {
                this.props.setLoading(false);
            }
        }

        if (null === this.props.isAuthenticated && props.isAuthenticated) {
            this.props.setLoading(false);
        }
    }

    render() {
        const classes = classnames({
            'wrapper': true,
            'layout-fixed': true,
            'aside-collapsed': this.props.isCollapsed,
            'aside-toggled': !this.props.isCollapsed
        });

        return (
            <IntlProvider locale={this.props.locale}>
                <div className={classes}>
                    <Switch>
                        {this.props.isConnecting && this.props.isLoading && (
                            <Route path="/" component={Splash} />
                        )}
                        {!this.props.isConnected && (
                            <Route path="/" component={Offline} />
                        )}
                        {!this.props.isAuthenticated && (
                            <Route path="/" component={General} />
                        )}
                        <Route path="/" component={Main} />
                    </Switch>
                </div>
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    locale: state.engine.locale,
    isAuthenticated: state.auth.isAuthenticated,
    isCollapsed: state.engine.isCollapsed,
    isLoggingIn: state.auth.isLoggingIn,
    isLoading: state.engine.isLoading,
    isInstalled: state.engine.isInstalled,
    isConnected: state.engine.isConnected,
    isConnecting: state.engine.isConnecting,
});

const mapDispatchToProps = {
    navigate,
    checkOnline: checkOnline.started,
    reauthenticate,
    setLoading
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);