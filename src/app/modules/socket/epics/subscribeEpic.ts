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

import { Action } from 'redux';
import { Observable } from 'rxjs/Observable';
import { Epic } from 'modules';
import { Observer } from 'rxjs';
import { setBadgeCount } from 'modules/gui/actions';
import { subscribe, setNotificationsCount, getNotificationsCount } from '../actions';

const subscribeEpic: Epic = (action$, store) => action$.ofAction(subscribe.started)
    .flatMap(action => {
        const state = store.getState();
        if (state.socket.subscriptions.find(l => l.wallet.id === action.payload.id)) {
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
                            (
                                subState.auth.wallet.role && subState.auth.wallet.role.id === String(n.role_id) ||
                                0 === n.role_id
                            ) &&
                            subState.auth.wallet &&
                            subState.auth.wallet.wallet.id === action.payload.id &&
                            subState.auth.wallet.access.ecosystem === n.ecosystem.toString()
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
                    action.payload.access.forEach(access =>
                        observer.next(
                            getNotificationsCount({
                                ids: [{
                                    id: action.payload.id,
                                    ecosystem: access.ecosystem
                                }]
                            })
                        )
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