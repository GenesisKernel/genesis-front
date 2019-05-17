/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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