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

import 'rxjs';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import reducer, { rootEpic, IRootState } from './modules';
import platform from 'lib/platform';
import dependencies from 'modules/dependencies';
import 'lib/external/fsa';
import { persistStore } from 'redux-persist';

export const history = platform.target<() => History>({
    desktop: createMemoryHistory,
    web: createHistory
})();

const configureStore = (initialState?: IRootState) => {
    const epicMiddleware = createEpicMiddleware({
        dependencies
    });

    const enhancers: any[] = [];
    const middleware = [
        routerMiddleware(history),
        epicMiddleware,
        loadingBarMiddleware({
            promiseTypeSuffixes: ['STARTED', 'DONE', 'FAILED']
        })
    ];

    if (process.env.NODE_ENV === 'development') {
        const devToolsExtension = (window as { __REDUX_DEVTOOLS_EXTENSION__?: Function }).__REDUX_DEVTOOLS_EXTENSION__;

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    const value = createStore(
        reducer(history),
        initialState as any,
        composedEnhancers
    );

    epicMiddleware.run(rootEpic);

    return value;
};

const store = configureStore();
export const persistor = persistStore(store);
export default store;