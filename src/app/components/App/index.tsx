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

import * as React from 'react';
import { Route } from 'react-router-dom';
import platform from 'lib/platform';
import * as classnames from 'classnames';

import { AnimatedSwitch } from 'components/Animation';
import Main from 'containers/Main';
import Auth from 'containers/Auth';
import Splash from 'components/Splash';
import InitHook from 'containers/App/InitHook';
import ModalProvider from 'containers/Modal/ModalProvider';
import NotificationsProvider from 'containers/Notifications/NotificationsProvider';

interface IAppProps {
    isAuthenticated: boolean;
    isLoaded: boolean;
    isCollapsed: boolean;
    switchWindow: (wnd: string) => void;
}

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
        });

        return (
            <div className={classes}>
                <InitHook />
                <ModalProvider />
                <NotificationsProvider />
                <AnimatedSwitch animation={AnimatedSwitch.animations.fade()}>
                    {!this.props.isLoaded && (
                        <Route path="/" component={Splash} />
                    )}
                    {!this.props.isAuthenticated && (
                        <Route path="/" component={Auth} />
                    )}
                    <Route path="/" component={Main} />
                </AnimatedSwitch>
            </div>
        );
    }
}

export default App;