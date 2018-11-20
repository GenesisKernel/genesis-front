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

type TCentrifugeTransport =
    'websocket' | 'xdr-streaming' | 'xhr-streaming' | 'eventsource' | 'iframe-eventsource' | 'iframe-htmlfile' |
    'xdr-polling' | 'xhr-polling' | 'iframe-xhr-polling' | 'jsonp-polling';

type TConnectionTransport =
    'ajax' | 'jsonp';

interface ICentrifugeOptions {
    url: string;
    user: string;
    timestamp: string;
    token: string;

    info?: string;
    transports?: TCentrifugeTransport[];
    sockJS?: typeof SockJS;
    debug?: boolean;
    insecure?: boolean;
    retry?: number;
    maxRetry?: number;
    resubscribe?: boolean;
    server?: any

    authEndpoint?: string;
    authHeaders?: { [header: string]: string };
    authParams?: { [param: string]: string };
    authTransport?: TConnectionTransport;

    refreshEndpoint?: string;
    refreshHeaders?: { [header: string]: string };
    refreshParams?: { [param: string]: string };
    refreshTransport?: TConnectionTransport;
    refreshAttempts?: number;
    refreshFailed?: (e: any) => void;
}

interface ISubscriptionMessage<T> {
    uid: string;
    channel: string;
    data: T;
    client?: string;
    info?: {
        user: string;
        client: string;
        default_info: { [key: string]: string };
        channel_info: { [key: string]: string };
    }
}

interface ISubscriptionMessageHandler<T> {
    (message: ISubscriptionMessage<T>): void;
}

interface ISubscriptionPresenceHandler {
    (message: {
        channel: string;
        data: {
            user: string;
            client: string;
            default_info: { [key: string]: string };
            channel_info: { [key: string]: string };
        }
    }): void;
}

interface ISubscriptionSubscribeHandler {
    (message: {
        channel: string;
        isResubscribe: boolean;
    }): void;
}

interface ISubscriptionErrorHandler {
    (message: {
        error: string;
        advice: string;
        channel: string;
        isResubscribe: boolean;
    }): void;
}

interface ISubscriptionUnsubscribeHandler {
    (message: {
        channel: string;
    }): void;
}

interface ICentrifugeCallbacks<T> {
    message?: ISubscriptionMessageHandler<T>;
    join?: ISubscriptionPresenceHandler;
    leave?: ISubscriptionPresenceHandler;
    subscribe?: ISubscriptionSubscribeHandler;
    error?: ISubscriptionErrorHandler;
    unsubscribe?: ISubscriptionUnsubscribeHandler;
}

interface IThenable<T, E> {
    then<T, E>(resultHandler: (result: T) => void, errorHandler: (error: E) => void): void;
}

interface IPresenceData {
    channel: string;
    data: {
        [channel: string]: {
            user: string;
            client: string;
            default_info: { [key: string]: string }
        };
    };
}

interface IPresenceError {
    error: 'timeout',
    advice: 'retry'
}

interface IHistoryData<T> {
    channel: string;
    data: ISubscriptionMessage<T>[];
}

interface ISubscription {
    presence(): IThenable<IPresenceData, IPresenceError>;
    history<T>(): IThenable<IHistoryData<T>, IPresenceError>;
    publish(data: { [key: string]: any }): IThenable<null, IPresenceError>;
    unsubscribe(): void;
    ready(successHandler: ISubscriptionSubscribeHandler, errorHandler?: ISubscriptionErrorHandler): void;

    on<T>(event: 'message', callback?: ISubscriptionMessageHandler<T>): void;
    on(event: 'join', callback?: ISubscriptionPresenceHandler): void;
    on(event: 'leave', callback?: ISubscriptionPresenceHandler): void;
    on(event: 'subscribe', callback?: ISubscriptionSubscribeHandler): void;
    on(event: 'error', callback?: ISubscriptionErrorHandler): void;
    on(event: 'unsubscribe', callback?: ISubscriptionUnsubscribeHandler): void;
}

interface ICentrifuge {
    connect(): void;
    disconnect(): void;
    subscribe<T>(channel: string, callback: ISubscriptionMessageHandler<T>, callbacks?: ICentrifugeCallbacks<T>): ISubscription;
    startBatching(): void;
    flush(): void;
    stopBatching(flush?: boolean): void;

    on(event: 'connect', callback: (context?: { client: string, transport: TCentrifugeTransport, latency: number }) => void): void;
    on(event: 'disconnect', callback: (context?: { reason: string, reconnect: boolean }) => void): void;
    on(event: 'error', callback: (error: { message: { method: string, error: string, advice: string } }) => void): void;
}

declare module 'centrifuge' {
    import SockJS from 'sockjs-client';

    export = Centrifuge;

    const Centrifuge: {
        new(options: ICentrifugeOptions): ICentrifuge;
    }
}