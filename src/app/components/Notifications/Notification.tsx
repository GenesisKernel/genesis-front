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

import React from 'react';
import { INotificationProto } from 'genesis/notifications';

import themed from 'components/Theme/themed';

export interface INotificationProps {
    className?: string;
    proto: INotificationProto<any>;
    params: {
        [key: string]: any;
    };
}

const Notification: React.SFC<INotificationProps> = props => (
    <div className={props.className}>
        {props.proto.icon && (
            <div className="notification-icon">
                <em className={props.proto.icon} />
            </div>
        )}
        {/*<div className="notification-title">{typeof props.proto.title === 'function' ? props.proto.title(props.params) : props.proto.title}</div>
        <div className="notification-body">{typeof props.proto.body === 'function' ? props.proto.body(props.params) : props.proto.body}</div>*/}
        {/*<div className="notification-controls">
            <NotificationButton>Confirm</NotificationButton>
            <NotificationButton>Cancel</NotificationButton>
    </div>*/}
    </div>
);

export default themed(Notification)`
    background: ${props => props.theme.notificationBackground};
    width: 350px;
    margin-bottom: 15px;
    padding: 15px;

    .notification-icon {
        float: left;
        font-size: 30px;
        color: ${props => props.theme.notificationIconColor};
        vertical-align: top;
        margin-right: 15px;
        margin-left: 5px;
        width: 30px;
        text-align: right;
    }

    .notification-title {
        font-size: 15px;
        color: ${props => props.theme.notificationPrimaryForeground};
    }

    .notification-body {
        font-size: 14px;
        color: ${props => props.theme.notificationForeground};
    }

    .notification-controls {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
    }
`;