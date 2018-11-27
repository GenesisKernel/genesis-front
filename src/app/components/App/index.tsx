// MIT License
//
// Copyright (c) 2016-2018 GenesisKernel
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
import { Route, Switch } from 'react-router-dom';
import { FormattedMessage, IntlProvider } from 'react-intl';
import platform from 'lib/platform';
import classnames from 'classnames';
import themed from 'components/Theme/themed';

import Main from 'components/Main';
import Auth from 'containers/Auth';
import Splash from 'components/Splash';
import InitHook from 'containers/App/InitHook';
import ModalProvider from 'containers/Modal/ModalProvider';
import NotificationsProvider from 'containers/Notifications/NotificationsProvider';
import SecurityWarning from 'containers/SecurityWarning';
import ThemeProvider from 'components/Theme/ThemeProvider';
import baseTheme from 'components/Theme/baseTheme';

interface IAppProps {
    locale: string;
    localeMessages: { [key: string]: string };
    isAuthenticated: boolean;
    isLoaded: boolean;
    isSessionAcquired: boolean;
    securityWarningClosed: boolean;
}

const ThemedApp = themed.div`
    background: url(/img/back.png) 0 0;

    &.platform-windows {
        border: solid 1px ${props => props.theme.windowBorder};
    }
`;

const App: React.SFC<IAppProps> = props => {
    const classes = classnames({
        'wrapper': true,
        'layout-fixed': true,
        'platform-desktop': platform.select({ desktop: true }),
        'platform-web': platform.select({ web: true }),
        'platform-windows': platform.select({ win32: true })
    });

    return (
        <IntlProvider locale={props.locale} defaultLocale="en-US" messages={props.localeMessages}>
            <ThemeProvider theme={baseTheme}>
                <ThemedApp className={classes}>
                    <InitHook />
                    <ModalProvider />
                    <NotificationsProvider />
                    {platform.select({
                        web: !props.securityWarningClosed && (
                            <SecurityWarning>
                                <FormattedMessage id="general.security.warning" defaultMessage="Please use desktop version or mobile application for better security" />
                            </SecurityWarning>
                        )
                    })}

                    <div className="switch-wrapper">
                        <Switch>
                            {!props.isLoaded && (
                                <Route path="/" component={Splash} />
                            )}
                            {!props.isAuthenticated && (
                                <Route path="/" component={Auth} />
                            )}
                            {!props.isSessionAcquired && (
                                <Route path="/" component={Splash} />
                            )}
                            <Route path="/" component={Main} />
                        </Switch>
                    </div>
                </ThemedApp>
            </ThemeProvider>
        </IntlProvider>
    );
};

export default App;