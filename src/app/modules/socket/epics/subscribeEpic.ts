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

import { Action } from 'redux';
import { Observable } from 'rxjs/Observable';
import { Epic } from 'redux-observable';
import { IRootState } from 'modules';
import { Observer } from 'rxjs';
import { setBadgeCount } from 'modules/gui/actions';
import { subscribe, setNotificationsCount, getNotificationsCount } from '../actions';

const subscribeEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(subscribe.started)
        .flatMap(action => {
            const state = store.getState();
            if (state.socket.subscriptions.find(l => l.account.id === action.payload.id)) {
                return Observable.of(subscribe.failed({
                    params: action.payload,
                    error: 'E_ALREADY_SUBSCRIBED'
                }));
            }
            else if (!state.socket.socket) {
                return Observable.of(subscribe.failed({
                    params: action.payload,
                    error: 'E_SOCKET_OFFLINE'
                }));
            }
            else {
                return Observable.create((observer: Observer<Action>) => {
                    const sub = state.socket.socket.subscribe<{ role_id: number, ecosystem: number, count: number }[]>('client' + action.payload.id, message => {
                        let count = 0;

                        message.data.forEach(n => {
                            const subState = store.getState();
                            if (subState.auth.isAuthenticated &&
                                subState.auth.account &&
                                subState.auth.account.id === action.payload.id &&
                                subState.auth.account.ecosystem === action.payload.ecosystem
                            ) {
                                count += n.count;
                            }

                            observer.next(setNotificationsCount({
                                id: action.payload.id,
                                ecosystem: n.ecosystem.toString(),
                                role: n.role_id,
                                count: n.count
                            }));
                        });

                        observer.next(setBadgeCount(count));
                    });

                    sub.on('subscribe', () => {
                        observer.next(
                            getNotificationsCount({
                                ids: [{
                                    id: action.payload.id,
                                    ecosystem: action.payload.ecosystem
                                }]
                            })
                        );
                    });

                    observer.next(subscribe.done({
                        params: action.payload,
                        result: sub
                    }));
                });
            }
        });

export default subscribeEpic;