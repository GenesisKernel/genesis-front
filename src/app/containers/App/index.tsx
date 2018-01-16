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
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IntlProvider } from 'react-intl';
import { login } from 'modules/auth/actions';
import { navigate, checkOnline, setLoading } from 'modules/engine/actions';
import platform from 'lib/platform';
import * as classnames from 'classnames';

import { AnimatedSwitch } from 'components/Animation';
import Splash from 'components/Splash';
import ModalDispatcher from 'containers/Widgets/ModalDispatcher';
import Main from 'containers/Main';
import General from 'containers/General';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import IntlHook from 'containers/App/IntlHook';
import { switchWindow } from 'modules/gui/actions';

interface IAppProps {
    locale: string;
    isAuthenticated: boolean;
    isCollapsed: boolean;
    isLoggingIn: boolean;
    isLoading: boolean;
    isConnected: boolean;
    isInstalled: boolean;
    isConnecting: boolean;
    isImportingAccount: boolean;
    navigate?: typeof navigate;
    setLoading?: typeof setLoading;
    login?: typeof login.started;
    checkOnline?: typeof checkOnline.started;
    switchWindow?: typeof switchWindow.started;
}

class App extends React.Component<IAppProps> {
    componentDidMount() {
        if (!this.props.isConnecting && this.props.isLoading) {
            this.props.checkOnline(null);
        }
    }

    componentWillReceiveProps(props: IAppProps) {
        if (this.props.isAuthenticated !== props.isAuthenticated) {
            props.switchWindow({
                window: props.isAuthenticated ? 'main' : 'general'
            });
        }

        if (null === this.props.isConnected && null !== props.isConnected) {
            if (props.isConnected) {
                /*const privateKey = storage.settings.load('privateKey');
                const lastEcosystem = storage.settings.load('lastEcosystem');
                if (privateKey && props.isInstalled && !props.isAuthenticated && !props.isImportingAccount) {
                    this.props.login({
                        privateKey,
                        ecosystem: lastEcosystem,
                        remember: true
                    });
                }
                else {
                    this.props.setLoading(false);
                }*/

                this.props.setLoading(false);
                /*if (props.isAuthenticated) {
                    this.props.switchWindow({ window: 'main' });
                }*/
            }
            else {
                this.props.setLoading(false);
            }
        }

        if (this.props.isAuthenticated !== props.isAuthenticated) {
            this.props.setLoading(false);
        }
    }

    render() {
        const classes = classnames({
            'wrapper': true,
            'layout-fixed': true,
            'aside-collapsed': this.props.isCollapsed,
            'aside-toggled': !this.props.isCollapsed,
            'platform-desktop': platform.select({ desktop: true }),
            'platform-web': platform.select({ web: true }),
        });

        return (
            <IntlProvider locale={this.props.locale} defaultLocale={this.props.locale}>
                <div className={classes}>
                    <IntlHook />
                    <ModalDispatcher />
                    <AnimatedSwitch animation={AnimatedSwitch.animations.fade()}>
                        {this.props.isLoading && (
                            <Route path="/" component={Splash} />
                        )}
                        {!this.props.isAuthenticated && (
                            <Route path="/" component={General} />
                        )}
                        <Route path="/" component={Main} />
                    </AnimatedSwitch>
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
    isImportingAccount: state.auth.isImportingAccount
});

const mapDispatchToProps = {
    navigate,
    setLoading,
    checkOnline: checkOnline.started,
    login: login.started,
    switchWindow: switchWindow.started
};

// export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
export default DragDropContext(HTML5Backend)(
    connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App)
);
