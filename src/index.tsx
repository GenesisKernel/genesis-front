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

import 'jspolyfill-array.prototype.find';
import 'whatwg-fetch';
import 'font-awesome/css/font-awesome.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'styles/built/sass.css';
import 'styles/index.css';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import { overrideSettings } from 'lib/api';
// import { addLocaleData } from 'react-intl';
// import * as locale_enUS from './lib/locales/en-US';

import App from './containers/App';

fetch('/settings.json')
    .then(response => response.json())
    .then(json => {
        overrideSettings(json);

    }).catch(e => {
        // Fall back to the default settings defined through env parameters or const value

    }).then(() => {
        // addLocaleData([locale_enUS]);
        const TARGET_ROOT = document.querySelector('#root');

        render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </Provider>,
            TARGET_ROOT
        );
    });