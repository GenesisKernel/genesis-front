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
import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { IntlProvider } from 'react-intl';
import { DragDropContext } from 'react-dnd';
import { switchWindow } from 'modules/gui/actions';
import HTML5Backend from 'react-dnd-html5-backend';

import App from 'components/App';

export interface IAppContainerProps {
}

interface IAppContainerState {
    locale: string;
    isAuthenticated: boolean;
    isLoaded: boolean;
    isCollapsed: boolean;
    localeMessages: { [key: string]: string };
}

interface IAppContainerDispatch {
    switchWindow: typeof switchWindow.started;
}

const AppContainer: React.SFC<IAppContainerProps & IAppContainerState & IAppContainerDispatch> = props => (
    <IntlProvider locale={props.locale} defaultLocale="en-US" messages={props.localeMessages}>
        <App
            isAuthenticated={props.isAuthenticated}
            isLoaded={props.isLoaded}
            isCollapsed={props.isCollapsed}
            switchWindow={props.switchWindow}
        />
    </IntlProvider>
);

const mapStateToProps = (state: IRootState) => ({
    locale: state.storage.locale,
    localeMessages: state.engine.localeMessages,
    isAuthenticated: state.auth.isAuthenticated,
    isCollapsed: state.engine.isCollapsed,
    isLoaded: state.engine.isLoaded
});

const mapDispatchToProps = {
    switchWindow: switchWindow.started
};

export default DragDropContext(HTML5Backend)(
    connect<IAppContainerState, IAppContainerDispatch, IAppContainerProps>(mapStateToProps, mapDispatchToProps, null, { pure: false })(AppContainer)
);
