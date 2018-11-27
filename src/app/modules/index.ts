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

import { Action as ReduxAction } from 'redux';
import { Epic as NativeEpic } from 'redux-observable';
import { IStoreDependencies } from './dependencies';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { ActionCreator, Failure, Success, isType, Action } from 'typescript-fsa';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { persistReducer, PersistConfig } from 'redux-persist';
import storagePersistor from 'redux-persist/lib/storage';
import * as auth from './auth';
import * as content from './content';
import * as navigator from './navigator';
import * as modal from './modal';
import * as engine from './engine';
import * as editor from './editor';
import * as tx from './tx';
import * as gui from './gui';
import * as io from './io';
import * as notifications from './notifications';
import * as storage from './storage';
import * as socket from './socket';
import * as router from './router';

export type Epic = NativeEpic<ReduxAction<any>, ReduxAction<any>, IRootState, IStoreDependencies>;
export type Reducer<T, S> =
    T extends ActionCreator<Failure<infer P, infer E>> ? (state: S, payload: Failure<P, E>) => S :
    T extends ActionCreator<Success<infer P2, infer R>> ? (state: S, payload: Success<P2, R>) => S :
    T extends ActionCreator<infer R2> ? (state: S, payload: R2) => S :
    (state: S, payload: T) => S;

export interface IRootState {
    auth: auth.State;
    content: content.State;
    navigator: navigator.State;
    modal: modal.State;
    engine: engine.State;
    editor: editor.State;
    tx: tx.State;
    io: io.State;
    notifications: notifications.State;
    storage: storage.State;
    socket: socket.State;
    loadingBar: any;
    router: router.State;
}

export const ofAction = <A>(actionCreator: ActionCreator<A>) => (source: Observable<any>) => source.pipe(
    filter<Action<A>>(action => {
        return isType(action, actionCreator);
    })
);

export const rootEpic = combineEpics(
    auth.epic,
    content.epic,
    navigator.epic,
    modal.epic,
    engine.epic,
    editor.epic,
    tx.epic,
    gui.epic,
    io.epic,
    notifications.epic,
    router.epic,
    storage.epic,
    socket.epic
);

const authPersistConfig: PersistConfig = {
    key: 'auth',
    whitelist: ['isAuthenticated', 'session', 'id', 'wallet'] as (keyof auth.State)[],
    throttle: 1000,
    storage: storagePersistor
};

const storagePersistConfig: PersistConfig = {
    key: 'storage',
    throttle: 1000,
    storage: storagePersistor
};

export default (history: History) => combineReducers({
    auth: persistReducer(authPersistConfig, auth.reducer),
    storage: persistReducer(storagePersistConfig, storage.reducer),
    content: content.reducer,
    navigator: navigator.reducer,
    modal: modal.reducer,
    engine: engine.reducer,
    editor: editor.reducer,
    tx: tx.reducer,
    gui: null as any,
    io: null as any,
    notifications: notifications.reducer,
    socket: socket.reducer,
    loadingBar: loadingBarReducer,
    router: connectRouter(history) as any
});