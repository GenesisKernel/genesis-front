/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import actionCreatorFactory from 'typescript-fsa';
import { IWallet } from 'apla/auth';
import { INotificationsMessage, IConnectCall } from 'apla/socket';
import { IAccount } from 'apla/api';

const actionCreator = actionCreatorFactory('socket');
export const connect = actionCreator.async<IConnectCall, { session: string, instance: ICentrifuge }, string>('CONNECT');
export const disconnect = actionCreator.async('DISCONNECT');
export const subscribe = actionCreator.async<IAccount, any, string>('SUBSCRIBE');
export const unsubscribe = actionCreator.async<IWallet, void, void>('UNSUBSCRIBE');
export const setNotificationsCount = actionCreator<INotificationsMessage>('SET_NOTIFICATIONS_COUNT');
export const getNotificationsCount = actionCreator<{ ids: { id: string, ecosystem: string }[] }>('GET_NOTIFICATIONS_COUNT');
export const setConnected = actionCreator<boolean>('SET_CONNECTED');