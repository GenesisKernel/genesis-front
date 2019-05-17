/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IntlProvider } from 'react-intl';
import { DragDropContext } from 'react-dnd';
import { switchWindow } from 'modules/gui/actions';
import HTML5Backend from 'react-dnd-html5-backend';

import App from 'components/App';
import ThemeProvider from 'components/Theme/ThemeProvider';
import baseTheme from 'components/Theme/baseTheme';

export interface IAppContainerProps {
}

interface IAppContainerState {
    locale: string;
    isAuthenticated: boolean;
    isLoaded: boolean;
    isCollapsed: boolean;
    isFatal: boolean;
    localeMessages: { [key: string]: string };
    securityWarningClosed: boolean;
}

interface IAppContainerDispatch {
    switchWindow: typeof switchWindow.started;
}

const AppContainer: React.SFC<IAppContainerProps & IAppContainerState & IAppContainerDispatch> = props => (
    <IntlProvider locale={props.locale} defaultLocale="en-US" messages={props.localeMessages}>
        <ThemeProvider theme={baseTheme}>
            <App
                isAuthenticated={props.isAuthenticated}
                isLoaded={props.isLoaded}
                isCollapsed={props.isCollapsed}
                isFatal={props.isFatal}
                switchWindow={props.switchWindow}
                securityWarningClosed={props.securityWarningClosed}
            />
        </ThemeProvider>
    </IntlProvider>
);

const mapStateToProps = (state: IRootState) => ({
    locale: state.storage.locale,
    localeMessages: state.engine.localeMessages,
    isAuthenticated: state.auth.isAuthenticated,
    isCollapsed: state.engine.isCollapsed,
    isLoaded: state.engine.isLoaded,
    isFatal: !!state.engine.fatalError,
    securityWarningClosed: state.storage.securityWarningClosed
});

const mapDispatchToProps = {
    switchWindow: switchWindow.started
};

export default DragDropContext(HTML5Backend)(
    connect<IAppContainerState, IAppContainerDispatch, IAppContainerProps>(mapStateToProps, mapDispatchToProps, null, { pure: false })(AppContainer)
);
