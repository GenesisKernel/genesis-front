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

import 'rxjs';
import 'lib/external/fsa';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import txMiddleware from 'modules/middleware/tx';
import createHistory from 'history/createBrowserHistory';
import rootReducer, { rootEpic, IRootState } from './modules';

export const history = createHistory();

const configureStore = (initialState?: IRootState) => {
    const enhancers: any[] = [];
    const middleware = [
        routerMiddleware(history),
        createEpicMiddleware(rootEpic),
        loadingBarMiddleware({
            promiseTypeSuffixes: ['STARTED', 'DONE', 'FAILED']
        }),
        txMiddleware
    ];

    if (process.env.NODE_ENV === 'development') {
        const devToolsExtension = (window as { devToolsExtension?: string }).devToolsExtension;

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    return createStore<IRootState>(
        rootReducer,
        initialState!,
        composedEnhancers
    );
};

const store = configureStore();

export default store;