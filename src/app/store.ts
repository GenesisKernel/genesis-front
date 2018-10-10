// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
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
import 'lib/external/fsa';
import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import debounce from 'redux-localstorage-debounce';

import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import rootReducer, { rootEpic, IRootState } from './modules';
import platform from 'lib/platform';
import dependencies from 'modules/dependencies';

export const history = platform.select<() => History>({
    desktop: createMemoryHistory,
    web: createHistory
})();

const reducer = platform.select({
    web: compose(
        mergePersistedState()
    )(rootReducer),
    desktop: rootReducer
});

const storageAdapters = [
    filter([
        'storage',
        'auth.isAuthenticated',
        'auth.session',
        'auth.id',
        'auth.role',
        'auth.wallet',
    ])
];

platform.on('web', () => {
    storageAdapters.unshift(debounce(1000, 5000));
});

const storage = compose.apply(null, storageAdapters)(adapter(window.localStorage));

const configureStore = (initialState?: IRootState) => {
    const enhancers: any[] = [];
    const middleware = [
        routerMiddleware(history),
        createEpicMiddleware(rootEpic, {
            dependencies
        }),
        loadingBarMiddleware({
            promiseTypeSuffixes: ['STARTED', 'DONE', 'FAILED']
        })
    ];

    if (process.env.NODE_ENV === 'development') {
        const devToolsExtension = (window as { devToolsExtension?: Function }).devToolsExtension;

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    platform.on('web', () => {
        enhancers.unshift(persistState(storage, 'persistentData'));
    });

    const composedEnhancers: any = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    return createStore<IRootState>(
        connectRouter(history)(reducer),
        initialState!,
        composedEnhancers
    );
};

const store = platform.select({
    web: () => configureStore(),
    desktop: () => {
        const Electron = require('electron');
        const storedState = Electron.ipcRenderer.sendSync('getState');
        const storeInstance = (storedState && Object.keys(storedState).length) ? configureStore(storedState) : configureStore();

        storeInstance.subscribe(() => {
            const state = storeInstance.getState();
            Electron.ipcRenderer.send('setState', {
                auth: state.auth,
                engine: state.engine,
                storage: state.storage
            });
        });

        return storeInstance;
    }
})();

export default store;