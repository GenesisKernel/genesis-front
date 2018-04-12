// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IntlProvider } from 'react-intl';
import platform from 'lib/platform';
import * as classnames from 'classnames';

import { AnimatedSwitch } from 'components/Animation';
import Main from 'containers/Main';
import Auth from 'containers/Auth';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import InitHook from 'containers/App/InitHook';
import { switchWindow } from 'modules/gui/actions';
import ModalProvider from 'containers/Modal/ModalProvider';

interface IAppProps {
    locale: string;
    isAuthenticated: boolean;
    isCollapsed: boolean;
    localeMessages: { [key: string]: string };
    switchWindow?: typeof switchWindow.started;
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
            <IntlProvider locale={this.props.locale} defaultLocale="en-US" messages={this.props.localeMessages}>
                <div className={classes}>
                    <InitHook />
                    <ModalProvider />
                    <AnimatedSwitch animation={AnimatedSwitch.animations.fade()}>
                        {!this.props.isAuthenticated && (
                            <Route path="/" component={Auth} />
                        )}
                        <Route path="/" component={Main} />
                    </AnimatedSwitch>
                </div>
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    locale: state.storage.locale,
    localeMessages: state.engine.localeMessages,
    isAuthenticated: state.auth.isAuthenticated,
    isCollapsed: state.engine.isCollapsed
});

const mapDispatchToProps = {
    switchWindow: switchWindow.started
};

// export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
export default DragDropContext(HTML5Backend)(
    connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App)
);
