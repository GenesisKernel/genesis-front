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
import { Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import platform from 'lib/platform';
import classnames from 'classnames';
import themed from 'components/Theme/themed';

import { AnimatedSwitch } from 'components/Animation';
import Main from 'containers/Main';
import Auth from 'containers/Auth';
import Error from 'containers/Auth/Error';
import Splash from 'components/Splash';
import InitHook from 'containers/App/InitHook';
import ModalProvider from 'containers/Modal/ModalProvider';
import NotificationsProvider from 'containers/Notifications/NotificationsProvider';
import SecurityWarning from 'containers/SecurityWarning';

interface IAppProps {
    isAuthenticated: boolean;
    isLoaded: boolean;
    isCollapsed: boolean;
    isFatal: boolean;
    securityWarningClosed: boolean;
    switchWindow: (wnd: string) => void;
}

const ThemedApp = themed.div`
    &.platform-windows {
        border: solid 1px ${props => props.theme.windowBorder};
    }
`;

class App extends React.Component<IAppProps> {
    componentWillReceiveProps(props: IAppProps) {
        if (this.props.isAuthenticated !== props.isAuthenticated) {
            props.switchWindow(props.isAuthenticated ? 'main' : 'general');
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
            'platform-windows': platform.select({ win32: true })
        });

        return (
            <ThemedApp className={classes}>
                <InitHook />
                <ModalProvider />
                <NotificationsProvider />
                {platform.select({
                    web: !this.props.securityWarningClosed && (
                        <SecurityWarning>
                            <FormattedMessage id="general.security.warning" defaultMessage="Please use desktop version or mobile application for better security" />
                        </SecurityWarning>
                    )
                })}

                <AnimatedSwitch animation={AnimatedSwitch.animations.fade()}>
                    {this.props.isFatal && (
                        <Route path="/" component={Error} />
                    )}
                    {!this.props.isLoaded && (
                        <Route path="/" component={Splash} />
                    )}
                    {!this.props.isAuthenticated && (
                        <Route path="/" component={Auth} />
                    )}
                    <Route path="/" component={Main} />
                </AnimatedSwitch>
            </ThemedApp>
        );
    }
}

export default App;