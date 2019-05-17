/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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