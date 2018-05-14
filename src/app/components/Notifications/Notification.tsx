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

import React from 'react';
import styled from 'styled-components';
import { INotificationProto } from 'genesis/notifications';

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
        <div className="notification-title">{typeof props.proto.title === 'function' ? props.proto.title(props.params) : props.proto.title}</div>
        <div className="notification-body">{typeof props.proto.body === 'function' ? props.proto.body(props.params) : props.proto.body}</div>
        {/*<div className="notification-controls">
            <NotificationButton>Confirm</NotificationButton>
            <NotificationButton>Cancel</NotificationButton>
    </div>*/}
    </div>
);

export default styled(Notification) `
    background: rgba(26, 91, 158, 0.9);
    width: 350px;
    margin-bottom: 15px;
    padding: 15px;

    .notification-icon {
        float: left;
        font-size: 30px;
        color: #fff;
        vertical-align: top;
        margin-right: 15px;
        margin-left: 5px;
        width: 30px;
        text-align: right;
    }

    .notification-title {
        font-size: 15px;
        color: #fff;
    }

    .notification-body {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
    }

    .notification-controls {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
    }
`;