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

import { Action } from 'redux';
import { Observable } from 'rxjs/Observable';
import { Epic } from 'modules';
import { Observer, of } from 'rxjs';
import { setBadgeCount } from 'modules/gui/actions';
import { subscribe, setNotificationsCount, getNotificationsCount } from '../actions';
import { flatMap } from 'rxjs/operators';

interface INotificationPck {
    role_id: number;
    ecosystem: number;
    count: number;
}

const subscribeEpic: Epic = (action$, store) => action$.ofAction(subscribe.started).pipe(
    flatMap(action => {
        if (store.value.socket.subscriptions.find(l => l.wallet.id === action.payload.id)) {
            return of(subscribe.failed({
                params: action.payload,
                error: 'E_ALREADY_SUBSCRIBED'
            }));
        }
        else if (!store.value.socket.socket) {
            return of(subscribe.failed({
                params: action.payload,
                error: 'E_SOCKET_OFFLINE'
            }));
        }
        else {
            return new Observable<Action>((observer: Observer<Action>) => {
                const sub = store.value.socket.socket!.subscribe<INotificationPck[]>('client' + action.payload.id, message => {
                    let count = 0;

                    message.data.forEach(n => {
                        if (store.value.auth.isAuthenticated &&
                            (
                                store.value.auth.session.role && store.value.auth.session.role.id === String(n.role_id) ||
                                0 === n.role_id
                            ) &&
                            store.value.auth.session.wallet &&
                            store.value.auth.session.wallet.id === action.payload.id &&
                            store.value.auth.session.access!.ecosystem === n.ecosystem.toString()
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
    })
);

export default subscribeEpic;