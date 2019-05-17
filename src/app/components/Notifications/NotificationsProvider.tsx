/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { INotification, INotificationProto } from 'apla/notifications';

import StreamGroup from '../Animation/StreamGroup';
import Notification from './Notification';
import TxSuccessNotification from './Types/TxSuccessNotification';
import InvalidPasswordNotification from './Types/InvalidPasswordNotification';
import TxBatchNotification from './Types/TxBatchNotification';
import EcosystemInvitedNotification from './Types/EcosystemInvitedNotification';

const definitions: { [key: string]: INotificationProto<any> } = {
    'TX_BATCH': TxBatchNotification,
    'TX_SUCCESS': TxSuccessNotification,
    'INVALID_PASSWORD': InvalidPasswordNotification,
    'ECOSYSTEM_INVITED': EcosystemInvitedNotification
};

export interface INotificationsProviderProps {
    notifications: INotification[];
    spawnNotification: (notification: INotification) => void;
    destroyNotification: (id: string) => void;
}

class NotificationsProvider extends React.Component<INotificationsProviderProps> {
    render() {
        return (
            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 10000 }}>
                <StreamGroup
                    items={this.props.notifications.map(n => {
                        const proto = definitions[n.type];
                        return proto ? {
                            key: n.id,
                            content: (
                                <Notification proto={proto} params={n.params} />
                            )
                        } : null;
                    })}
                />
            </div>
        );
    }
}

export default NotificationsProvider;