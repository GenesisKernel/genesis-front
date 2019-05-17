/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { render } from 'react-dom';
import store, { history } from 'store';

import 'jspolyfill-array.prototype.find';
import 'font-awesome/css/font-awesome.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'styles/built/sass.css';
import 'styles/index.css';

import App from 'containers/App';

const TARGET_ROOT = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    TARGET_ROOT
);